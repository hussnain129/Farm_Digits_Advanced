import { FullConfig } from '@playwright/test';
import { Logger } from '../src/utils/logger';
import { ReportManager } from '../src/utils/report-manager';

async function globalSetup(config: FullConfig) {
  const logger = new Logger('GlobalSetup');
  const reportManager = new ReportManager();

  try {
    logger.info('Starting global setup...');

    // Set up test environment
    process.env.NODE_ENV = 'test';

    // Archive previous reports before starting new test run
    await reportManager.archiveCurrentReports();

    logger.info('Global setup completed successfully');
  } catch (error) {
    logger.error('Global setup failed:', error);
    throw error;
  }
}

export default globalSetup;
