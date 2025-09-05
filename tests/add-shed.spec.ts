import { test} from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { SidebarPage } from '../src/pages/sidebar-page';
import { AddShedPage } from '../src/pages/add-shed';
import { testUsers, testSheds } from '../src/data/test-data';
const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
test.describe('Add Shed', () => {
    test('should add a shed', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickLoginButton(BASE_URL, testUsers.standard.username, testUsers.standard.password);
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openShedTable();
        const addShed = new AddShedPage(page);
        await addShed.openAndSubmitShedForm(testSheds.name, testSheds.description, testSheds.capacity);
        await page.pause();
    });
});