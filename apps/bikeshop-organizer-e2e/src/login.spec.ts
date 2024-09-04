import { test, expect } from '@playwright/test';

test("should unlogged user can't access to main page", async ({ page }) => {
  await page.goto('/');

  expect(await page.getByTestId('not-found-title').innerText()).toContain(
    '404 Not Found'
  );
});

test('should user can login', async ({ page }) => {
  await page.goto('/login');

  await page.locator('#email').fill(process.env.E2E_USER_EMAIL || '');
  await page.locator('#password').fill(process.env.E2E_USER_PASSWORD || '');

  await page
    .getByRole('button', {
      name: 'Se connecter',
    })
    .click();

  await page.waitForURL('**/');

  const userButton = page.getByTestId('user-button');

  expect(await userButton.innerText()).toContain('John Doe');
});
