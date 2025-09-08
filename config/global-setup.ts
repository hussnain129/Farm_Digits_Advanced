import { chromium, FullConfig } from '@playwright/test';
import { Logger } from '../src/utils/logger';
import { ReportManager } from '../src/utils/report-manager';
import { LoginPage } from '../src/pages/login-page';
import { testUsers } from '../src/data/test-data';

const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/login';

async function globalSetup(config: FullConfig) {
  const logger = new Logger('GlobalSetup');
  const reportManager = new ReportManager();

  try {
    logger.info('Starting global setup...');

    // Set up test environment
    process.env.NODE_ENV = 'test';

    // Archive previous reports before starting new test run
    await reportManager.archiveCurrentReports();

    // Initialize browser context and perform login once
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton(
      BASE_URL,
      testUsers.standard.username,
      testUsers.standard.password
    );

    await page.waitForSelector('//span[text()="Livestock Management"]', { timeout: 30000 });

    // Save session for reuse
    await context.storageState({ path: 'storageState.json' });

    await browser.close();

    logger.info('Global setup completed successfully');
  } catch (error) {
    logger.error('Global setup failed:', error);
    throw error;
  }
}

export default globalSetup;