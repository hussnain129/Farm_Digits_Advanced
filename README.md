# Farm_Digit Automation Testing

An end-to-end UI automation framework built with Playwright Test for the Farm Digit web application. It includes robust logging, report archiving, test data generation, and reusable page and utility modules.

## Features
- Parallel execution via Playwright projects and workers
- HTML, JSON, and JUnit reports with automatic archiving per run
- Centralized logging using Winston (console + files under `reports/current/logs`)
- Global setup/teardown for environment preparation and report management
- Reusable page objects in `src/pages` and helpers in `src/utils`
- Deterministic test data with `@faker-js/faker` and utility generators

## Prerequisites
- Node.js 18+ and npm
- Windows PowerShell (project includes a Windows-specific clean script)

## Getting Started
```bash
# Install dependencies
npm install

# Run all tests headless
npm test

# Run with Playwright UI mode (inspect, debug, pick tests)
npm run test:ui

# Open the last HTML report
npm run report

# Clean current report folder (Windows PowerShell)
npm run clean:reports
```

If this is the first time running Playwright on this machine, you may need to install browsers:
```bash
npx playwright install
```

## Project Structure
```
.
├─ config/
│  ├─ global-setup.ts          # Archives previous reports, sets env
│  └─ global-teardown.ts       # Summarizes results, logs stats
├─ playwright.config.ts        # Playwright test configuration
├─ src/
│  ├─ data/
│  │  └─ test-data.ts          # Centralized test data
│  ├─ images/                  # Assets used in tests
│  ├─ pages/                   # Page Object Model (POM) classes
│  │  ├─ login-page.ts
│  │  ├─ sidebar-page.ts
│  │  ├─ settings-page.ts
│  │  ├─ add-animal.ts
│  │  ├─ add-shed.ts
│  │  └─ Health&Vaccinations.ts
│  └─ utils/
│     ├─ logger.ts             # Winston logger (console + file)
│     ├─ report-manager.ts     # Report archiving and summaries
│     ├─ common-utils.ts       # High-level Playwright helpers
│     ├─ assertion-utils.ts
│     ├─ api-utils.ts
│     ├─ performance-utils.ts
│     └─ test-data-generator.ts
├─ tests/                      # Spec files
│  ├─ login.spec.ts
│  ├─ change-logo.spec.ts
│  ├─ add-animal.spec.ts
│  ├─ add-shed.spec.ts
│  └─ add-doctor.spec.ts
├─ reports/
│  ├─ current/                 # Active run outputs (JSON/JUnit/logs)
│  └─ archive/                 # Previous runs (timestamped)
├─ playwright-report/          # HTML report for the last run
├─ package.json
└─ README.md
```

## Configuration Highlights
- `playwright.config.ts`
  - `testDir: ./tests`
  - `fullyParallel: true`
  - Retries only on CI; CI workers forced to 1
  - Reporters: JSON, JUnit, HTML, and list
  - Use options: traces/videos/screenshots on failure, action/navigation timeouts
  - Global setup/teardown wired to `config/`
  - Output artifacts: `reports/current/test-results`
  - Default timeout per test run: 60s

- `config/global-setup.ts`
  - Sets `NODE_ENV=test`
  - Archives `reports/current` into `reports/archive/test-run-<timestamp>` and cleans old archives (keeps last 10)

- `config/global-teardown.ts`
  - Gathers basic report stats via `ReportManager`
  - Emits `reports/current/test-summary.json`

## Logging & Reports
- Logs written to `reports/current/logs/`:
  - `combined.log`, `error.log`, `test-execution.log`
- Reports written to `reports/current/`:
  - `results.json` (machine-readable), `junit.xml` (CI), `test-summary.json`
- HTML report located in `playwright-report/` (open via `npm run report`)
- Previous runs archived under `reports/archive/` automatically each run

## Writing Tests
- Place spec files in `tests/` with `.spec.ts` extension
- Use page objects from `src/pages` for maintainability
- Leverage utilities from `src/utils/common-utils.ts` for resilient interactions
- Prefer `test.step` and `Logger` for better observability

Example usage of `CommonUtils` inside a test:
```ts
import { test, expect } from '@playwright/test';
import { CommonUtils } from '../src/utils/common-utils';

test('example', async ({ page }) => {
  const utils = new CommonUtils(page);
  await utils.navigateTo('https://example.com');
  await utils.clickElement('text=Get started');
  await expect(page).toHaveURL(/docs/);
});
```

## Test Data
- Static data lives in `src/data/test-data.ts`
- For dynamic data, prefer `@faker-js/faker` and `src/utils/test-data-generator.ts`

## CI/CD Integration
- Use the JSON/JUnit reporters for pipelines
- Typical CI command:
```bash
npx playwright test --reporter=junit,line
```
- Artifacts to publish:
  - `playwright-report/` (HTML)
  - `reports/current/` (JSON/JUnit/logs)

## Troubleshooting
- **Playwright browsers missing**: run `npx playwright install`
- **Stale report files**: `npm run clean:reports` or delete `reports/current`
- **Flaky selectors/timeouts**: use `CommonUtils.waitForElement` and increase timeouts as needed
- **CI timeouts**: increase `timeout` in `playwright.config.ts` or reduce `workers`
- **Windows path issues**: ensure PowerShell is available for `clean:reports`

## Extending
- Add new pages under `src/pages` and expose high-level actions
- Add new reporters or change locations in `playwright.config.ts`
- Enhance `ReportManager` to push summaries to dashboards or S3
- Add additional Playwright projects (Firefox/WebKit) by uncommenting in config

## License
ISC
