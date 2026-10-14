export const plans = [
  {
    id: "starter",
    name: "STARTER",
    monthlyPrice: 100,
    cardColor: "bg-teal-800",
    textColor: "text-teal-800",
    features: ["3 projects", "1 team member", "Basic reports", "Email support"],
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
  },
];

// one row per feature, values are matched by plan id
export const comparisonRows = [
  {
    label: "Projects",
    values: { starter: "3", team: "20", business: "Unlimited" },
  },
  {
    label: "Team members",
    values: { starter: "1", team: "5", business: "50" },
  },
  {
    label: "Storage",
    values: { starter: "2 GB", team: "20 GB", business: "200 GB" },
  },
  {
    label: "Support",
    values: { starter: "Email", team: "Chat", business: "Phone" },
  },
  {
    label: "Custom domain",
    values: { starter: "No", team: "Yes", business: "Yes" },
  },
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
