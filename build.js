const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const OUT = path.join(__dirname, "index.html");

async function build() {
  const result = await esbuild.build({
    entryPoints: [path.join(SRC, "app.jsx")],
    bundle: true,
    write: false,
    minify: true,
    format: "iife",
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    target: ["es2019"]
  });

  const js = result.outputFiles[0].text;
  const css = fs.readFileSync(path.join(SRC, "style.css"), "utf8");
  const template = fs.readFileSync(path.join(SRC, "index.html"), "utf8");

  const html = template
    .replace("<!--APP_CSS-->", css)
    .replace("<!--APP_JS-->", js);

  fs.writeFileSync(OUT, html);
  console.log("Built " + OUT + " (" + (html.length / 1024).toFixed(1) + " KB)");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
