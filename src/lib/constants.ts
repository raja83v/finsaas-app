export const APP_NAME = "GoldFin";
export const APP_DESCRIPTION =
  "Comprehensive financial management platform for gold loans and savings accounts";

export const SUBSCRIPTION_TIERS = [
  {
    name: "Basic",
    price: "$99",
    period: "per month",
    description: "Essential tools for small financial institutions",
    features: [
      "Up to 500 customer accounts",
      "Basic loan management",
      "Standard reporting",
      "Email support",
    ],
    highlighted: false,
    ctaText: "Start Free Trial",
  },
  {
    name: "Premium",
    price: "$299",
    period: "per month",
    description: "Advanced features for growing institutions",
    features: [
      "Up to 2,000 customer accounts",
      "Advanced loan analytics",
      "Custom reporting",
      "Priority support",
      "Document management",
      "API access",
    ],
    highlighted: true,
    ctaText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Tailored solutions for larger institutions",
    features: [
      "Unlimited customer accounts",
      "Advanced security features",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 premium support",
      "On-site training",
    ],
    highlighted: false,
    ctaText: "Contact Sales",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "GoldFin has transformed how we manage our gold loan portfolio. The efficiency gains have been remarkable.",
    author: "Sarah Johnson",
    title: "CEO, Golden Trust Finance",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    quote:
      "The reporting capabilities have given us insights we never had before, helping us make better business decisions.",
    author: "Michael Chen",
    title: "Operations Director, Secure Gold Credit",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    quote:
      "Customer onboarding is now 3x faster, and our staff love the intuitive interface. Highly recommended!",
    author: "Priya Patel",
    title: "Branch Manager, Heritage Financial",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
  },
];

export const FEATURES = [
  {
    title: "Gold Loan Management",
    description:
      "Streamline the entire loan lifecycle from application to closure with automated workflows and risk assessment tools.",
    icon: "Coins",
  },
  {
    title: "Savings Account Management",
    description:
      "Efficiently handle account opening, transactions, and interest calculations with real-time updates and notifications.",
    icon: "PiggyBank",
  },
  {
    title: "Customer Relationship",
    description:
      "Maintain comprehensive customer profiles with communication history, document storage, and interaction tracking.",
    icon: "Users",
  },
  {
    title: "Reporting & Analytics",
    description:
      "Generate insightful reports and visualizations to track performance, compliance, and business growth metrics.",
    icon: "BarChart3",
  },
  {
    title: "Document Management",
    description:
      "Securely store, organize, and retrieve customer documents and loan agreements with advanced search capabilities.",
    icon: "FileText",
  },
  {
    title: "Multi-level Security",
    description:
      "Protect sensitive financial data with role-based access control, encryption, and comprehensive audit trails.",
    icon: "Shield",
  },
];
