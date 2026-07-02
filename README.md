# juipter-toys-automation

End-to-end test automation for the [Jupiter Toys](http://jupiter.cloud.planittesting.com) demo site, built with [Playwright](https://playwright.dev/) and TypeScript using the Page Object Model.

## Setup

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test            # run all tests
npm run report      # open the HTML report
```

## Layout

- `tests/` — test specs
- `pages/` — page objects (locators + actions per page)
- `playwright.config.ts` — runner config (base URL, Chromium project)

## CI

GitHub Actions runs the full suite on every push and pull request to `main`/`master`
(`.github/workflows/playwright.yml`). The HTML report is uploaded as a `playwright-report`
artifact (retained 30 days) and can be downloaded from the workflow run.
