# Planora Pricing Page

React + Tailwind pricing page for a made-up product called Planora.
The layout is based on reference designs I collected from the internet.

## Structure plan

```
App
├── Hero
│   └── Navbar
├── Pricing            (holds the monthly/yearly state)
│   └── PlanCard x N   (made from `plans` in data.js)
├── ComparisonTable    (columns = plans, rows = comparisonRows)
├── Testimonials       (made from `testimonials`)
└── Faq                (made from `faqs`, one answer open at a time)
```

All content lives in `src/data.jsx`. To add a 4th plan or another
testimonial, only the data file needs to change.

## Price rule

Yearly price = monthly price x 10 (2 months free).
Example: 100 NOK / month -> 1,000 NOK / year.

## Reference designs

(side-by-side screenshot will be added in the last commit)
