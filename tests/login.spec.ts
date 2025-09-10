import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { testUsers } from '../src/data/test-data';

const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';

test.describe('Farm Digit Login', () => {
  test('should login successfully with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton(BASE_URL, testUsers.standard.username, testUsers.standard.password);
    await page.pause();
  });
});   