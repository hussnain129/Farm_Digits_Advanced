import { test} from '@playwright/test';
import { SidebarPage } from '../src/pages/sidebar-page';
import { AddAnimalPage } from '../src/pages/add-animal';
test.describe('Add Shed', () => {
    test('should add a shed', async ({ page }) => {
        await page.goto('/dashboard');
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openAnimalTable();
        const addAnimal = new AddAnimalPage(page);
        await addAnimal.openAddAnimalForm();
        await page.pause();
    });
});