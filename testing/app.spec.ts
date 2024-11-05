import { test, expect } from '@playwright/test';

test.describe('App Component - Essential Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('redirects to login if not logged in', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('authToken'));
    await page.reload();
    await expect(page).toHaveURL('/login');
    await expect(page.locator('button:has-text("Log in with Google")')).toBeVisible();
  });

  test('shows home page after login', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('authToken', 'mockToken'));
    await page.route('**/api/users/**', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 100 }),
      })
    );
    await page.reload();
    await expect(page).toHaveURL('/');
    await expect(page.locator('.home-page')).toBeVisible();
  });

  test('logs out and redirects to login', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('authToken', 'mockToken'));
    await page.reload();
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL('/login');
    const token = await page.evaluate(() => localStorage.getItem('authToken'));
    expect(token).toBeNull();
  });
});
