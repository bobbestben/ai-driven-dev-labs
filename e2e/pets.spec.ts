import { test, expect } from '@playwright/test';

test.describe('Pet List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the Pet Directory heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Pet Directory' })).toBeVisible();
  });

  test('should display the pets table with columns', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Pet Name', exact: true })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Owner of Pet' })).toBeVisible();
  });

  test('should display at least one pet row', async ({ page }) => {
    const rows = page.getByRole('row').filter({ hasText: /\w/ });
    await expect(rows).not.toHaveCount(0);
  });

  test('should show navigation buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Pets' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Visits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Vets' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Invoices' })).toBeVisible();
  });
});
