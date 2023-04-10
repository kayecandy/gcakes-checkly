import {
  expect,
  test,
} from '@playwright/test';

test.describe("About", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.ENVIRONMENT_URL ?? "https://gcakes-fe.vercel.app/");
    try {
     await page.locator("#sp-form-222665").getByRole("button").first().click({
       timeout: 10000
     });
   } catch (e) {

   }
  })

  test("Redirects to About Page", async ({ page }) => {
   await page.getByRole('button', { name: 'About' }).click();

   await expect(page).toHaveURL(/.*\/about/);
  });

  test("Redirects to Facebook Page", async ({ page }) => {
   await page.getByRole('button', { name: 'About' }).click();
   await page.getByTestId("FacebookIcon").click();

   const FBpagePromise = page.waitForEvent('popup');
   const FBpage = await FBpagePromise;
   
   await expect(FBpage).toHaveURL(/.*facebook.com\/gcakesbygina.*/);
 });

  test("Redirects to Instagram Page", async ({ page }) => {
    await page.getByRole('button', { name: 'About' }).click();
    await page.getByTestId("InstagramIcon").click();

    const IGpage = await page.locator('[href="https://www.instagram.com/gcakesbygina/"]');
    await expect(IGpage).toBeFocused();
 });

})