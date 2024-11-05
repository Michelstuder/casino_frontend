import { test, expect } from '@playwright/test';

test.describe('Roulette Component - Essential Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/roulette');
    await page.evaluate(() => localStorage.setItem('authToken', 'mockToken'));
  });

  test('displays error if bet amount is invalid', async ({ page }) => {
    await page.fill('input[placeholder="Enter your bet amount"]', '0');
    await page.click('button:has-text("Place Bet")');
    const errorIndicator = page.locator('.error-indicator');
    await expect(errorIndicator).toBeVisible();
  });

  test('places bet and updates balance', async ({ page }) => {
    await page.route('**/api/users/**', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 200 }),
      })
    );
    await page.reload();
    await page.route('**/games/roulette/start', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          actualColour: 'RED',
          actualNumber: 5,
          isSuccess: true,
          moneyWon: 400,
        }),
      })
    );
    await page.fill('input[placeholder="Enter your bet amount"]', '100');
    await page.selectOption('select', { label: 'Red' });
    await page.click('button:has-text("Place Bet")');
    const balanceElement = page.locator('.balance-display');
    await expect(balanceElement).toHaveText(/400/);
  });

  test('displays error if bet fails', async ({ page }) => {
    await page.route('**/api/users/**', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ moneyAmount: 200 }),
      })
    );
    await page.reload();
    await page.route('**/games/roulette/start', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({}),
      })
    );
    await page.fill('input[placeholder="Enter your bet amount"]', '100');
    await page.click('button:has-text("Place Bet")');
    const errorIndicator = page.locator('.error-indicator');
    await expect(errorIndicator).toBeVisible();
  });
});
