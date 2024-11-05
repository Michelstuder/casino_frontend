import { test, expect } from '@playwright/test';

test.describe('Home Component - Essential Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    await page.evaluate(() => localStorage.setItem('authToken', 'mockToken')); 
  });

  test('displays initial balance correctly', async ({ page }) => {
    await page.route('**/api/users/**', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 100 }),
      })
    );
    await page.reload();
    const balanceElement = page.locator('.balance-display');
    await expect(balanceElement).toBeVisible();
    await expect(balanceElement).toHaveText(/100/);
  });

  test('updates balance after deposit', async ({ page }) => {
    await page.route('**/api/users/**', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 100 }),
      })
    );
    await page.reload();
    await page.route('**/api/users/**/deposit', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 200 }),
      })
    );
    await page.fill('input[placeholder="Enter amount to deposit"]', '100');
    await page.click('button:has-text("Deposit")');
    const balanceElement = page.locator('.balance-display');
    await expect(balanceElement).toHaveText(/200/);
  });

  test('shows error on failed deposit', async ({ page }) => {
    await page.route('**/api/users/**', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 100 }),
      })
    );
    await page.reload();
    await page.route('**/api/users/**/deposit', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({}),
      })
    );
    await page.fill('input[placeholder="Enter amount to deposit"]', '100');
    await page.click('button:has-text("Deposit")');
    const errorIndicator = page.locator('.error-indicator');
    await expect(errorIndicator).toBeVisible();
  });
});
