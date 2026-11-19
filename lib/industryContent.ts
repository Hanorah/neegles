/**
 * Industry page content, ported from the published neegles.com industry pages (src/data in the current site).
 * Do not add claims, metrics or clients that are not published there.
 */

export type IndustryProblem = {
  title: string
  description: string
}

export type IndustrySolution = {
  number: 1 | 2 | 3 | 4 | 5 | 6
  title: string
  description: string
  features: string[]
}

export type IndustryLandingContent = {
  slug: 'logistics' | 'real-estate' | 'professional-services' | 'construction'
  path: string
  meta: {
    title: string
    description: string
    keywords: string
    ogImageAlt: string
    schemaName: string
  }
  hero: {
    headlineBefore: string
    headlineAccent: string
    headlineAfter?: string
    description: string
    cta: string
    image: string
    imageAlt: string
    /** Extra hero images; when present the hero crossfades through all of them. */
    additionalImages?: {
      image: string
      imageAlt: string
      /** CSS object-position used when the image is cropped to the hero frame. */
      objectPosition?: string
    }[]
  }
  problems: {
    eyebrow: string
    headlineBefore: string
    headlineAccent: string
    headlineAfter: string
    intro: string
    items: IndustryProblem[]
  }
  solutions: {
    eyebrow: string
    headlineBefore: string
    headlineMuted: string
    headlineAfter: string
    cta: string
    items: IndustrySolution[]
  }
  process: {
    eyebrow?: string
    headlineBefore: string
    headlineAccent: string
    headlineAfter: string
    /** Optional per-industry step copy; falls back to the shared default steps. */
    steps?: { title: string; description: string }[]
  }
}

export const logisticsLandingContent: IndustryLandingContent = {
  slug: 'logistics',
  path: '/logistics',
  meta: {
    title: 'Logistics Software - Neegles',
    description:
      'Digitise dispatching, fleet management, deliveries, inventory, and customer tracking with custom software designed around your logistics operations.',
    keywords:
      'logistics software, fleet management software, dispatch software, delivery tracking, inventory management, custom logistics software, Neegles',
    ogImageAlt: 'Neegles Logistics Software',
    schemaName: 'Custom Logistics Software',
  },
  hero: {
    headlineBefore: 'Build Smarter Logistics Operations With ',
    headlineAccent: 'Custom Software.',
    description:
      'Digitise dispatching, fleet management, deliveries, inventory, and customer tracking with software designed around your logistics operations.',
    cta: 'Start a Project',
    image: '/industries/gen-logistics.webp',
    imageAlt: 'Shipping port with a gantry crane lifting a container',
  },
  problems: {
    eyebrow: 'Problems We Solve',
    headlineBefore: 'The challenges ',
    headlineAccent: 'slowing down',
    headlineAfter: ' your operations.',
    intro:
      'Manual dispatching, phone-based driver communication, spreadsheets, and disconnected tracking systems make it difficult to run efficient logistics operations. Neegles creates connected software that brings your fleet, deliveries, inventory, drivers, and customers into one platform.',
    items: [
      {
        title: 'Delayed Deliveries',
        description:
          'Without reliable route planning and delivery monitoring, shipments arrive late and operational issues are discovered too slowly.',
      },
      {
        title: 'Manual Dispatching',
        description:
          'Assigning drivers through calls, messages, or spreadsheets slows down operations and increases the risk of mistakes.',
      },
      {
        title: 'No Shipment Visibility',
        description:
          'Operations teams and customers cannot clearly see where shipments are or when they will arrive.',
      },
      {
        title: 'Driver Miscommunication',
        description:
          'Incomplete delivery instructions, route changes, and missed updates create confusion between drivers and dispatch.',
      },
      {
        title: 'Poor Inventory Tracking',
        description:
          'Incorrect stock records and disconnected warehouse processes lead to shortages, misplaced items, and delayed fulfilment.',
      },
      {
        title: 'Customer Complaints',
        description:
          'Customers become frustrated when they cannot track deliveries, receive updates, or get accurate arrival times.',
      },
    ],
  },
  solutions: {
    eyebrow: 'Our Logistics Solutions',
    headlineBefore: 'Technical solutions built around your ',
    headlineMuted: 'logistics',
    headlineAfter: ' workflow.',
    cta: 'Start a Project',
    items: [
      {
        number: 1,
        title: 'Fleet Management',
        description:
          'Manage vehicles, drivers, availability, maintenance, fuel usage, documents, and fleet performance from one central platform.',
        features: [
          'Vehicle profiles',
          'Driver assignments',
          'Maintenance schedules',
          'Fuel monitoring',
          'Vehicle availability',
          'Licence and insurance reminders',
          'Fleet performance reports',
        ],
      },
      {
        number: 2,
        title: 'Delivery Tracking',
        description:
          'Monitor shipments from pickup to final delivery and give operations teams complete visibility into delivery progress.',
        features: [
          'Real-time delivery status',
          'GPS location tracking',
          'Estimated arrival time',
          'Delivery milestones',
          'Proof of delivery',
          'Delay alerts',
          'Delivery history',
        ],
      },
      {
        number: 3,
        title: 'Warehouse Management',
        description:
          'Coordinate receiving, storage, picking, packing, fulfilment, and dispatch activities within your warehouse.',
        features: [
          'Goods receiving',
          'Storage location management',
          'Order picking',
          'Packing workflows',
          'Shipment preparation',
          'Warehouse activity logs',
          'Operational reports',
        ],
      },
      {
        number: 4,
        title: 'Inventory Systems',
        description:
          'Maintain accurate stock records across warehouses, stores, fulfilment centres, and distribution locations.',
        features: [
          'Real-time stock levels',
          'Stock transfers',
          'Low-stock alerts',
          'Batch and item tracking',
          'Inventory reconciliation',
          'Supplier records',
          'Inventory reports',
        ],
      },
      {
        number: 5,
        title: 'Dispatch Software',
        description:
          'Assign drivers, organise deliveries, prioritise orders, and coordinate dispatch activity from one control centre.',
        features: [
          'Automated driver assignment',
          'Delivery scheduling',
          'Dispatch board',
          'Priority deliveries',
          'Driver availability',
          'Route allocation',
          'Live operational updates',
        ],
      },
      {
        number: 6,
        title: 'Customer Tracking Portal',
        description:
          'Allow customers to track deliveries, view shipment history, receive updates, and access delivery documents.',
        features: [
          'Live shipment tracking',
          'Estimated delivery time',
          'Delivery notifications',
          'Order history',
          'Proof of delivery',
          'Customer support requests',
          'Downloadable documents',
        ],
      },
    ],
  },
  process: {
    headlineBefore: 'How ',
    headlineAccent: 'Neegles',
    headlineAfter: ' work with logistics companies.',
  },
}

export const realEstateLandingContent: IndustryLandingContent = {
  slug: 'real-estate',
  path: '/real-estate',
  meta: {
    title: 'Real Estate Software - Neegles',
    description:
      'Custom CRM, property management systems, client portals, and automation tools that help real estate businesses close more deals.',
    keywords:
      'real estate software, property management software, real estate CRM, listing platform, tenant management, custom real estate software, Neegles',
    ogImageAlt: 'Neegles Real Estate Software',
    schemaName: 'Custom Real Estate Software',
  },
  hero: {
    headlineBefore: 'Sell More Properties With ',
    headlineAccent: 'Software',
    headlineAfter: ' Built For Modern Real Estate Companies.',
    description:
      'Custom CRM, property management systems, client portals, and automation tools that help real estate businesses close more deals.',
    cta: 'Start a Project',
    image: '/industries/gen-real-estate.webp',
    imageAlt: 'Modern home exterior at twilight',
  },
  problems: {
    eyebrow: 'Problems We Solve',
    headlineBefore: 'Stop losing deals to ',
    headlineAccent: 'manual processes',
    headlineAfter: ' and disconnected tools',
    intro:
      'Many real estate businesses still depend on spreadsheets, WhatsApp conversations, paper documents, and disconnected applications. Neegles brings your listings, leads, agents, payments, documents, and clients into one connected system.',
    items: [
      {
        title: 'Managing Listings Manually',
        description:
          'Property information becomes outdated, duplicated, or difficult to access across different teams.',
      },
      {
        title: 'Leads Getting Lost',
        description:
          'Enquiries from websites, phone calls, social media, and property portals are not properly recorded or assigned.',
      },
      {
        title: 'Poor Follow-Up',
        description:
          'Agents forget to follow up with prospects, causing interested buyers and tenants to lose interest.',
      },
      {
        title: 'No Client Portal',
        description:
          'Clients cannot conveniently view properties, monitor payments, access documents, or follow transaction progress.',
      },
      {
        title: 'Scattered Property Documents',
        description:
          'Agreements, inspection reports, payment receipts, property images, and ownership documents are stored in different locations.',
      },
      {
        title: 'Inefficient Agent Management',
        description:
          'Managers lack visibility into agent activities, assigned leads, inspections, commissions, and sales performance.',
      },
    ],
  },
  solutions: {
    eyebrow: 'Our Real Estate Solutions',
    headlineBefore: 'Software designed around your ',
    headlineMuted: 'business.',
    headlineAfter: '',
    cta: 'Start a Project',
    items: [
      {
        number: 1,
        title: 'Real Estate CRM',
        description:
          'Capture enquiries, assign leads to agents, schedule follow-ups, track conversations, and move prospects through a structured sales pipeline.',
        features: [
          'Lead capture',
          'Lead assignment',
          'Follow-up reminders',
          'Sales pipeline',
          'Client communication history',
          'Deal status tracking',
        ],
      },
      {
        number: 2,
        title: 'Property Listing Platforms',
        description:
          'Showcase available properties through a responsive website or marketplace with advanced search, property filtering, maps, galleries, and enquiry forms.',
        features: [
          'Property search',
          'Advanced filters',
          'Location maps',
          'Image and video galleries',
          'Virtual tour support',
          'Property enquiry forms',
        ],
      },
      {
        number: 3,
        title: 'Agency Management Software',
        description:
          'Manage agents, branches, commissions, property assignments, activities, inspections, and sales performance from one platform.',
        features: [
          'Agent profiles',
          'Lead assignments',
          'Commission tracking',
          'Activity monitoring',
          'Branch management',
          'Performance reports',
        ],
      },
      {
        number: 4,
        title: 'Tenant Management System',
        description:
          'Manage tenants, rent schedules, property occupancy, maintenance requests, agreements, and communication.',
        features: [
          'Tenant profiles',
          'Rent reminders',
          'Lease management',
          'Maintenance requests',
          'Occupancy tracking',
          'Tenant communication',
        ],
      },
      {
        number: 5,
        title: 'Property Payment Portals',
        description:
          'Enable buyers and tenants to securely make rent, deposit, service charge, instalment, and property payments online.',
        features: [
          'Online payments',
          'Payment plans',
          'Automated receipts',
          'Payment reminders',
          'Transaction history',
          'Outstanding balance tracking',
        ],
      },
      {
        number: 6,
        title: 'Property Investment Dashboards',
        description:
          'Give investors secure access to investment performance, payment schedules, property updates, documents, returns, and portfolio information.',
        features: [
          'Investment overview',
          'Portfolio performance',
          'Property updates',
          'Payment records',
          'Document access',
          'Investor reporting',
        ],
      },
    ],
  },
  process: {
    headlineBefore: 'How ',
    headlineAccent: 'Neegles',
    headlineAfter: ' work with real estate companies.',
  },
}

export const professionalServicesLandingContent: IndustryLandingContent = {
  slug: 'professional-services',
  path: '/professional-services',
  meta: {
    title: 'Professional Services Software - Neegles',
    description:
      'Whether you run a law firm, consulting agency, accounting practice, or marketing company, Neegles builds systems that eliminate repetitive work and improve client experiences.',
    keywords:
      'professional services software, client portal, CRM, project management, billing software, appointment booking, custom business software, Neegles',
    ogImageAlt: 'Neegles Professional Services Software',
    schemaName: 'Custom Professional Services Software',
  },
  hero: {
    headlineBefore: 'Run Your Business More Efficiently With ',
    headlineAccent: 'Custom Business Software.',
    description:
      'Whether you run a law firm, consulting agency, accounting practice, or marketing company, Neegles builds systems that eliminate repetitive work, improve client experiences, and give your team greater operational visibility.',
    cta: 'Start a Project',
    image: '/industries/gen-professional-services.webp',
    imageAlt: 'Professional reviewing documents on a laptop in a modern office',
  },
  problems: {
    eyebrow: 'Operational Challenges',
    headlineBefore: 'When operations becomes too ',
    headlineAccent: 'manual.',
    headlineAfter: '',
    intro:
      'Professional service firms often depend on spreadsheets, email threads, messaging applications, paper documents, and disconnected software. As the business grows, these processes become harder to manage and create unnecessary delays.',
    items: [
      {
        title: 'Client Information Is Scattered',
        description:
          'Contact details, communication history, agreements, invoices, and project information are stored across different tools.',
      },
      {
        title: 'Repetitive Administrative Work',
        description:
          'Teams repeatedly prepare documents, send reminders, update records, and complete tasks that could be automated.',
      },
      {
        title: 'Poor Project Visibility',
        description:
          'Managers cannot quickly see project status, deadlines, team workload, or activities requiring attention.',
      },
      {
        title: 'Slow Client Communication',
        description:
          'Clients frequently request updates because they do not have a clear place to view progress, documents, or upcoming actions.',
      },
      {
        title: 'Delayed Billing and Payments',
        description:
          'Manual invoicing, payment tracking, and follow-ups lead to late payments and inconsistent financial records.',
      },
      {
        title: 'Difficult Business Reporting',
        description:
          'Information must be manually collected from different systems before management can understand business performance.',
      },
    ],
  },
  solutions: {
    eyebrow: 'Our Business Operation Solutions',
    headlineBefore: 'Software solutions built around your ',
    headlineMuted: 'workflow.',
    headlineAfter: '',
    cta: 'Start a Project',
    items: [
      {
        number: 1,
        title: 'Client Portals',
        description:
          'Give clients a secure place to view project progress, submit information, access documents, and communicate with your team.',
        features: [
          'Secure client login',
          'Project progress visibility',
          'Document uploads',
          'Deliverable access',
          'Client messaging',
          'Request submissions',
          'Notification alerts',
        ],
      },
      {
        number: 2,
        title: 'CRM Systems',
        description:
          'Manage prospective and existing clients from first enquiry through proposal, onboarding, delivery, and ongoing relationship management.',
        features: [
          'Lead capture',
          'Client profiles',
          'Sales pipeline',
          'Follow-up reminders',
          'Proposal tracking',
          'Communication history',
          'Conversion reporting',
        ],
      },
      {
        number: 3,
        title: 'Project Management',
        description:
          'Coordinate assignments, deadlines, deliverables, and team capacity so every engagement stays on track.',
        features: [
          'Project timelines',
          'Task assignments',
          'Milestone tracking',
          'Team workload view',
          'File collaboration',
          'Status updates',
          'Deadline alerts',
        ],
      },
      {
        number: 4,
        title: 'Billing Systems',
        description:
          'Create invoices, track payments, manage retainers, and keep financial records aligned with delivered work.',
        features: [
          'Invoice creation',
          'Recurring billing',
          'Payment links',
          'Payment reminders',
          'Retainer management',
          'Revenue reporting',
          'Outstanding balances',
        ],
      },
      {
        number: 5,
        title: 'Appointment Booking',
        description:
          'Let clients schedule consultations and meetings without email back-and-forth or calendar confusion.',
        features: [
          'Online booking',
          'Calendar integration',
          'Automated confirmations',
          'Rescheduling',
          'Reminder notifications',
          'Meeting types',
          'Availability rules',
        ],
      },
      {
        number: 6,
        title: 'Internal Dashboards',
        description:
          'Give leadership a clear view of clients, projects, revenue, utilisation, and operational health in one place.',
        features: [
          'Business performance',
          'Client activity',
          'Project health',
          'Revenue insights',
          'Team utilisation',
          'Operational alerts',
          'Custom reports',
        ],
      },
    ],
  },
  process: {
    headlineBefore: 'How ',
    headlineAccent: 'Neegles',
    headlineAfter: ' work with professional service firms.',
  },
}



/**
 * Content for the Construction Industry Solutions landing page (/construction).
 * Structure mirrors the other industry pages (hero / problems / solutions / process)
 * and adds construction-specific sections (benefits, segments, why us, FAQ, lead form).
 */

/** Anchor ids used by in-page CTAs. */
export const CONSTRUCTION_ANCHORS = {
  solutions: 'solutions',
  consultation: 'consultation',
} as const

export type ConstructionSolutionIcon =
  | 'project'
  | 'website'
  | 'inventory'
  | 'finance'
  | 'automation'
  | 'portal'

export type ConstructionBenefitIcon =
  | 'visibility'
  | 'cost'
  | 'team'
  | 'organised'
  | 'presence'
  | 'scale'

export type ConstructionLandingContent = IndustryLandingContent & {
  slug: 'construction'
  /** Public path of the 1200x630 social sharing image. */
  ogImage: string
  heroCtas: {
    primary: string
    secondary: string
  }
  solutionIcons: ConstructionSolutionIcon[]
  benefits: {
    eyebrow: string
    headline: string
    intro: string
    items: { title: string; description: string; icon: ConstructionBenefitIcon }[]
  }
  segments: {
    eyebrow: string
    headline: string
    intro: string
    image: string
    imageAlt: string
    items: { title: string; description: string }[]
  }
  whyNeegles: {
    eyebrow: string
    headline: string
    image: string
    imageAlt: string
    items: {
      title: string
      description: string
      link?: { label: string; href: string }
    }[]
  }
  faq: {
    eyebrow: string
    headline: string
    items: { question: string; answer: string; link?: { label: string; href: string } }[]
  }
  leadForm: {
    eyebrow: string
    headline: string
    description: string
    whatsappCta: string
    submitLabel: string
    successMessage: string
  }
}

export const constructionLandingContent: ConstructionLandingContent = {
  slug: 'construction',
  path: '/construction',
  meta: {
    title: 'Construction Software & Digital Solutions for Contractors in Nigeria | Neegles',
    description:
      'Neegles helps construction companies in Nigeria attract more clients, manage projects, track operations and automate business processes with custom digital solutions.',
    keywords:
      'construction software in Nigeria, construction management software Nigeria, construction company website development, construction project management software, construction business automation, construction inventory management software, Neegles',
    ogImageAlt: 'Smiling construction engineer holding project plans on a building site at sunset',
    schemaName: 'Construction Software & Digital Solutions',
  },
  ogImage: '/images/construction-og.jpg',
  hero: {
    headlineBefore: 'Build Better Projects. Run a ',
    headlineAccent: 'Smarter Construction Business.',
    description:
      'From winning new contracts to managing construction sites, procurement and project operations, we build digital solutions that help construction companies work smarter, stay organised and grow.',
    cta: 'Book a Free Consultation',
    image: '/industries/gen-construction.webp',
    imageAlt:
      'Smiling construction engineer in a hard hat and high-visibility vest holding project plans, with a crew and tower crane behind her',
  },
  heroCtas: {
    primary: 'Book a Free Consultation',
    secondary: 'Explore Our Solutions',
  },
  problems: {
    eyebrow: 'Industry Challenges',
    headlineBefore: 'Your Construction Business Has Grown. ',
    headlineAccent: 'Have Your Systems Kept Up?',
    headlineAfter: '',
    intro:
      'Many construction companies still run sites, materials, teams and finances on paper, spreadsheets, phone calls and WhatsApp groups. As projects multiply, those manual systems become the bottleneck.',
    items: [
      {
        title: 'Tracking Site Activity Is Difficult',
        description:
          'Daily progress, labour and site issues live in notebooks and phone calls, so management only finds out about delays after they happen.',
      },
      {
        title: 'Poor Visibility Into Project Costs',
        description:
          'Expenses are recorded in different places, making it hard to know whether a project is on budget until it is too late to act.',
      },
      {
        title: 'Disorganised Inventory & Procurement',
        description:
          'Materials go missing, purchase requests move slowly and site stock is rarely accurate, leading to idle crews and wasted spend.',
      },
      {
        title: 'Limited Online Visibility',
        description:
          'Without a professional website and portfolio, clients and partners struggle to find you, and tender opportunities go to competitors.',
      },
      {
        title: 'Inefficient Team & Contractor Coordination',
        description:
          'Instructions, schedules and changes get lost between the office, site supervisors, subcontractors and suppliers.',
      },
      {
        title: 'Scattered Documents & Manual Reporting',
        description:
          'Drawings, contracts, approvals and reports sit across emails, folders and devices, and every report has to be compiled by hand.',
      },
    ],
  },
  solutions: {
    eyebrow: 'Our Construction Technology Solutions',
    headlineBefore: 'Digital Solutions Designed Around Your ',
    headlineMuted: 'Construction',
    headlineAfter: ' Business.',
    cta: 'Book a Free Consultation',
    items: [
      {
        number: 1,
        title: 'Construction Project Management Systems',
        description:
          'Plan, track and coordinate every project and site from one dashboard, from mobilisation to handover.',
        features: [
          'Multi-project and multi-site tracking',
          'Milestones, tasks and schedules',
          'Digital site diaries and photo updates',
          'Issue and snag reporting',
          'Progress reports for management',
        ],
      },
      {
        number: 2,
        title: 'Construction Websites & Digital Portfolios',
        description:
          'Win trust and new contracts with a fast, professional website that showcases your projects, capabilities and credentials.',
        features: [
          'Project portfolio and case studies',
          'Services and capability pages',
          'Enquiry and quote request forms',
          'Search engine optimisation',
          'Mobile-friendly, fast-loading design',
        ],
      },
      {
        number: 3,
        title: 'Inventory & Procurement Management',
        description:
          'Control materials, purchase requests, suppliers and site stock so the right materials reach the right site on time.',
        features: [
          'Material requisitions and approvals',
          'Purchase orders and supplier records',
          'Site and warehouse stock levels',
          'Delivery tracking',
          'Low-stock and usage alerts',
        ],
      },
      {
        number: 4,
        title: 'Project Cost & Financial Management',
        description:
          'Track budgets, expenses, payments and cash flow per project, so you always know where the money is going.',
        features: [
          'Project budgets vs. actual spend',
          'Expense capture and approvals',
          'Subcontractor and supplier payments',
          'Payment certificates and invoicing',
          'Profitability reporting',
        ],
      },
      {
        number: 5,
        title: 'Business Process Automation',
        description:
          'Replace repetitive paperwork with automated workflows for approvals, reporting, reminders and notifications.',
        features: [
          'Automated approval workflows',
          'Scheduled reports',
          'Email and WhatsApp notifications',
          'Digital forms and checklists',
          'Integration with tools you already use',
        ],
      },
      {
        number: 6,
        title: 'Custom Business Applications & Client Portals',
        description:
          'Purpose-built applications for your unique processes, plus secure portals that keep clients informed without endless calls.',
        features: [
          'Secure client login',
          'Project progress and photo sharing',
          'Document and drawing access',
          'Approval and change requests',
          'Payment schedules and statements',
        ],
      },
    ],
  },
  solutionIcons: ['project', 'website', 'inventory', 'finance', 'automation', 'portal'],
  benefits: {
    eyebrow: 'Business Benefits',
    headline: 'Better Visibility. Better Coordination. Better Business Decisions.',
    intro:
      'The right systems give your team one source of truth, so you can take on more projects without losing control.',
    items: [
      {
        icon: 'visibility',
        title: 'Improved Project Visibility',
        description: 'See the real status of every project and site at a glance, without chasing updates.',
      },
      {
        icon: 'cost',
        title: 'Better Cost Tracking',
        description: 'Spot overruns early by comparing spending against budgets as it happens.',
      },
      {
        icon: 'team',
        title: 'More Efficient Team Coordination',
        description: 'Keep office, site teams, subcontractors and suppliers working from the same information.',
      },
      {
        icon: 'organised',
        title: 'Organised Business Information',
        description: 'Store documents, records and reports in one secure place that is easy to search.',
      },
      {
        icon: 'presence',
        title: 'Stronger Digital Presence',
        description: 'Show prospective clients your track record and make it easy for them to reach you.',
      },
      {
        icon: 'scale',
        title: 'Scalable Business Operations',
        description: 'Add projects, sites and staff without adding the same amount of admin work.',
      },
    ],
  },
  segments: {
    eyebrow: 'Who We Work With',
    headline: 'Construction Businesses We Serve',
    intro:
      'We work with small and medium-sized construction and engineering businesses across Nigeria, from growing contractors to established firms.',
    image: '/industries/gen-construction-team.webp',
    imageAlt:
      'Construction engineers in hard hats reviewing project plans on a tablet beside a building under construction',
    items: [
      {
        title: 'Building Contractors',
        description: 'Manage multiple builds, crews and suppliers without losing track.',
      },
      {
        title: 'Civil Engineering Companies',
        description: 'Coordinate infrastructure projects, equipment and reporting.',
      },
      {
        title: 'Residential & Commercial Construction Firms',
        description: 'Keep clients updated and projects on schedule and on budget.',
      },
      {
        title: 'Renovation & Remodelling Companies',
        description: 'Handle quotes, jobs and materials across many smaller projects.',
      },
      {
        title: 'Construction Consultants',
        description: 'Share reports, documents and approvals with clients professionally.',
      },
      {
        title: 'Specialist Contractors',
        description: 'Electrical, mechanical, plumbing, roofing and finishing trades.',
      },
      {
        title: 'Small Property Developers',
        description: 'Track development costs, sales and buyer communication.',
      },
    ],
  },
  process: {
    eyebrow: 'Our Process',
    headlineBefore: 'From Business Challenges to ',
    headlineAccent: 'Practical Digital Solutions.',
    headlineAfter: '',
    steps: [
      {
        title: 'Understand Your Business',
        description:
          'We learn how your projects, sites, teams and suppliers work today, and where time and money are being lost.',
      },
      {
        title: 'Define the Right Solution',
        description:
          'We agree on the features, users, integrations and roadmap that will make the biggest difference first.',
      },
      {
        title: 'Design & Development',
        description:
          'Our team designs and builds a secure, easy-to-use solution around your real workflows, with regular demos along the way.',
      },
      {
        title: 'Deployment & Support',
        description:
          'We launch, train your team and stay on hand with maintenance, improvements and technical support.',
      },
    ],
  },
  whyNeegles: {
    eyebrow: 'Why Choose Neegles?',
    headline: 'A technology partner that understands how your business runs.',
    image: '/industries/gen-construction.webp',
    imageAlt:
      'Project manager and engineer discussing plans on a rooftop overlooking a building under construction and the Lagos skyline',
    items: [
      {
        title: 'Business-First Approach',
        description:
          'We start with your operations and goals, not with technology, so every feature solves a real problem on site or in the office.',
      },
      {
        title: 'Custom Solutions',
        description:
          'No forcing your team into generic software. We build around your processes and grow the system as your business grows.',
        link: { label: 'Explore our services', href: '/services' },
      },
      {
        title: 'Modern Technology',
        description:
          'Secure, cloud-based, mobile-friendly systems that work for office staff and site supervisors alike.',
        link: { label: 'See our projects', href: '/work' },
      },
      {
        title: 'Ongoing Support',
        description:
          'We stay with you after launch with training, maintenance and continuous improvements.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQs',
    headline: 'Frequently Asked Questions',
    items: [
      {
        question: 'What construction technology solutions does Neegles offer?',
        answer:
          'We build construction project management systems, construction websites and digital portfolios, inventory and procurement tools, project cost and financial management systems, business process automation, and custom business applications and client portals.',
      },
      {
        question: 'Can you build custom construction management software for my company?',
        answer:
          'Yes. Every system we build is designed around how your company actually works — your approval processes, reporting needs, team structure and sites — rather than forcing you into off-the-shelf software.',
      },
      {
        question: 'Can the system track multiple projects and sites at the same time?',
        answer:
          'Yes. Our project management systems support multiple projects and sites, with dashboards that show progress, costs, materials and issues across your whole portfolio as well as for each individual project.',
      },
      {
        question: 'Will the solution work with our existing processes and tools?',
        answer:
          'We start by mapping your current processes and the tools you already use, such as spreadsheets, accounting software or WhatsApp. We then integrate with them or migrate your data where it makes sense, so adoption is smooth for your team.',
      },
      {
        question: 'Do you build websites for construction companies?',
        answer:
          'Yes. We design and develop professional, mobile-friendly construction websites with project portfolios, service pages, enquiry forms and search engine optimisation, to help you attract more clients and tender opportunities.',
        link: { label: 'View our website development services', href: '/services' },
      },
      {
        question: 'How much does it cost and how long does development take?',
        answer:
          'Pricing and timelines depend on the scope of your project. A construction website typically takes a few weeks, while a custom management system is usually delivered in phases over a few months. After a free consultation, we provide a clear proposal with costs and timelines.',
      },
      {
        question: 'Do you provide support after the system is launched?',
        answer:
          'Yes. We provide training for your team, ongoing maintenance, security updates, technical support and continuous improvements as your business grows.',
      },
    ],
  },
  leadForm: {
    eyebrow: 'Get Started',
    headline: 'Ready to Move Your Construction Business Forward?',
    description:
      'Tell us about your business and what you need. We will get back to you within one business day to schedule your free consultation.',
    whatsappCta: 'Talk to Us on WhatsApp',
    submitLabel: 'Book My Free Consultation',
    successMessage: 'Thanks. We will be in touch within one business day.',
  },
}

export const industryContent: Record<string, IndustryLandingContent | ConstructionLandingContent> = {
  logistics: logisticsLandingContent,
  "real-estate": realEstateLandingContent,
  "professional-services": professionalServicesLandingContent,
  construction: constructionLandingContent,
};

export const isConstruction = (c: IndustryLandingContent): c is ConstructionLandingContent => c.slug === "construction";
