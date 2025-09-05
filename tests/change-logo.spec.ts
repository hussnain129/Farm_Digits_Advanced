import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { SidebarPage } from '../src/pages/sidebar-page';
import { SettingPage } from '../src/pages/settings-page';
import { testUsers } from '../src/data/test-data';

const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
const LOGO_PATH = 'src/images/icon.png';

test.describe('General Settings', () => {
  test('should upload logo and save settings', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const settingPage = new SettingPage(page);
    await loginPage.clickLoginButton(BASE_URL, testUsers.standard.username, testUsers.standard.password);
    await sidebarPage.openGeneralSettings();
    await settingPage.uploadLogoAndSave(LOGO_PATH);
  });
});
