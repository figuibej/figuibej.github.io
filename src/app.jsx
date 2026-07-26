import { JOBS, STACK, COPY, EMAIL, CV_URL } from "./data.js";

const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useEffect, useRef } = React;

function systemLang() {
  try {
    const l = (navigator.languages && navigator.languages[0]) || navigator.language || "es";
    return String(l).toLowerCase().startsWith("es") ? "es" : "en";
  } catch (e) { return "es"; }
}

function systemTheme() {
  try {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (e) { return "light"; }
}

function baseTerm(t) {
  return [
    { isCmd: true, text: "whoami" },
    { isOut: true, text: "Fernando Iguibejeres — " + t.kicker },
    { isOut: true, text: t.heroLede }
  ];
}

function ideDocFor(jobId, lang) {
  const j = JOBS.find((x) => x.id === jobId) || JOBS[0];
  const raw = [
    ["company:", " " + j.company],
    ["role:", " " + j.role[lang]],
    ["period:", " " + j.years[lang]],
    ["current:", " " + (j.current ? "true" : "false")],
    ["url:", " " + (j.url || "-")],
    ["", ""],
    ["summary: |", ""],
    ["  ", j.desc[lang]],
    ["", ""],
    ["stack:", ""]
  ].concat(j.tags.map((tg) => ["  - ", tg]));
  return {
    file: j.id + ".yaml",
    branch: "⎇ main · " + j.id,
    count: raw.length,
    lines: raw.map((p, i) => ({
      no: i + 1, k: p[0], v: p[1],
      kc: p[0] === "  " || p[0] === "  - " ? "color-mix(in srgb, var(--term-text) 30%, transparent)" : "#2E9EBC",
      vc: p[0] === "  - " ? "#D8A548" : "var(--term-text)"
    }))
  };
}

function Nav({ state, setState, t, active, barRef }) {
  const site = state.mode === "site";
  const navLinks = site ? [
    { href: "#experiencia", id: "experiencia", label: t.navExp },
    { href: "#stack", id: "stack", label: t.navStack },
    { href: "#contacto", id: "contacto", label: t.navContact }
  ] : [];
  const modes = [
    { key: "site", icon: "◱", label: t.modeSite, title: t.modeSiteTitle },
    { key: "term", icon: "❯", label: t.modeTerm, title: t.modeTermTitle },
    { key: "ide", icon: "◈", label: t.modeIde, title: t.modeIdeTitle }
  ];
  return (
    <nav className="nav">
      <div ref={barRef} className="nav-progress" />
      <div className="nav-inner">
        <a href="#top" className="nav-brand">Fernando Iguibejeres<span className="nav-brand-dot" /></a>
        <div className="nav-spacer" />
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} className={"nav-link" + (active === link.id ? " is-active" : "")}>
              {link.label}
              <span className={"nav-link-underline" + (active === link.id ? " is-active" : "")} />
            </a>
          ))}
        </div>
        <div className="mode-switch">
          {modes.map((m) => (
            <button key={m.key} title={m.title} className={"mode-btn" + (state.mode === m.key ? " is-active" : "")}
              onClick={() => setState((s) => ({ ...s, mode: m.key }))}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
        <div className="lang-switch">
          <button className={"lang-btn" + (state.lang === "es" ? " is-active" : "")}
            onClick={() => setState((s) => ({ ...s, lang: "es", langTouched: true, term: null }))}>ES</button>
          <button className={"lang-btn" + (state.lang === "en" ? " is-active" : "")}
            onClick={() => setState((s) => ({ ...s, lang: "en", langTouched: true, term: null }))}>EN</button>
        </div>
        <button className="theme-btn" title={t.themeTitle}
          onClick={() => setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark", themeTouched: true }))}>
          {state.theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}

function HeroE({ t }) {
  const uniqueJobs = JOBS.filter((j, i) => JOBS.findIndex((x) => x.company === j.company) === i);
  const marqueeLogos = uniqueJobs.concat(uniqueJobs);
  return (
    <header className="hero-e">
      <div className="hero-e-inner">
        <div className="hero-e-top">
          <img src="img/profile.png" alt="Fernando Iguibejeres" className="hero-e-photo" />
          <div className="hero-e-kicker">{t.kicker}</div>
          <div className="hero-e-divider" />
          <div className="hero-e-location">Buenos Aires · AR</div>
        </div>
        <h1 className="hero-e-title-1">Fernando</h1>
        <h1 className="hero-e-title-2">Iguibejeres</h1>
        <div className="hero-e-bottom">
          <p className="hero-e-lede">{t.heroLede}</p>
          <div className="hero-e-ctas">
            <a href={"mailto:" + EMAIL} className="hero-e-cta-solid">{t.ctaMail}</a>
            <a href={CV_URL} target="_blank" rel="noreferrer" className="hero-e-cta-outline">{t.ctaCv}</a>
          </div>
        </div>
      </div>
      <div className="hero-e-marquee-wrap">
        <div className="hero-e-marquee-track">
          {marqueeLogos.map((j, i) => (
            <div key={j.id + "-" + i} role="img" aria-label={j.company} className="hero-e-marquee-item"
              style={{ backgroundImage: "url(" + j.logo + ")" }} />
          ))}
        </div>
      </div>
    </header>
  );
}

function groupJobsByCompany(jobs) {
  const groups = [];
  jobs.forEach((j) => {
    const last = groups[groups.length - 1];
    if (last && last[0].company === j.company) last.push(j);
    else groups.push([j]);
  });
  return groups;
}

function JobDetail({ j, lang, open, contentClassName }) {
  return (
    <div className="job-detail-rows" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
      <div className="job-detail-inner">
        <div className={contentClassName} style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(-8px)" }}>
          <p className="job-desc">{j.desc[lang]}</p>
          <div className="job-tags">
            {j.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
          {j.url && <a href={j.url} target="_blank" rel="noreferrer" className="job-link">{j.linkLabel} ↗</a>}
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({ t, state, setState }) {
  const allOpen = state.allOpen;
  const isOpen = (id) => allOpen || !!state.open[id];
  const toggleJob = (id) => setState((s) => ({
    ...s, allOpen: false,
    open: { ...s.open, [id]: !(s.allOpen || s.open[id]) }
  }));
  const groups = groupJobsByCompany(JOBS);
  return (
    <section id="experiencia" className="section-exp">
      <div data-reveal="1" className="section-exp-head">
        <div>
          <div className="section-kicker">{t.navExp}</div>
          <h2 className="section-title">{t.expTitle}</h2>
        </div>
        <button className="btn-toggle" onClick={() => setState((s) => ({ ...s, allOpen: !s.allOpen, open: {} }))}>
          {allOpen ? t.collapseAll : t.expandAll}
        </button>
      </div>
      <div className="job-list">
        {groups.map((group) => {
          if (group.length === 1) {
            const j = group[0];
            const open = isOpen(j.id);
            return (
              <div key={j.id} data-reveal="1" className="job-row">
                <div className="job-years">
                  {j.years[state.lang]}
                  {j.current && <div className="job-now-badge">{t.now}</div>}
                </div>
                <div>
                  <div className="job-header" onClick={() => toggleJob(j.id)}>
                    <div className="job-logo-box">
                      <div role="img" aria-label={j.company} className="job-logo" style={{ backgroundImage: "url(" + j.logo + ")" }} />
                    </div>
                    <div className="job-text">
                      <div className="job-role">{j.role[state.lang]}</div>
                      <div className="job-company">{j.company}</div>
                    </div>
                    <div className="job-chevron" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
                  </div>
                  <JobDetail j={j} lang={state.lang} open={open} contentClassName="job-detail-content" />
                </div>
              </div>
            );
          }
          const head = group[0];
          return (
            <div key={"group-" + head.id} data-reveal="1" className="job-row">
              <div className="job-years" />
              <div>
                <div className="job-group-head">
                  <div className="job-logo-box">
                    <div role="img" aria-label={head.company} className="job-logo" style={{ backgroundImage: "url(" + head.logo + ")" }} />
                  </div>
                  <div className="job-text">
                    <div className="job-role">{head.company}</div>
                    {head.groupYears && <div className="job-company">{head.groupYears[state.lang]}</div>}
                  </div>
                </div>
                <div className="job-group-positions">
                  {group.map((j) => {
                    const open = isOpen(j.id);
                    return (
                      <div key={j.id} className="job-group-position">
                        <span className="job-group-dot" />
                        <div className="job-group-position-head" onClick={() => toggleJob(j.id)}>
                          <div className="job-text">
                            <div className="job-position-role">{j.role[state.lang]}</div>
                            <div className="job-position-years">
                              {j.years[state.lang]}
                              {j.current && <span className="job-now-badge">{t.now}</span>}
                            </div>
                          </div>
                          <div className="job-chevron" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
                        </div>
                        <JobDetail j={j} lang={state.lang} open={open} contentClassName="job-detail-content job-group-detail-content" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div className="job-list-end" />
      </div>
    </section>
  );
}

function StackSection({ t, lang }) {
  return (
    <section id="stack" className="section-stack">
      <div className="section-kicker">{t.navStack}</div>
      <h2 data-reveal="1" className="section-title is-spaced">{t.stackTitle}</h2>
      <div className="stack-grid">
        {STACK[lang].map((group) => (
          <div key={group.label} data-reveal="1" className="stack-card">
            <div className="stack-card-label"><span className="stack-card-dot" />{group.label}</div>
            <div className="stack-items">
              {group.items.map((item) => <span key={item} className="stack-item">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ t }) {
  return (
    <section id="contacto" className="section-contact">
      <div data-reveal="1" className="contact-panel">
        <div>
          <h2 className="contact-title">{t.contactTitle}</h2>
          <p className="contact-lede">{t.contactLede}</p>
          <div className="contact-ctas">
            <a href={"mailto:" + EMAIL} className="contact-cta-solid">{t.ctaMail}</a>
            <a href={CV_URL} target="_blank" rel="noreferrer" className="contact-cta-outline">{t.ctaCv}</a>
          </div>
        </div>
        <div className="contact-links">
          <div className="contact-links-label">{t.elsewhere}</div>
          <a href="https://github.com/figuibej" target="_blank" rel="noreferrer" className="contact-link">GitHub <span className="contact-link-arrow">↗</span></a>
          <a href="https://ar.linkedin.com/in/fernando-iguibejeres-50393212" target="_blank" rel="noreferrer" className="contact-link">LinkedIn <span className="contact-link-arrow">↗</span></a>
          <a href="https://twitter.com/ferigui" target="_blank" rel="noreferrer" className="contact-link is-last">X / Twitter <span className="contact-link-arrow">↗</span></a>
          <div className="contact-location">Buenos Aires · CABA<br />Argentina</div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} Fernando Iguibejeres</div>
        <div>{t.builtWith}</div>
      </div>
    </footer>
  );
}

function Console({ t, state, setState }) {
  const lang = state.lang;
  const lines = (state.term || baseTerm(t)).map((x, i) => ({ ...x, id: "tl" + i }));
  const cmds = ["experience --all", "stack", "cat now.md", "contact", "clear"];

  const runCmd = (cmd) => setState((s) => {
    const l = s.lang, tt = COPY[l];
    if (cmd === "clear") return { ...s, term: baseTerm(tt) };
    const cur = s.term || baseTerm(tt);
    const out = [{ isCmd: true, text: cmd }];
    if (cmd === "experience --all") {
      JOBS.forEach((j) => out.push({ isKv: true, k: j.years[l], text: j.company + " · " + j.role[l] }));
    } else if (cmd === "stack") {
      STACK[l].forEach((g) => out.push({ isKv: true, k: g.label, text: g.items.join("  ") }));
    } else if (cmd === "cat now.md") {
      JOBS.filter((j) => j.current).forEach((j) => out.push({ isKv: true, k: j.company, text: j.role[l] }));
      out.push({ isOut: true, text: tt.heroBigB });
    } else if (cmd === "contact") {
      out.push({ isKv: true, k: "email", text: EMAIL });
      out.push({ isKv: true, k: "github", text: "github.com/figuibej" });
      out.push({ isKv: true, k: "linkedin", text: "in/fernando-iguibejeres" });
      out.push({ isKv: true, k: "location", text: "Buenos Aires · CABA · Argentina" });
    }
    return { ...s, term: cur.concat(out) };
  });

  return (
    <div className="console">
      <div className="console-window">
        <div className="console-titlebar">
          <span className="console-dot is-red" />
          <span className="console-dot is-yellow" />
          <span className="console-dot is-green" />
          <span className="console-path">figuibej — ~/resume — zsh</span>
        </div>
        <div className="console-body">
          {lines.map((line) => (
            <div key={line.id} className="console-line">
              {line.isCmd && (
                <div className="console-line-cmd">
                  <span className="console-arrow">➜</span><span className="console-prompt">~/resume</span><span className="console-cmdtext">{line.text}</span>
                </div>
              )}
              {line.isOut && <div className="console-line-out">{line.text}</div>}
              {line.isKv && (
                <div className="console-line-kv">
                  <span className="console-kv-key">{line.k}</span><span className="console-kv-val">{line.text}</span>
                </div>
              )}
            </div>
          ))}
          <div className="console-line-cmd">
            <span className="console-arrow">➜</span><span className="console-prompt">~/resume</span><span className="console-cursor" />
          </div>
        </div>
        <div className="console-cmdbar">
          {cmds.map((cmd) => (
            <button key={cmd} className="console-cmd-btn" onClick={() => runCmd(cmd)}>{cmd}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Ide({ t, state, setState }) {
  const lang = state.lang;
  const activeFile = state.ideFile || "mobeats";
  const doc = ideDocFor(activeFile, lang);
  return (
    <div className="ide">
      <div className="ide-grid">
        <div className="ide-sidebar">
          <div className="ide-explorer-label">Explorer</div>
          <div className="ide-folder"><span className="ide-folder-arrow">▾</span>{t.ideFolder}</div>
          {JOBS.map((j) => {
            const on = activeFile === j.id;
            return (
              <div key={j.id} onClick={() => setState((s) => ({ ...s, ideFile: j.id }))} className="ide-file"
                style={{
                  color: on ? "var(--term-text)" : "color-mix(in srgb, var(--term-text) 58%, transparent)",
                  background: on ? "rgba(46,158,188,.14)" : "transparent",
                  borderLeft: "2px solid " + (on ? "#2E9EBC" : "transparent")
                }}>
                <span style={{ color: j.current ? "#7BA658" : "color-mix(in srgb, var(--term-text) 30%, transparent)" }}>◆</span>{j.id}.yaml
              </div>
            );
          })}
          <div className="ide-sidebar-links">
            <a href={"mailto:" + EMAIL} className="ide-sidebar-link">{t.ctaMail}</a>
            <a href={CV_URL} target="_blank" rel="noreferrer" className="ide-sidebar-link">{t.ctaCv}</a>
          </div>
        </div>
        <div className="ide-main">
          <div className="ide-tabbar">
            <div className="ide-tab"><span className="ide-tab-icon">◆</span>{doc.file}<span className="ide-tab-close">×</span></div>
          </div>
          <div className="ide-editor">
            <div className="ide-gutter">
              {doc.lines.map((ln) => <div key={ln.no}>{ln.no}</div>)}
            </div>
            <div className="ide-code">
              {doc.lines.map((ln) => (
                <div key={ln.no} className="ide-code-line">
                  <span style={{ color: ln.kc }}>{ln.k}</span><span style={{ color: ln.vc }}>{ln.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ide-statusbar">
            <span>{doc.branch}</span><span className="ide-statusbar-spacer" /><span>YAML</span><span>UTF-8</span><span>Ln {doc.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [state, setState] = useState({
    lang: systemLang(), theme: systemTheme(),
    open: { "ml-expert": true }, allOpen: false,
    langTouched: false, themeTouched: false,
    mode: "site", term: null, ideFile: "mobeats", active: null
  });

  const barRef = useRef(null);
  const ioRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const scanReveals = () => {
    const io = ioRef.current;
    if (!io) return;
    document.querySelectorAll("[data-reveal]:not([data-seen])").forEach((el) => {
      el.setAttribute("data-seen", "1");
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
      io.observe(el);
    });
  };

  useEffect(() => {
    try {
      ioRef.current = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "none";
            ioRef.current.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      scanReveals();
    } catch (e) {}

    let sio;
    try {
      const ids = ["experiencia", "stack", "contacto"];
      sio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && stateRef.current.active !== e.target.id) {
            setState((s) => ({ ...s, active: e.target.id }));
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ids.forEach((id) => { const el = document.getElementById(id); if (el) sio.observe(el); });
    } catch (e) {}

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (barRef.current) barRef.current.style.transform = "scaleX(" + p + ")";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let mq, onScheme;
    try {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      onScheme = () => {
        if (!stateRef.current.themeTouched) setState((s) => ({ ...s, theme: mq.matches ? "dark" : "light" }));
      };
      mq.addEventListener("change", onScheme);
    } catch (e) {}

    const onLang = () => {
      if (!stateRef.current.langTouched) setState((s) => ({ ...s, lang: systemLang() }));
    };
    window.addEventListener("languagechange", onLang);

    return () => {
      if (mq && onScheme) mq.removeEventListener("change", onScheme);
      window.removeEventListener("languagechange", onLang);
      window.removeEventListener("scroll", onScroll);
      if (ioRef.current) ioRef.current.disconnect();
      if (sio) sio.disconnect();
    };
  }, []);

  useEffect(() => { scanReveals(); });

  const t = COPY[state.lang];
  const dark = state.theme === "dark";
  const site = state.mode === "site";

  return (
    <div data-theme={state.theme} className="app">
      <Nav state={state} setState={setState} t={t} active={state.active} barRef={barRef} />
      <div id="top" />
      {site && <HeroE t={t} />}
      {site && (
        <>
          <ExperienceSection t={t} state={state} setState={setState} />
          <StackSection t={t} lang={state.lang} />
          <ContactSection t={t} />
          <Footer t={t} />
        </>
      )}
      {state.mode === "term" && <Console t={t} state={state} setState={setState} />}
      {state.mode === "ide" && <Ide t={t} state={state} setState={setState} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
