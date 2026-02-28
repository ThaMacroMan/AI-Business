export type SiteConfig = {
  brandName: string;
  headline: string;
  subheadline: string;
  location: string;
  serviceArea: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type ServiceItem = {
  id: "assistants" | "automations" | "coaching";
  title: string;
  outcome: string;
  summary: string;
  deliverables: string[];
  ctaLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  businessType: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactConfig = {
  calendlyUrl: string;
  formspreeEndpoint: string;
  contactEmail: string;
  contactPhone: string;
};

export type AiToolItem = {
  id: string;
  name: string;
  href: string;
  logoSrc?: string;
  logoAlt?: string;
};

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/your-handle/strategy-call";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  "https://formspree.io/f/your-form-id";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@prairiebusinessai.ca";

const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 (306) 000-0000";

export const SITE_CONFIG: SiteConfig = {
  brandName: "Prarie AI",
  headline: "Practical AI for Regina Businesses",
  subheadline:
    "Save time and cut busywork with AI that fits your daily operations.",
  location: "Located in Regina, Saskatchewan",
  serviceArea: "Remote support available across Canada",
  primaryCtaLabel: "Book a Strategy Call",
  primaryCtaHref: CALENDLY_URL,
  secondaryCtaLabel: "Past AI Work",
  secondaryCtaHref: "/portfolio",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "assistants",
    title: "AI Assistant Setup",
    outcome: "Get a reliable AI assistant running in your business.",
    summary:
      "Get your own AI Assistant setup, working on your behalf 24/7",
    deliverables: [
      "Uses its own computer and integrates with your tools",
      "Autonomously performs tasks and learns from your feedback",
      "Teams can learn to use it independently",
    ],
    ctaLabel: "Plan Your Assistant Rollout",
    imageSrc: "/openclaw.png",
    imageAlt: "OpenClaw assistant icon",
  },
  {
    id: "automations",
    title: "Custom AI Automations",
    outcome: "Remove bottlenecks with automations built around your process.",
    summary:
      "Design and implement practical automations for lead intake, reporting, client updates, and recurring operational tasks.",
    deliverables: [
      "Current-process audit and opportunity map",
      "Automation workflows connected to your tools",
      "Launch checklist with handoff documentation",
    ],
    ctaLabel: "Explore Automation Opportunities",
    imageSrc: "/images/assistant-cube-mark.svg",
    imageAlt: "Cursor-style automation icon",
  },
  {
    id: "coaching",
    title: "AI Coaching & 1:1 Training",
    outcome: "Build in-house confidence so your team can execute independently.",
    summary:
      "Hands-on coaching for business owners and teams focused on practical use cases, tool selection, and implementation habits.",
    deliverables: [
      "Personalized training sessions",
      "Use-case prioritization and implementation roadmap",
      "Follow-up accountability and Q&A support",
    ],
    ctaLabel: "Start a Coaching Plan",
    imageSrc: "/openai.svg",
    imageAlt: "OpenAI icon",
    secondaryImageSrc: "/images/product-offering-burst.svg",
    secondaryImageAlt: "Coaching icon accent",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    title: "Discovery & Priority Mapping",
    description:
      "We identify where time is being lost and rank opportunities by ROI and implementation speed.",
  },
  {
    id: "design",
    title: "Solution Design",
    description:
      "A practical AI plan is created around your workflows, staff capacity, and business goals.",
  },
  {
    id: "implement",
    title: "Build & Launch",
    description:
      "Assistants and automations are implemented with clear guardrails, documentation, and team alignment.",
  },
  {
    id: "enable",
    title: "Enablement & Iteration",
    description:
      "Your team gets coaching and a repeatable process to continue improving after launch.",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Josh translated AI into plain business language and gave us a workflow we use every week.",
    name: "Mia",
    businessType: "Retail Owner",
  },
  {
    quote:
      "The automation removed hours of repetitive admin and helped our team stay focused on clients.",
    name: "Darren",
    businessType: "Service Company Founder",
  },
  {
    quote:
      "The coaching sessions made AI practical. We left with tools, templates, and a clear next step.",
    name: "Priya",
    businessType: "Professional Practice Manager",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "lead-intake-automation",
    title: "Lead Intake Automation for a Local Service Business",
    problem:
      "Inbound leads were scattered across email, forms, and text messages, causing missed follow-ups.",
    solution:
      "Implemented a centralized intake flow that triaged and routed leads with AI-assisted summaries.",
    result:
      "Faster response consistency and a cleaner handoff process from inquiry to booked consult.",
  },
  {
    slug: "assistant-for-client-comms",
    title: "Assistant Workflow for Client Communication Drafts",
    problem:
      "Client communication took too long and tone varied between team members.",
    solution:
      "Created an assistant framework with reusable context and response templates for common scenarios.",
    result:
      "More consistent communication quality and a meaningful reduction in drafting time.",
  },
  {
    slug: "owner-ai-upskilling",
    title: "Owner-Focused AI Upskilling Program",
    problem:
      "The owner wanted to adopt AI but lacked a practical implementation path.",
    solution:
      "Delivered 1:1 sessions with weekly exercises tied to real business priorities.",
    result:
      "Clear internal adoption habits and confidence using AI independently in daily operations.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you only work with businesses in Regina?",
    answer:
      "Regina is the primary focus, and remote engagements are available for businesses across Canada.",
  },
  {
    question: "Do I need a specific AI tool stack before we start?",
    answer:
      "No. Recommendations are tool-agnostic and based on your workflow, team capacity, and goals.",
  },
  {
    question: "How quickly can we launch something useful?",
    answer:
      "Most engagements identify a first practical implementation path in the first phase, then launch in focused iterations.",
  },
  {
    question: "Do you offer team training as part of implementation?",
    answer:
      "Yes. Coaching and training are integrated so your team can maintain and improve the system after launch.",
  },
];

export const CONTACT_CONFIG: ContactConfig = {
  calendlyUrl: CALENDLY_URL,
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  contactEmail: CONTACT_EMAIL,
  contactPhone: CONTACT_PHONE,
};

export const AI_TOOL_ITEMS: AiToolItem[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    href: "https://chatgpt.com/",
    logoSrc: "/openai.svg",
    logoAlt: "ChatGPT logo",
  },
  {
    id: "claude",
    name: "Claude",
    href: "https://claude.ai/",
    logoSrc: "/claude.webp",
    logoAlt: "Claude logo",
  },
  {
    id: "codex",
    name: "Codex",
    href: "https://openai.com/codex/",
    logoSrc: "/codex.png",
    logoAlt: "Codex logo",
  },
  {
    id: "cursor",
    name: "Cursor",
    href: "https://cursor.com/",
    logoSrc: "/cursor-brand-assets/App Icons/PNG/APP_ICON_2D_LIGHT.png",
    logoAlt: "Cursor logo",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    href: "https://www.perplexity.ai/",
    logoSrc: "/perplexity-color.webp",
    logoAlt: "Perplexity logo",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    href: "https://openclaw.ai/",
    logoSrc: "/openclaw.png",
    logoAlt: "OpenClaw logo",
  },
  {
    id: "gemini",
    name: "Gemini",
    href: "https://gemini.google.com/app",
    logoSrc: "/gemini.png",
    logoAlt: "Gemini logo",
  },
];

export const IS_FORMSPREE_PLACEHOLDER = FORMSPREE_ENDPOINT.includes("your-form-id");
