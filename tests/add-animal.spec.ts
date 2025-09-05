import { test} from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { SidebarPage } from '../src/pages/sidebar-page';
import { AddAnimalPage } from '../src/pages/add-animal';
import { testUsers } from '../src/data/test-data';
const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
test.describe('Add Shed', () => {
    test('should add a shed', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickLoginButton(BASE_URL, testUsers.standard.username, testUsers.standard.password);
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openAnimalTable();
        const addAnimal = new AddAnimalPage(page);
        await addAnimal.openAddAnimalForm();
        await page.pause();
    });
});