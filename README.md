# Playwright E2E & Visual Testing Framework

[![E2E Tests](https://github.com/jeffercastro/playwright-e2e-framework/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/jeffercastro/playwright-e2e-framework/actions/workflows/e2e-tests.yml)
[![Live Report](https://img.shields.io/badge/Report-Live_HTML_Report-2ea44f?style=flat-square&logo=github&logoColor=white)](https://jeffercastro.github.io/playwright-e2e-framework/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Cross-Browser](https://img.shields.io/badge/Browsers-Chromium_%7C_Firefox_%7C_WebKit-orange?style=flat-square)](https://playwright.dev/docs/browsers)

Production-grade UI End-to-End & Visual automation framework built with **TypeScript** and **Playwright**, implementing strict **Page Object Model (POM)** architecture over SauceDemo e-commerce. Features reusable authentication via `storageState`, pixel-perfect visual regression testing, parallel cross-browser execution, and automated **GitHub Pages** report deployments.

👉 **[View Live HTML Test Report](https://jeffercastro.github.io/playwright-e2e-framework/)**

---

## Key Features

- **Strict Page Object Model (POM):** Every page has its own class with strongly-typed locators and business actions. Tests never interact with raw selectors.
- **Reusable Auth Session (`storageState`):** A single global setup logs in once and shares the browser session across all tests, eliminating redundant login steps.
- **Visual Regression Testing:** Pixel-by-pixel visual snapshot comparisons (`expect(page).toHaveScreenshot()`) for whole pages and isolated component cards.
- **Custom Fixtures:** Page Objects are injected automatically into tests via Playwright's fixture system.
- **Cross-Browser Matrix:** Tests run in parallel on Chromium, Firefox, and WebKit via GitHub Actions matrix strategy.
- **Resilient Selectors:** Prioritizes `getByRole`, `getByPlaceholder`, and `getByText` over brittle XPaths or CSS classes.
- **Auto-evidence on Failure:** Screenshots, videos, and execution traces captured automatically on test retries/failures.
- **Continuous Deployment:** Automatically publishes interactive HTML test reports to **GitHub Pages** on every push to `main`.

---

## Test Suites Overview

| Suite | Directory / File | Focus | Total Tests |
| :--- | :--- | :--- | :---: |
| **Authentication** | `tests/auth/login.spec.ts` | Valid login, locked user, wrong password, empty inputs | 5 |
| **Inventory** | `tests/inventory/inventory.spec.ts` | Catalog display, sorting (A-Z, Z-A, price lo-hi, hi-lo), badge counts | 7 |
| **Checkout E2E** | `tests/checkout/checkout-e2e.spec.ts` | 3-step checkout, financial summary math ($Subtotal + Tax = Total$), item removal | 4 |
| **Visual Regression** | `tests/visual/visual-regression.spec.ts` | Pixel-perfect layout assertions for Login, Catalog, and Product Card component | 3 |
| **Global Setup** | `tests/auth/auth.setup.ts` | Single auth pass generating `.auth/session.json` | 1 |

---

## Project Structure

```text
playwright-e2e-framework/
├── .github/
│   └── workflows/
│       └── e2e-tests.yml          # Cross-browser CI/CD + GitHub Pages deployment
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts        # Custom Playwright fixture — injects Page Objects
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
│   ├── checkout/
│   │   └── checkout-e2e.spec.ts   # Full purchase lifecycle E2E
│   └── visual/
│       └── visual-regression.spec.ts # Pixel-perfect snapshot assertions
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
# Run all tests (all projects)
npm test

# Run Chromium suite only
npm run test:chromium

# Run with Playwright interactive visual UI
npm run test:ui

# Run only Visual Regression suite and update baseline snapshots
npx playwright test tests/visual --update-snapshots

# View generated HTML report
npm run test:report
```

---

## CI/CD & Live Reporting

The suite runs automatically on **GitHub Actions** under Ubuntu runners on every push to `main` and Pull Requests.
- **Workflow:** `.github/workflows/e2e-tests.yml`
- **GitHub Pages:** Each successful run on `main` automatically deploys the HTML test report to **[jeffercastro.github.io/playwright-e2e-framework](https://jeffercastro.github.io/playwright-e2e-framework/)**.
- **Artifacts:** Per-browser test reports with screenshots and traces on failure are preserved for 14 days.

---

## Author

- **Jeffer Castro** — [GitHub](https://github.com/jeffercastro)
