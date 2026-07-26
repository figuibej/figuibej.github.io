export const EMAIL = "fernando.igui@gmail.com";
export const CV_URL = "https://docs.google.com/document/d/1ZLj81jm0fPMRIhM5oRZTHl9WvyQh6hcNfx4yt0D1eOw/export?format=pdf";

export const COPY = {
  es: {
    navExp: "Experiencia", navStack: "Stack", navContact: "Contacto",
    kicker: "Software Architect · Full Stack",
    heroLede: "Más de 15 años construyendo software: arquitectura, backend a escala y aplicaciones full stack. Hoy entre plataformas de alto tráfico y proyectos propios.",
    heroBigB: "Sistemas que aguantan escala real.",
    ctaMail: "Escribime", ctaCv: "Descargar CV (PDF)",
    expTitle: "Una carrera, en orden.", expandAll: "Expandir todo", collapseAll: "Contraer todo",
    now: "Actual", stackTitle: "Con qué trabajo.",
    contactTitle: "Hablemos de tu próximo proyecto.",
    contactLede: "Disponible para consultoría de arquitectura, liderazgo técnico y desarrollo full stack.",
    elsewhere: "En la web", builtWith: "Hecho a mano · GitHub Pages",
    themeTitle: "Cambiar tema",
    modeSite: "Sitio", modeTerm: "Consola", modeIde: "IDE", ideFolder: "carrera",
    modeSiteTitle: "Ver como sitio web", modeTermTitle: "Ver como consola de comandos", modeIdeTitle: "Ver como editor de código"
  },
  en: {
    navExp: "Experience", navStack: "Stack", navContact: "Contact",
    kicker: "Software Architect · Full Stack",
    heroLede: "15+ years building software: architecture, backend at scale and full stack applications. Currently split between high-traffic platforms and my own projects.",
    heroBigB: "Systems that hold up at real scale.",
    ctaMail: "Get in touch", ctaCv: "Download CV (PDF)",
    expTitle: "One career, in order.", expandAll: "Expand all", collapseAll: "Collapse all",
    now: "Current", stackTitle: "What I work with.",
    contactTitle: "Let's talk about your next project.",
    contactLede: "Available for architecture consulting, technical leadership and full stack development.",
    elsewhere: "Elsewhere", builtWith: "Handmade · GitHub Pages",
    themeTitle: "Toggle theme",
    modeSite: "Site", modeTerm: "Console", modeIde: "IDE", ideFolder: "career",
    modeSiteTitle: "View as a website", modeTermTitle: "View as a command console", modeIdeTitle: "View as a code editor"
  }
};

export const JOBS = [
  { id: "ml-expert", logo: "img/portfolio/logo-ml.png", company: "MercadoLibre", url: "https://www.mercadolibre.com", linkLabel: "mercadolibre.com", current: true,
    years: { es: "Nov 2022 — Presente", en: "Nov 2022 — Present" },
    role: { es: "Expert IT", en: "Expert IT" },
    desc: { es: "Plataforma de envíos que integra múltiples correos para dar servicio de logística a las órdenes del sitio, a escala regional.", en: "Shipping platform integrating several postal carriers to provide logistics for site orders, at regional scale." },
    tags: ["Grails", "Oracle", "MongoDB", "Redis", "Memcached", "RabbitMQ", "Elasticsearch"] },
  { id: "pedidosya", logo: "img/portfolio/logo-pedidosya.png", company: "PedidosYa", url: "https://www.pedidosya.com.ar", linkLabel: "pedidosya.com.ar", current: false,
    years: { es: "Jun 2021 — Nov 2022", en: "Jun 2021 — Nov 2022" },
    role: { es: "Principal Software Development Engineer", en: "Principal Software Development Engineer" },
    desc: { es: "Diseño y desarrollo de sistemas distribuidos a escala, con foco en mensajería asíncrona, observabilidad e infraestructura sobre Kubernetes.", en: "Design and development of large-scale distributed systems, focused on asynchronous messaging, observability and Kubernetes-based infrastructure." },
    tags: ["Kotlin", "Kubernetes", "SNS", "SQS", "DynamoDB", "Datadog", "OpenTelemetry"] },
  { id: "mobeats", logo: "img/portfolio/logo-mobeats.png", company: "Mobeats", url: "https://mobeats.io/", linkLabel: "mobeats.io", current: false,
    years: { es: "Jul 2019 — Dic 2021", en: "Jul 2019 — Dec 2021" },
    role: { es: "Technical Leader & Full Stack Developer", en: "Technical Leader & Full Stack Developer" },
    desc: { es: "Análisis de casos de negocio para el diseño técnico. Dockerización de aplicaciones para múltiples entornos, frontends responsive y resolución de problemas de performance.", en: "Business case analysis for technical design. Dockerized applications across multiple environments, responsive frontends and performance issue resolution." },
    tags: ["Docker", "Node.js", "Vue.js", "Arquitectura", "Performance"] },
  { id: "ml-lead", logo: "img/portfolio/logo-ml.png", company: "MercadoLibre", url: "https://www.mercadolibre.com", linkLabel: "mercadolibre.com", current: false,
    groupYears: { es: "5 años", en: "5 years" },
    years: { es: "Feb 2020 — Jun 2021", en: "Feb 2020 — Jun 2021" },
    role: { es: "Senior Software Engineer Technical Lead", en: "Senior Software Engineer Technical Lead" },
    desc: { es: "Plataforma de envíos que integra múltiples correos para dar servicio de logística a las órdenes del sitio, a escala regional.", en: "Shipping platform integrating several postal carriers to provide logistics for site orders, at regional scale." },
    tags: ["Grails", "Oracle", "MongoDB", "Redis", "Memcached", "RabbitMQ", "Elasticsearch"] },
  { id: "ml", logo: "img/portfolio/logo-ml.png", company: "MercadoLibre", url: "https://www.mercadolibre.com", linkLabel: "mercadolibre.com", current: false,
    years: { es: "Jul 2016 — Feb 2020", en: "Jul 2016 — Feb 2020" },
    role: { es: "Software Engineer", en: "Software Engineer" },
    desc: { es: "Plataforma de envíos que integra múltiples correos para dar servicio de logística a las órdenes del sitio, a escala regional.", en: "Shipping platform integrating several postal carriers to provide logistics for site orders, at regional scale." },
    tags: ["Grails", "Oracle", "MongoDB", "Redis", "Memcached", "RabbitMQ", "Elasticsearch"] },
  { id: "bitson", logo: "img/portfolio/logo-bitson.png", company: "Bitson", url: "https://contrata.com.ar", linkLabel: "contrata.com.ar", current: false,
    years: { es: "Sep 2018 — Jul 2019", en: "Sep 2018 — Jul 2019" },
    role: { es: "Full Stack Developer (freelance)", en: "Full Stack Developer (freelance)" },
    desc: { es: "Aplicación web responsive de punta a punta, con autenticación por JWT y despliegue en contenedores.", en: "End-to-end responsive web application with JWT authentication and container-based deployment." },
    tags: ["Vue.js", "Vuetify", "Node.js", "Express", "MongoDB", "JWT", "Docker"] },
  { id: "uberall", logo: "img/portfolio/logo-uberall.png", company: "Uberall.la", url: "https://play.google.com/store/apps/details?id=gob.ar.modernizacion.mardelplata", linkLabel: "Turismo Mar del Plata", current: false,
    years: { es: "Nov 2017 — Ene 2018", en: "Nov 2017 — Jan 2018" },
    role: { es: "Mobile Developer (freelance)", en: "Mobile Developer (freelance)" },
    desc: { es: "App móvil para Android e iOS con georreferenciación de puntos de interés turístico mediante la API de Google Maps.", en: "Mobile app for Android and iOS with geolocated points of interest through the Google Maps API." },
    tags: ["Ionic 3", "Android", "iOS", "Google Maps API"] },
  { id: "3pbi", logo: "img/portfolio/logo-3pbi.png", company: "3pbi Consulting", url: "http://www.3pbiconsulting.com.ar/", linkLabel: "3pbiconsulting.com.ar", current: false,
    years: { es: "Jul 2016 — Oct 2016", en: "Jul 2016 — Oct 2016" },
    role: { es: "Software Developer (freelance)", en: "Software Developer (freelance)" },
    desc: { es: "Migración de base de datos y queries de Microsoft Access a SQL Server 2014, más integración con listas de SharePoint Online vía SSIS, sincronizada por un job recurrente.", en: "Migration of Microsoft Access database and queries to SQL Server 2014, plus SharePoint Online list integration via SSIS, kept in sync by a recurring job." },
    tags: ["SQL Server 2014", "SSIS", "SharePoint Online"] },
  { id: "cdt", logo: "img/portfolio/logo-cdt.jpg", company: "CDT", url: "http://www.cdt.com.ar", linkLabel: "cdt.com.ar", current: false,
    years: { es: "Ago 2015 — Jul 2016", en: "Aug 2015 — Jul 2016" },
    role: { es: "Software Architect", en: "Software Architect" },
    desc: { es: "Definición de guidelines para los equipos según el stack, evaluaciones de código estáticas y dinámicas, y comunicación de las decisiones técnicas con todas las áreas involucradas.", en: "Set guidelines for project teams according to their stack, ran static and dynamic code assessments, and communicated technical decisions across all participating areas." },
    tags: ["Java EE", "Code review", "Guidelines", "Arquitectura"] },
  { id: "braintly", logo: "img/portfolio/logo-braintly.png", company: "Braintly", url: "https://braintly.com/", linkLabel: "braintly.com", current: false,
    years: { es: "Feb 2015 — Abr 2015", en: "Feb 2015 — Apr 2015" },
    role: { es: "Mobile Developer (freelance)", en: "Mobile Developer (freelance)" },
    desc: { es: "App móvil híbrida con backend PHP/MySQL expuesto por REST con Slim, búsqueda geolocalizada con la Google Geo API y chat sobre Firebase.", en: "Hybrid mobile app with a PHP/MySQL backend exposed over REST with Slim, geolocated search using the Google Geo API and Firebase-based chat." },
    tags: ["Ionic", "Firebase", "PHP", "MySQL", "Slim", "REST"] },
  { id: "osde", logo: "img/portfolio/logo-osde.png", company: "OSDE", url: "http://www.osdebinario.com.ar", linkLabel: "osdebinario.com.ar", current: false,
    years: { es: "Abr 2013 — Ago 2015", en: "Apr 2013 — Aug 2015" },
    role: { es: "Technical Analyst", en: "Technical Analyst" },
    desc: { es: "Definiciones técnicas, testing y puesta en producción de múltiples proyectos. PoCs para kick-off y aprobación de usuarios, research de tecnología y resolución de bugs en producción.", en: "Technical definitions, testing and production deployment across several projects. PoCs for project kick-off and user approval, technology research and production bug resolution." },
    tags: ["Java EE", "Testing", "PoC", "Deploy"] },
  { id: "oracle", logo: "img/portfolio/logo-oracle.jpg", company: "Oracle", url: "http://www.oracle.com", linkLabel: "oracle.com", current: false,
    years: { es: "Oct 2010 — Abr 2013", en: "Oct 2010 — Apr 2013" },
    role: { es: "Java EE Developer (Ssr)", en: "Java EE Developer (Ssr)" },
    desc: { es: "Aplicación de escritorio para proyectar y seguir costos e ingresos de los proyectos de consultoría de Oracle. También desarrollo ADF con JDeveloper Studio sobre Oracle 11g.", en: "Desktop application to forecast and track cost and revenue for Oracle's consulting projects. Also ADF development with JDeveloper Studio on Oracle 11g." },
    tags: ["Swing", "Spring", "JPA / Hibernate", "Jasper Reports", "Maven", "Oracle ADF"] }
];

export const STACK = {
  es: [
    { label: "Backend", items: ["Java / Java EE", "Grails", "Spring", "Node.js", "Express", "Go", "PHP"] },
    { label: "Frontend & Mobile", items: ["Vue.js", "Vuetify", "Ionic", "Flutter", "HTML5", "CSS3", "Android", "iOS"] },
    { label: "Datos & Mensajería", items: ["Oracle", "SQL Server", "MongoDB", "MySQL", "Redis", "Memcached", "Elasticsearch", "RabbitMQ"] },
    { label: "Plataforma", items: ["Docker", "Maven", "CI/CD", "REST", "JWT", "Arquitectura de sistemas"] }
  ],
  en: [
    { label: "Backend", items: ["Java / Java EE", "Grails", "Spring", "Node.js", "Express", "Go", "PHP"] },
    { label: "Frontend & Mobile", items: ["Vue.js", "Vuetify", "Ionic", "Flutter", "HTML5", "CSS3", "Android", "iOS"] },
    { label: "Data & Messaging", items: ["Oracle", "SQL Server", "MongoDB", "MySQL", "Redis", "Memcached", "Elasticsearch", "RabbitMQ"] },
    { label: "Platform", items: ["Docker", "Maven", "CI/CD", "REST", "JWT", "System architecture"] }
  ]
};
