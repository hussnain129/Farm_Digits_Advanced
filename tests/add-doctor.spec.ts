import { test, expect, Page, Locator } from '@playwright/test';
import { SidebarPage } from '../src/pages/sidebar-page';
import { HealthAndVaccinationsPage } from '../src/pages/Health&Vaccinations';
import { doctorsData, searchData } from '../src/data/test-data';

test.describe('Veterinarian Directory', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
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
});
