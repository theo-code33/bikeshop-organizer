import { test, expect } from '@playwright/test';

test("should unlogged user can't access to main page", async ({ page }) => {
  await page.goto('/');

  expect(await page.getByTestId('not-found-title').innerText()).toContain(
    '404 Not Found'
  );
});
