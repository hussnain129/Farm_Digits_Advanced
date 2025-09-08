import { test} from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { SidebarPage } from '../src/pages/sidebar-page';
import { AddShedPage } from '../src/pages/add-shed';
import { testUsers, shedsData } from '../src/data/test-data';
const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
test.describe('Add Shed', () => {
    test('should add a shed', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForSelector('//span[text()="Livestock Management"]', { timeout: 15000 });
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openShedTable();
        const addShed = new AddShedPage(page);
        await addShed.openAndSubmitShedForm(shedsData.name, shedsData.description, shedsData.capacity);
        await page.pause();
    });
});