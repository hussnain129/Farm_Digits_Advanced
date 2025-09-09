import { test} from '@playwright/test';
import { SidebarPage } from '../src/pages/sidebar-page';
import { AddShedPage } from '../src/pages/add-shed';
import { shedsData } from '../src/data/test-data';
test.describe('Add Shed', () => {
    test('should add a shed', async ({ page }) => {
        await page.goto('/dashboard');
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openShedTable();
        const addShed = new AddShedPage(page);
        await addShed.openAndSubmitShedForm(shedsData.name, shedsData.description, shedsData.capacity);
        await page.pause();
    });
});