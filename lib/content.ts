/**
 * All site content. Sourced from the live neegles.com (Nov 2026).
 * Do not add clients, metrics, testimonials or outcomes that Neegles has not published.
 */

export const company = {
  name: "Neegles",
  legalName: "Neegles Ltd",
  url: "https://neegles.com",
  email: "info@neegles.com",
  whatsapp: "https://wa.me/message/HKQP67YHQAVNJ1",
  description:
    "Neegles is a technology company building innovative digital solutions and products that solve real-world problems. We specialize in web development, mobile apps, UI/UX design, and enterprise solutions.",
  mission:
    "To build smart, scalable, and impactful technology solutions that simplify lives and empower businesses.",
  vision:
    "To be Africa's leading force in software innovation recognized globally for excellence, impact, and integrity.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/neegles/" },
    { label: "Instagram", href: "https://www.instagram.com/neegles" },
    { label: "X", href: "https://x.com/Neeglesng" },
    { label: "YouTube", href: "https://www.youtube.com/@neegles" },
    { label: "TikTok", href: "https://www.tiktok.com/@neeglesng" },
    { label: "Facebook", href: "https://www.facebook.com/neeglesng" },
  ],
};

export const startProjectHref = `mailto:${company.email}?subject=${encodeURIComponent(
  "Starting a project with Neegles",
)}`;

export type CapabilityShape = "braces" | "stack" | "cloud" | "neural" | "loop";

export const capabilities: {
  id: string;
  title: string;
  kicker: string;
  body: string;
  includes: string[];
  shape: CapabilityShape;
}[] = [
  {
    id: "software",
    title: "Software engineering",
    kicker: "Systems that carry the weight",
    body: "Custom web applications and enterprise systems that simplify workflows and improve business efficiency, built to be responsive, scalable and accessible.",
    includes: ["Custom web applications", "Enterprise systems", "ERP & CRM", "Integrations"],
    shape: "braces",
  },
  {
    id: "product",
    title: "Product development",
    kicker: "From first sketch to shipped",
    body: "User-centred interfaces and native and cross-platform mobile apps for iOS and Android, designed to merge aesthetics and function and built for speed.",
    includes: ["UI/UX design", "Mobile apps", "Product discovery", "Design systems"],
    shape: "stack",
  },
  {
    id: "cloud",
    title: "Cloud infrastructure",
    kicker: "Speed and reliability, by design",
    body: "Scalable cloud infrastructure and continuous delivery pipelines, plus round-the-clock support and continuous improvement to keep products running at their best.",
    includes: ["Cloud architecture", "DevOps & CI/CD", "Monitoring", "Support & maintenance"],
    shape: "cloud",
  },
  {
    id: "ai",
    title: "Artificial intelligence",
    kicker: "Intelligence where it earns its place",
    body: "Applied AI built into real products, like the AI-powered image editing explored in our Labs, used where it genuinely saves people time and not as decoration.",
    includes: ["AI product features", "Image & content tools", "Intelligent workflows", "Data foundations"],
    shape: "neural",
  },
  {
    id: "automation",
    title: "Business automation",
    kicker: "Less admin. More business.",
    body: "Business process automation, client portals, billing and internal dashboards that replace manual record-keeping with systems that run themselves.",
    includes: ["Process automation", "Client portals", "Billing systems", "Internal dashboards"],
    shape: "loop",
  },
];

export const approach = {
  statement:
    "We start with the problem, not the stack. We learn how your business actually works, then design and engineer software that fits it, and keeps fitting as you grow.",
  steps: [
    {
      title: "Discovery",
      body: "We map the problem, the people and the constraints before writing a line of code.",
    },
    {
      title: "Design",
      body: "Flows and interfaces that make the complex feel obvious, tested before they are built.",
    },
    {
      title: "Development",
      body: "Agile sprints with working software at the end of each one, and you see progress as it happens.",
    },
    {
      title: "Quality assurance",
      body: "Every release is tested for function, performance and edge cases before anyone depends on it.",
    },
    {
      title: "Launch",
      body: "A planned, measured release with infrastructure that is ready for real traffic on day one.",
    },
    {
      title: "Support & growth",
      body: "24/7 technical support and continuous improvement. Shipping is where the work changes, not where it ends.",
    },
  ],
};

export type Project = {
  id: string;
  name: string;
  industry: string;
  summary: string;
  challenge: string;
  built: string[];
  technologies?: string[];
  laptopScreen: string;
  slateScreen: string;
  gallery: { src: string; alt: string; w: number; h: number }[];
  accent: string;
  /** Published on the current neegles.com projects page. */
  solution?: string;
  outcome?: string;
  url?: string;
  kind?: string;
};

export const projects: Project[] = [
  {
    id: "profix-desk",
    name: "ProFix Desk",
    industry: "Repair businesses",
    summary:
      "A web-based repair management platform that helps repair shops streamline job management, track repair progress and stay on top of payments, all in one place.",
    challenge:
      "Repair businesses were struggling with manual record-keeping, leading to disorganised workflows and payment tracking issues. Without a central system it was hard to manage requests, track repairs and keep clear financial records.",
    solution:
      "A web-based repair management platform that streamlines the whole repair process: customer management, job tracking, inventory management and integrated payment processing in one workflow.",
    outcome:
      "A more organised workflow with fewer errors. Every transaction is logged and visible, so payment tracking is clear and disputes have nothing to stand on.",
    built: ["Customer management", "Job tracking", "Inventory management", "Integrated payment processing"],
    laptopScreen: "/work/profix-features.webp",
    slateScreen: "/work/profix-dashboard.webp",
    gallery: [
      { src: "/work/profix-landing.webp", alt: "ProFix Desk landing page: Manage Repair, Grow Your Business.", w: 1902, h: 840 },
      { src: "/work/profix-desktop.webp", alt: "ProFix Desk dashboard with orders in progress and the order management list.", w: 1059, h: 1704 },
      { src: "/work/profix-mobile.webp", alt: "ProFix Desk features page with the mobile job view.", w: 1200, h: 1764 },
      { src: "/work/profix-app.webp", alt: "ProFix Desk mobile app home with order stats.", w: 864, h: 858 },
    ],
    accent: "#5fae3c",
    url: "https://profixdesk.com/",
  },
  {
    id: "kike",
    name: "Kiké",
    industry: "African fashion & e-commerce",
    summary:
      "A marketplace for authentic African-inspired clothing, with a Restyle Market that gives pre-loved pieces a second life through thrifting.",
    challenge:
      "Finding authentic African fashion was hard for people who wanted to celebrate African culture through what they wear. There was no platform showcasing authentic African-inspired design alongside sustainable options.",
    solution:
      "A platform that is both a marketplace for African-inspired clothing and a Restyle Market for thrifting, connecting shoppers with authentic designers and a sustainable way to buy.",
    outcome:
      "Kiké gives people access to authentic, sustainable African fashion: unique designs that celebrate the culture, and an integrated thrifting market.",
    built: ["Fashion marketplace", "Product catalogue & pages", "Restyle Market for thrifting", "E-commerce checkout"],
    laptopScreen: "/work/kike-home.webp",
    slateScreen: "/work/kike-product.webp",
    gallery: [
      { src: "/work/kike-home.webp", alt: "Kiké homepage: Telling our stories, with fashion categories.", w: 1600, h: 2352 },
      { src: "/work/kike-product.webp", alt: "Kiké product page for a patterned suit.", w: 353, h: 568 },
    ],
    accent: "#c8a26b",
    url: "https://kike.neegles-dev.name.ng/",
  },
  {
    id: "oio",
    name: "OiO",
    industry: "Events marketplace",
    summary: "Owanbe is Online: a two-sided marketplace connecting people planning Owanbe celebrations with verified vendors.",
    challenge:
      "Planning an Owanbe was stressful and slow. Clients struggled to find reliable vendors, compare prices and coordinate the logistics of a traditional Nigerian celebration.",
    solution:
      "A two-sided marketplace connecting hosts with verified vendors, closing the gaps caused by mismatched expectations, hidden pricing and slow communication.",
    outcome: "Vendors are more visible and clients spend far less time searching, so both sides connect faster and celebrations are better planned.",
    built: ["Two-sided marketplace", "Verified vendor profiles", "Transparent pricing & packages", "Event planning flow"],
    laptopScreen: "/work/oio-mobile.webp",
    slateScreen: "/work/oio-desktop.webp",
    gallery: [
      { src: "/work/oio-mobile.webp", alt: "OiO homepage: From Aso Ebi to Afterparty, all in one place.", w: 1200, h: 1764 },
      { src: "/work/oio-desktop.webp", alt: "OiO vendors page: trusted by celebrants and vendors across Nigeria.", w: 1059, h: 1704 },
      { src: "/work/oio-speakers.webp", alt: "OiO speaker and session cards in bold colour blocks.", w: 1896, h: 809 },
    ],
    accent: "#e8622c",
    url: "https://oio.ng",
  },
  {
    id: "footera",
    name: "Footera",
    industry: "Footwear & retail",
    summary: "A website for a Lagos footwear brand known for quality and craftsmanship, built to carry the brand online.",
    challenge:
      "Footera was expanding online, but its existing presence did not communicate its commitment to quality and traditional craftsmanship.",
    solution:
      "A redesigned, responsive website that leads with craft and quality: the brand story, the products and how they are made, with an intuitive shopping experience.",
    outcome: "More online traffic and a wider customer base, with a digital presence that finally reflects the brand's values and craftsmanship.",
    built: ["Brand website", "Product catalogue", "Shopping experience", "Brand storytelling"],
    laptopScreen: "/work/footera-mobile.webp",
    slateScreen: "/work/footera-desktop.webp",
    gallery: [
      { src: "/work/footera-mobile.webp", alt: "Footera homepage: Let's upgrade your shoes now.", w: 1200, h: 1764 },
      { src: "/work/footera-desktop.webp", alt: "Footera product listing and blog.", w: 1059, h: 1704 },
    ],
    accent: "#3fae8f",
    url: "https://footera.ng",
  },
  {
    id: "compassionate-heart",
    name: "Compassionate Heart",
    industry: "Nonprofit",
    summary: "A new website for a nonprofit, built to tell its story, show its impact and make it easy to get involved.",
    challenge:
      "Compassionate Heart's outdated website did not communicate its mission, which made it hard to engage supporters and show the impact of its work in the community.",
    solution:
      "A new responsive website with intuitive navigation and categorised causes, designed around storytelling and the real impact of the organisation's work.",
    outcome: "Better engagement: supporters understand the mission, see the impact and find ways to contribute, through donations and volunteering.",
    built: ["Responsive website", "Categorised causes", "Impact storytelling", "Ways to get involved"],
    laptopScreen: "/work/compassion-mobile.webp",
    slateScreen: "/work/compassion-desktop.webp",
    gallery: [
      { src: "/work/compassion-mobile.webp", alt: "Compassionate Heart homepage: Care about people.", w: 1200, h: 1764 },
      { src: "/work/compassion-desktop.webp", alt: "Compassionate Heart pages with causes and community photos.", w: 1103, h: 1775 },
    ],
    accent: "#d9822b",
    url: "https://compassionateheart.org.ng",
  },
  {
    id: "gadmos",
    name: "Gadmos",
    industry: "Security & facility services",
    summary: "A modern website for Gadmos Security & Services Ltd that communicates its range of security services with the professionalism the business has.",
    challenge:
      "Gadmos's old website did not reflect its professionalism or explain its security services, and the dated design was holding back new client enquiries.",
    solution:
      "A modern, responsive website tailored to the brand that clearly lays out the range of services and leads with professionalism, trust and expertise.",
    outcome: "Stronger engagement and lead generation, with more enquiries and new clients coming through the site.",
    built: ["Brand website", "Service pages", "Enquiry flows", "Responsive design"],
    laptopScreen: "/work/gadmos-mobile.webp",
    slateScreen: "/work/gadmos-desktop.webp",
    gallery: [
      { src: "/work/gadmos-mobile.webp", alt: "Gadmos homepage: Cleaning service and complete security solutions.", w: 1200, h: 1764 },
      { src: "/work/gadmos-desktop.webp", alt: "Gadmos service pages.", w: 1059, h: 1704 },
    ],
    accent: "#c4302b",
    url: "https://gadmosservices.com/",
  },
];

export const industries = [
  {
    id: "logistics",
    name: "Logistics",
    headline: "Build smarter logistics operations with custom software.",
    modules: ["Fleet management", "Delivery tracking", "Warehouse management", "Inventory systems", "Dispatch software", "Customer tracking portal"],
    image: "/industries/gen-logistics.webp",
    imageAlt: "Shipping containers being loaded at a port.",
  },
  {
    id: "real-estate",
    name: "Real estate",
    headline: "Sell more properties with software built for modern real estate companies.",
    modules: ["Real estate CRM", "Property listing platforms", "Agency management", "Tenant management", "Property payment portals", "Investment dashboards"],
    image: "/industries/gen-real-estate.webp",
    imageAlt: "A modern two-storey house lit at dusk.",
  },
  {
    id: "professional-services",
    name: "Professional services",
    headline: "Run your business more efficiently with custom business software.",
    modules: ["Client portals", "CRM systems", "Project management", "Billing systems", "Appointment booking", "Internal dashboards"],
    image: "/industries/gen-professional-services.webp",
    imageAlt: "A team reviewing dashboards together in an office.",
  },
  {
    id: "construction",
    name: "Construction",
    headline: "Build better projects. Run a smarter construction business.",
    modules: ["Project management systems", "Websites & digital portfolios", "Inventory & procurement", "Cost & financial management", "Process automation", "Client portals"],
    image: "/industries/gen-construction.webp",
    imageAlt: "A building under construction with scaffolding.",
  },
];

/** Published on neegles.com industry pages. Excerpts; confirm full wording before launch. */
export const voices = [
  { quote: "Working with Neegles transformed our digital presence.", name: "Steve O.", role: "MD, Ocheme Travels & Tours" },
  { quote: "Neegles transformed our travel booking system with their innovative approach.", name: "Akin A.", role: "Country Manager, CHWM" },
  { quote: "The team's professionalism and technical excellence exceeded our expectations.", name: "Nwojo D.", role: "Founder, NoJeon" },
  { quote: "Working with Neegles was a game-changer for our e-commerce platform.", name: "Adeshina O.", role: "CEO, Gadmos" },
  { quote: "The team's creative solutions and technical implementation exceeded our expectations.", name: "Adura O.", role: "CEO, Footera" },
  { quote: "The Neegles team delivered beyond our expectations.", name: "Debra D.", role: "CEO, iDaraonline" },
  { quote: "Neegles helped us build a robust platform that scaled with our business growth.", name: "Mrs Kike H.", role: "Founder, Kiké Africa" },
];

export const labs = {
  headline: "Experiments that ship.",
  sub: "UI studies, product surfaces, and visual R&D.",
  practices: [
    { name: "Product design", line: "Research · Systems · UI" },
    { name: "Engineering", line: "Web · Mobile · Platform" },
    { name: "Brand systems", line: "Type · Color · Motion" },
    { name: "Signal", line: "Less chrome. More product." },
  ],
  items: [
    {
      id: "prism",
      name: "Prism",
      tag: "AI · Product surface",
      body: "Professional image editing powered by AI: crop, erase, adjust colours and remove backgrounds in the browser.",
      image: "/labs/prism.webp",
      w: 1913,
      h: 832,
    },
    {
      id: "oio",
      name: "oio",
      tag: "Marketplace · UI study",
      body: "From aso ebi to afterparty: an events marketplace connecting people with trusted vendors across Nigeria.",
      image: "/labs/oio-home.webp",
      w: 1200,
      h: 1764,
    },
    {
      id: "idara",
      name: "iDara",
      tag: "Product design",
      body: "A fashion design companion connecting designers and clients looking for the perfect fit.",
      image: "/labs/idara.webp",
      w: 1902,
      h: 842,
    },
    {
      id: "footera",
      name: "Footera",
      tag: "Systems · Access",
      body: "A quiet, focused staff sign-in surface: less chrome, more product.",
      image: "/labs/footera.webp",
      w: 1898,
      h: 822,
    },
  ],
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
];

/* ---------------- site map ---------------- */
export const pages = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Labs", href: "/labs" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/** Everything that can sit in the work deck: client projects first, then Labs. */
export const workItems = [
  ...projects.map((p) => ({
    slug: p.id,
    href: `/work/${p.id}`,
    name: p.name,
    kind: "Client work",
    tags: [p.industry, ...p.built.slice(0, 2)],
    image: p.gallery[0].src,
    summary: p.summary,
  })),
  ...labs.items.filter((l) => !projects.some((p) => p.name.toLowerCase() === l.name.toLowerCase())).map((l) => ({
    slug: l.id,
    href: `/labs#${l.id}`,
    name: l.name,
    kind: "Labs",
    tags: l.tag.split(" · "),
    image: l.image,
    summary: l.body,
  })),
];

/** Careers: keep to what Neegles publishes. Replace `openRoles` when roles are live. */
export const careers = {
  headline: "Build what people depend on.",
  intro:
    "Neegles is a technology company building web, mobile and enterprise software. We work problem-first, ship in sprints and stay with what we build.",
  principles: [
    { title: "Problem-first", body: "We learn how a business actually works before we write a line of code." },
    { title: "Ship, then improve", body: "Working software at the end of every sprint, and continuous improvement after launch." },
    { title: "Built for Africa, made for anywhere", body: "Software that holds up for real customers, in Nigeria and beyond." },
  ],
  openRoles: [] as { title: string; type: string; location: string }[],
};

/** Studio renders made for the site (Blender, from the real product screens). */
export const renders: Record<string, string> = {
  "profix-desk": "/renders/profix.webp",
  kike: "/renders/kikelap.webp",
  prism: "/renders/prism.webp",
  oio: "/renders/oio.webp",
  idara: "/renders/idara.webp",
  footera: "/renders/footera-site.webp",
  "compassionate-heart": "/renders/compassion.webp",
  gadmos: "/renders/gadmos.webp",
};

/** Featured slides for the N reveal. Taglines are ours, not client claims. */
export const featured = [
  { slug: "profix-desk", name: "ProFix Desk", line: "Repairs, sorted.", kind: "Client work · Repair businesses", image: "/renders/profix.webp", href: "/work/profix-desk" },
  { slug: "kike", name: "Kiké", line: "Heritage, online.", kind: "Client work · Fashion & e-commerce", image: "/renders/kike.webp", href: "/work/kike" },
  { slug: "oio", name: "OiO", line: "Every party, one place.", kind: "Client work · Events marketplace", image: "/renders/oio.webp", href: "/work/oio" },
  { slug: "prism", name: "Prism", line: "Editing, without the edit suite.", kind: "Labs · AI image editing", image: "/renders/prism.webp", href: "/labs" },
];

export const whyNeegles = [
  { n: "01", title: "Problem-first thinking", body: company.mission, image: "/renders/idara.webp", tone: "blue" },
  { n: "02", title: "Five practices, one team", body: "Engineering, product, cloud, AI and automation under one roof, so nothing gets lost between vendors.", image: "/renders/footera.webp", tone: "ink" },
  { n: "03", title: "Built for Africa, made for anywhere", body: company.vision, image: "/renders/kike.webp", tone: "paper" },
  { n: "04", title: "Support that stays", body: "Round-the-clock technical support and continuous improvement to keep your product running at its best.", image: "/renders/nmark.webp", tone: "navy" },
];
