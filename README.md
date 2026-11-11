# Playwright E2E Framework

![E2E Tests](https://github.com/jeffercastro/playwright-e2e-framework/actions/workflows/e2e-tests.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Cross-Browser](https://img.shields.io/badge/Browsers-Chromium_%7C_Firefox_%7C_WebKit-orange?style=flat-square)

Production-grade UI End-to-End automation framework built with **TypeScript** and **Playwright**, implementing strict **Page Object Model (POM)** architecture over SauceDemo e-commerce. Features reusable authentication via `storageState`, parallel cross-browser execution and automated CI/CD reporting.

---

## Key Features

- **Strict Page Object Model (POM):** Every page has its own class with strongly-typed locators and business actions. Tests never interact with selectors directly.
- **Reusable Auth Session (`storageState`):** A single global setup logs in once and shares the browser session across all tests — no repeated logins.
- **Custom Fixtures:** Page Objects are injected automatically into every test via Playwright's fixture system.
- **Cross-Browser Matrix:** Tests run in parallel on Chromium, Firefox, and WebKit via GitHub Actions matrix strategy.
- **Resilient Selectors:** Uses `getByRole`, `getByPlaceholder`, and `getByText` — zero fragile XPath or CSS class selectors.
- **Auto-evidence on Failure:** Screenshots and traces captured automatically when a test fails.
- **Business-Logic Validation:** Validates price math (subtotal + tax = total) on order summary pages.

---

## Project Structure

```text
playwright-e2e-framework/
├── .github/
│   └── workflows/
│       └── e2e-tests.yml          # Cross-browser CI/CD pipeline (matrix strategy)
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts        # Custom Playwright fixture — injects all Page Objects
│   ├── pages/
│   │   ├── base.page.ts           # Base class with shared utilities
│   │   ├── login.page.ts          # Login page POM
│   │   ├── inventory.page.ts      # Product catalog POM
│   │   ├── cart.page.ts           # Shopping cart POM
│   │   └── checkout.page.ts       # Checkout 3-step flow POM
│   └── data/
│       └── checkout.data.ts       # Test users, products and customer data generators
├── tests/
│   ├── auth/
│   │   ├── auth.setup.ts          # Global auth setup (runs once, saves session)
│   │   └── login.spec.ts          # Login positive + negative cases
│   ├── inventory/
│   │   └── inventory.spec.ts      # Catalog sorting, filtering, add-to-cart
│   └── checkout/
│       └── checkout-e2e.spec.ts   # Full purchase lifecycle E2E
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Quickstart

### Prerequisites
- Node.js v18+

### Installation

```bash
git clone https://github.com/jeffercastro/playwright-e2e-framework.git
cd playwright-e2e-framework
npm install
npx playwright install
```

### Run Tests

```bash
# Run all tests (all browsers)
npm test

# Run only on Chromium
npm run test:chromium

# Run with Playwright visual UI
npm run test:ui

# View HTML report after run
npm run test:report
```

---

## CI/CD Pipeline

Each `push` to `main` triggers parallel jobs across Chromium, Firefox, and WebKit on GitHub Actions Ubuntu runners.

- **Workflow:** `.github/workflows/e2e-tests.yml`
- **Artifacts:** Per-browser HTML reports with screenshots and traces on failure, retained 14 days.

---

## Author

**Jeffer Castro** — [GitHub](https://github.com/jeffercastro)
