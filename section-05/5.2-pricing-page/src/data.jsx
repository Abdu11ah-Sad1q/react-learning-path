export const plans = [
  {
    id: "starter",
    name: "STARTER",
    monthlyPrice: 100,
    cardColor: "bg-teal-800",
    textColor: "text-teal-800",
    features: ["3 projects", "1 team member", "Basic reports", "Email support"],
    // same order as comparisonLabels below
    details: ["3", "1", "2 GB", "Email", "No"],
  },
  {
    id: "team",
    name: "TEAM",
    monthlyPrice: 250,
    cardColor: "bg-red-500",
    textColor: "text-red-500",
    features: [
      "20 projects",
      "5 team members",
      "Weekly reports",
      "Chat support",
    ],
    details: ["20", "5", "20 GB", "Chat", "Yes"],
  },
  {
    id: "business",
    name: "BUSINESS",
    monthlyPrice: 500,
    cardColor: "bg-blue-900",
    textColor: "text-blue-900",
    features: [
      "Unlimited projects",
      "50 team members",
      "Custom reports",
      "Phone support",
    ],
    details: ["Unlimited", "50", "200 GB", "Phone", "Yes"],
  },
];

// the row names of the comparison table
export const comparisonLabels = [
  "Projects",
  "Team members",
  "Storage",
  "Support",
  "Custom domain",
];

export const testimonials = [
  {
    title: "Our week is finally organized",
    text: "We moved all our tasks into Planora in one afternoon. Meetings are shorter now because everyone can see the plan.",
    name: "Maria, Designer",
  },
  {
    title: "Worth every krone",
    text: "The Team plan gives us everything we need at a fair price. Switching to yearly billing saved us two months.",
    name: "Jonas, Developer",
  },
  {
    title: "Easy for the whole team",
    text: "Even the people who hate software picked it up fast. Support answered my question within an hour.",
    name: "Ingrid, Founder",
  },
];

export const faqs = [
  {
    question: "Which plan should I start with?",
    answer:
      "Most small teams start with Team. You can switch to another plan at any time.",
  },
  {
    question: "Can I cancel whenever I want?",
    answer: "Yes. There is no contract and no cancellation fee.",
  },
  {
    question: "How does yearly billing work?",
    answer:
      "You pay for 10 months and get 2 months free. For example, 100 NOK per month becomes 1,000 NOK per year.",
  },
];
