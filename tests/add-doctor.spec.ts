import { test} from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { SidebarPage } from '../src/pages/sidebar-page';
import { AddDoctorPage } from '../src/pages/add-doctor';
import { testUsers, doctorsData } from '../src/data/test-data';
const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
test.describe('Add Shed', () => {
    test('should add a shed', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickLoginButton(BASE_URL, testUsers.standard.username, testUsers.standard.password);
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openHealthAndVaccinationPage();
        const addDoctor = new AddDoctorPage(page);
        await addDoctor.openAndSubmitDoctorForm(doctorsData.name, doctorsData.address, doctorsData.phone, doctorsData.description);
        await page.pause();
    });
});