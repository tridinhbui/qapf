// All site content lives here — edit this file to update the portfolio.
// Wrap text in **double asterisks** to bold it.

export const profile = {
  name: 'Anh Pham',
  email: 'qpham10@uic.edu',
  phone: '224-265-3265',
  linkedin: 'https://www.linkedin.com/', // TODO: replace with profile URL
  location: 'Chicago, IL',
  kicker: 'Finance · University of Illinois Chicago · Class of 2028',
  lead: "I'm Anh Pham, a finance student with hands-on experience across audit, FP&A, treasury, and real estate private equity. I build models, reconcile the details, and write reports people can act on.",
}

export const stats = [
  { tag: 'ACADEMIC', value: 3.9, dec: 2, label: "GPA · Dean's List" },
  { tag: 'EXPERIENCE', value: 4, label: 'Finance internships incl. EY' },
  { tag: 'EFFICIENCY', value: 20, suffix: '+ hrs', label: 'Saved per reporting cycle' },
  { tag: 'UNDERWRITING', value: 100, suffix: '+', label: 'Unit multifamily modeled' },
]

export const about = [
  'I’m pursuing a B.S. in Finance at the University of Illinois Chicago. My experience spans a Big Four audit internship at EY, financial analysis at a fintech startup, treasury operations at BIDV Bank, and real estate private equity underwriting through Project Destined.',
  'What ties it together: I enjoy turning raw financial data into models and reports that help teams decide, whether that means reconciling accounts, forecasting liquidity, or stress-testing the assumptions behind an acquisition.',
]

export const education = {
  school: 'University of Illinois Chicago',
  degree: 'B.S. Finance · Aug 2024 – May 2028',
  gpa: '3.90',
  coursework: ['Financial Accounting', 'Corporate Finance', 'Financial Modeling', 'AI in Finance', 'Variance Analysis', 'Advanced Excel', 'Managerial Accounting', 'Auditing', 'Cost Accounting'],
  certifications: ['Bloomberg Finance Fundamentals', 'IBM Data Analytics'],
}

export const experience = [
  {
    when: '2026 · JUN–AUG', sub: 'Big Four', company: 'Ernst & Young (EY)', role: 'Financial Services Audit Intern',
    bullets: [
      'Analyzed monthly movements across balance sheet and P&L accounts, flagging cost trends and unusual variances to help the engagement team assess reporting risk and target audit testing.',
      'Reconciled **8–10 trial balance accounts** against supporting schedules and statement line items, tracing and resolving discrepancies for accurate month-end reporting.',
      'Validated **40+ invoices, bank statements and source documents** against reported balances, organizing evidence into audit workpapers.',
    ],
  },
  {
    when: '2026 · JAN–APR', sub: 'Washington, D.C.', company: 'Project Destined', role: 'Private Equity Intern, Real Estate',
    bullets: [
      'Built an acquisition pro forma for a **100+ unit multifamily property**, modeling P&L, cash flow, IRR and equity multiple across scenarios.',
      'Analyzed rent comps and tested occupancy, rent growth, cap rate and exit assumptions, supporting an underwriting recommendation targeting a **mid-teens IRR**.',
    ],
  },
  {
    when: '2025 · AUG–DEC', sub: 'Chicago, IL', company: 'FinBud AI', role: 'Financial Analyst Intern',
    bullets: [
      'Built Excel models across **9+ revenue streams** to test pricing and cost scenarios and quantify how key assumptions move projected margins.',
      'Improved monthly reporting efficiency by **25%** by summarizing cost variances, margin trends and risks in management reports.',
      'Saved **20+ hours per reporting cycle** by automating management reports, validating inputs and reconciling data across sources.',
    ],
  },
  {
    when: '2025 · JUN–AUG', sub: 'Banking', company: 'BIDV Bank', role: 'Treasury Summer Analyst',
    bullets: [
      'Forecasted weekly cash positions from **100+ treasury transactions**, giving visibility into short-term liquidity across currencies and accounts.',
      'Resolved **15+ payment discrepancies** with banking partners and internal teams, strengthening reconciliation accuracy and treasury reporting.',
    ],
  },
]

export const leadership = [
  {
    when: '2024 – 2025', sub: 'Chicago, IL', company: 'Portfolio Management Team', role: 'Financial Sector Analyst',
    bullets: [
      'Covered **5+ public financial-sector companies**, evaluating earnings, margin trends and competitive positioning through statement and comparable company analysis.',
      'Developed and presented **3+ investment recommendations**, each with valuation ranges, catalysts, downside risks and a price target.',
    ],
  },
]

export const skills = [
  { title: 'Modeling & Analysis', items: ['Forecasting & cost projections', 'Scenario & sensitivity analysis', 'Pricing analysis', 'Margin & profitability', 'Variance analysis'] },
  { title: 'Accounting & Reporting', items: ['Management reporting', 'Report automation', 'Account reconciliation', 'Data validation', 'Cost accounting (coursework)'] },
  { title: 'Tools & Technology', items: ['Advanced Excel', 'SQL', 'Power BI · Tableau', 'Anaplan', 'PowerPoint · Bloomberg'] },
]
