import { chromium, FullConfig } from '@playwright/test';
import { Logger } from '../src/utils/logger';
import { ReportManager } from '../src/utils/report-manager';

async function globalTeardown(config: FullConfig) {
  const logger = new Logger('GlobalTeardown');
  const reportManager = new ReportManager();

  try {
    logger.info('Starting global teardown...');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const reportStats = reportManager.getReportStats();
    reportManager.generateSummaryReport({
      total: reportStats.currentReports,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      browser: 'chromium'
    });

    logger.info('Report statistics:', reportStats);
    logger.info('Global teardown completed successfully');

    await browser.close();
  } catch (error) {
    logger.error('Global teardown failed:', error);
    throw error;
  }
}

export default globalTeardown; 