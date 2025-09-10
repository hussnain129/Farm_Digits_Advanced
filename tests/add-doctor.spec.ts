import { test, expect, Page, Locator } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { SidebarPage } from '../src/pages/sidebar-page';
import { HealthAndVaccinationsPage } from '../src/pages/Health&Vaccinations';
import { testUsers, doctorsData, searchData, vaccinesData } from '../src/data/test-data';

const BASE_URL = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';

test.describe('Veterinarian Directory', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.clickLoginButton(BASE_URL, testUsers.standard.username, testUsers.standard.password);
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.openHealthAndVaccinationPage();
    });

    test('should add a doctor', async ({ page }) => {
        const healthAndVaccinations = new HealthAndVaccinationsPage(page);
        await healthAndVaccinations.openAndSubmitDoctorForm(
            doctorsData.name,
            doctorsData.address,
            doctorsData.phone,
            doctorsData.description
        );
    });

    test('should filter table results by search term', async ({ page }) => {
        const vetDirectory = new HealthAndVaccinationsPage(page);

        await vetDirectory.searchVeterinarian(searchData.name);
        await vetDirectory.expectSearchResults(searchData.name, searchData.expectedCount);
    });

    test('should delete searched veterinarian', async ({ page }) => {
        const healthAndVaccinations = new HealthAndVaccinationsPage(page);

        await healthAndVaccinations.searchVeterinarian(searchData.name);
        await healthAndVaccinations.expectSearchResults(searchData.name);
        await healthAndVaccinations.deleteVeterinarian(searchData.name);
    });

    test.only('should add a vaccine', async ({ page }) => {
        const sidebarPage = new SidebarPage(page);
        await sidebarPage.clickVaccinesTab();
        const healthAndVaccinations = new HealthAndVaccinationsPage(page);
        await healthAndVaccinations.openAndSubmitVaccineForm(vaccinesData.name, vaccinesData.interval, vaccinesData.description);
        await page.pause();

    });
});
