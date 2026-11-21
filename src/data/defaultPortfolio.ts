import type { PortfolioData } from '../types/portfolio';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Onubuikem Okanta',
    role: 'Product Designer & Front-End Engineer',
    location: 'Lagos, Nigeria',
    availability: 'Open to new opportunities',
    headline: 'Hi, I’m Onubuikem Okanta.',
    leadCopy:
      'I’m a product designer and front-end engineer crafting thoughtful, human-centered software—from interface architecture and design systems to production code.',
    aboutIntro:
      'Over the past twelve years, I have worked at the intersection of interface architecture, typographic systems, and production front-end engineering.',
    aboutDetail:
      'I pair early interactive prototyping directly in code with rigorous visual craft—turning complex workflows into calm, intuitive tools people genuinely enjoy using.',
    email: 'onubuikemokanta@gmail.com',
    accent: 'forest',
    heroImageUrl: '/assets/aistudio/IMG_20260904_102345_323_d4e87ef7.jpg',
    heroImageAlt: 'Portrait of Onubuikem Okanta.',
    githubUrl: 'https://github.com/Tony07-2007/',
    linkedinUrl: 'https://linkedin.com/in/onubuikem-okanta-4b42372b9/',
  },
  metrics: [
    { id: 'years', value: '12+', label: 'Years of Experience' },
    { id: 'launches', value: '38', label: 'Products Shipped' },
    { id: 'reach', value: '4.2M', label: 'People Reached' },
    { id: 'retention', value: '96%', label: 'Client Satisfaction' },
  ],
  projects: [
    {
      id: 'meridian-treasury',
      title: 'Meridian Treasury Workspace',
      category: 'Product Design',
      year: '2026',
      client: 'Meridian Financial',
      role: 'Lead Product Designer',
      duration: '16 weeks',
      readTime: '6 min case study',
      summary:
        'A unified institutional liquidity and multi-currency cash forecasting terminal replacing six fragmented spreadsheets.',
      challenge:
        'Treasury analysts lost up to four hours each morning reconciling settlement balances across regional banks due to dense, inconsistent tables and modal-heavy workflows.',
      solution:
        'Designed a keyboard-first split workspace with tabular numerical alignment, inline variance comparisons, and instant scenario modeling without leaving the ledger.',
      imageUrl: '/src/assets/images/project_fintech_os_1794644838395.jpg',
      imageAlt:
        'Matte black laptop on brushed concrete displaying the Meridian monochrome financial analytics interface.',
      featured: true,
      deliverables: [
        'Product Strategy',
        'Information Architecture',
        'Interactive Prototype',
        'React Component Specs',
      ],
      outcomes: [
        { metric: '-64%', description: 'Daily reconciliation time across 40+ finance teams' },
        { metric: '$1.8B', description: 'Monthly liquidity volume managed in-app' },
        { metric: '4.9/5', description: 'Post-launch usability benchmark score' },
      ],
    },
    {
      id: 'koma-synth',
      title: 'Koma Acoustic Firmware UI',
      category: 'Engineering',
      year: '2025',
      client: 'Koma Instruments',
      role: 'Design Engineer',
      duration: '12 weeks',
      readTime: '5 min case study',
      summary:
        'Low-latency WebGL oscilloscope visualizer and companion desktop patch librarian for a modular hardware synthesizer.',
      challenge:
        'Hardware musicians needed sub-16ms visual feedback for wavetable modulation and an effortless way to archive custom patches over WebUSB.',
      solution:
        'Built an ultra-crisp monochrome OLED design language mirrored in a TypeScript WebAudio & Canvas companion studio with zero-latency preset syncing.',
      imageUrl: '/src/assets/images/project_audio_synth_1794644839409.jpg',
      imageAlt:
        'Anodized aluminum modular audio synthesizer with crisp tactile dials and waveform display on limestone.',
      featured: false,
      deliverables: [
        'WebUSB Companion App',
        '60fps Canvas Renderer',
        'Embedded OLED Spec',
      ],
      outcomes: [
        { metric: '11ms', description: 'Average hardware-to-screen modulation latency' },
        { metric: '18,400', description: 'Community patches shared in first 90 days' },
        { metric: '100%', description: 'Offline desktop parity via local cache' },
      ],
    },
    {
      id: 'atelier-monograph',
      title: 'Atelier Type & Grid System',
      category: 'Design Systems',
      year: '2025',
      client: 'Atelier Press Zurich',
      role: 'Principal Systems Designer',
      duration: '14 weeks',
      readTime: '7 min case study',
      summary:
        'A multi-brand editorial design system bridging Swiss print monograph proportions with responsive web typography.',
      challenge:
        'Eight digital publications shared inconsistent spacing scales, broken mobile line measures, and ad-hoc component overrides that slowed engineering releases.',
      solution:
        'Authored a token-driven Figma and React primitive library grounded in fluid typographic ratios, strict accessible contrast pairs, and zero-runtime CSS variables.',
      imageUrl: '/src/assets/images/project_editorial_press_1794644839689.jpg',
      imageAlt:
        'Open Swiss grid typography monograph book alongside a silver tablet on natural off-white linen.',
      featured: false,
      deliverables: [
        'Design Tokens',
        'React Primitives',
        'WCAG AA Contrast Audit',
        'Editorial Guidelines',
      ],
      outcomes: [
        { metric: '3.2x', description: 'Faster page assembly for editorial teams' },
        { metric: '42', description: 'Accessible UI primitives shipped to production' },
        { metric: '0', description: 'Contrast compliance regressions across 8 titles' },
      ],
    },
    {
      id: 'cadence-atlas',
      title: 'Cadence Urban Transit Atlas',
      category: 'Engineering',
      year: '2024',
      client: 'Civic Mobility Lab',
      role: 'Lead Front-End Architect',
      duration: '20 weeks',
      readTime: '8 min case study',
      summary:
        'High-density vector transit corridor explorer enabling municipal planners to inspect multimodal ridership and headway gaps.',
      challenge:
        'Planners struggled with sluggish GIS tools that froze when rendering more than 50,000 corridor segments across metropolitan rail and bus networks.',
      solution:
        'Engineered a custom spatial indexing pipeline and crisp dark-and-ivory cartographic theme with instant corridor filtering and printable briefing exports.',
      imageUrl: '/src/assets/images/project_spatial_atlas_1794644839231.jpg',
      imageAlt:
        'Studio display on an oak table showing an intricate dark-and-ivory topographic urban transit map.',
      featured: true,
      deliverables: [
        'Spatial Data Visualization',
        'Front-End Architecture',
        'Cartographic Styling',
      ],
      outcomes: [
        { metric: '120k+', description: 'Route segments rendered smoothly at 60fps' },
        { metric: '14 cities', description: 'Adopted by regional transit planning boards' },
        { metric: '-48%', description: 'Time required to prepare corridor briefs' },
      ],
    },
  ],
  capabilities: [
    {
      number: '01',
      title: 'Product Architecture',
      description:
        'Structuring complex tools, multi-step workflows, and dense data views so primary decisions feel effortless and legible.',
    },
    {
      number: '02',
      title: 'Design Systems',
      description:
        'Tokenized component libraries, typographic scales, and accessible interaction primitives built for long-term engineering velocity.',
    },
    {
      number: '03',
      title: 'Front-End Engineering',
      description:
        'Production TypeScript, React, and Tailwind implementations with crisp motion discipline, clean state modeling, and zero layout bloat.',
    },
    {
      number: '04',
      title: 'Editorial Direction',
      description:
        'Distinctive visual identities, launch narratives, and high-craft showcase sites that stand apart from generic templates.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Independent Front-End Engineer',
      company: 'Studio Onubuikem Okanta',
      location: 'San Francisco',
      period: '2023 — Present',
      highlight:
        'Partnering with Series A–C fintech, developer tool, and hardware teams from concept through production React code.',
    },
    {
      id: 'exp-2',
      role: 'Staff Front-End Engineer',
      company: 'Linearity Cloud',
      location: 'San Francisco',
      period: '2020 — 2023',
      highlight:
        'Led core workspace architecture and unified design system used daily by 1.4M engineering and product practitioners.',
    },
    {
      id: 'exp-3',
      role: 'Senior Front-End Engineer',
      company: 'Northstar Systems',
      location: 'New York',
      period: '2017 — 2020',
      highlight:
        'Built real-time telemetry interfaces and accessible component foundations across three flagship analytics products.',
    },
    {
      id: 'exp-4',
      role: 'Interactive Designer',
      company: 'Mono Studio',
      location: 'London',
      period: '2014 — 2017',
      highlight:
        'Crafted digital exhibitions, publishing systems, and interactive monographs for cultural and architectural clients.',
    },
  ],
  testimonial: {
    quote:
      'Before working with Onubuikem, our treasury workflow was split across six tools and took teams hours to reconcile. Within four months, Onubuikem redesigned the entire architecture and shipped the core React primitives—cutting daily close time by 64% across 40 enterprise accounts.',
    author: 'Elena Vance',
    role: 'VP of Product',
    company: 'Meridian Financial',
  },
  sections: [
    {
      id: 'capabilities',
      label: 'About Me',
      description: 'Personal bio, resume download, and core skills',
      visible: true,
    },
    {
      id: 'experience',
      label: 'Experience',
      description: 'Chronological career history and endorsement',
      visible: true,
    },
    {
      id: 'work',
      label: 'Projects',
      description: 'Filterable showcase of personal and client case studies',
      visible: true,
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Direct email details and personal message form',
      visible: true,
    },
  ],
};
