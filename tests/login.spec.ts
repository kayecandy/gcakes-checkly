import {
  expect,
  test,
} from '@playwright/test';

const LOGIN_URL = /.*\/api\/.*\/login/;

test.describe("Login", ()=>{
  /**
   * Open login/register modal
   */
  test.beforeEach(async ({ page})=>{
    await page.goto(process.env.ENVIRONMENT_URL ?? "http://localhost:3000/");
    await page.locator("#sp-form-222665").getByRole("button").first().click();
    await page.getByTestId("menuAccount").click();
  })

  test("Wrong login credentials", async ({ page }) => {
  
    await page.getByTestId("inputUsername").click();
    await page.getByTestId("inputUsername").fill("SampleUser5");
    await page.getByTestId("inputPassword").click();
    await page.getByTestId("inputPassword").fill("test1");
  
    const loginWaitResponse = page.waitForResponse(LOGIN_URL);
    await page.getByTestId("btnLogin").click();
  
    const loginResponse = await loginWaitResponse;
  
    await expect(loginResponse.status()).toBe(401);
  
    const errorAlert = await page.getByTestId("alertErrorLogin");
  
    await expect(errorAlert).toBeVisible();
  });

  test("Correct login credentials", async ({ page }) => {
    await page.getByTestId("inputUsername").click();
    await page.getByTestId("inputUsername").fill("SampleUser5");
    await page.getByTestId("inputPassword").click();
    await page.getByTestId("inputPassword").fill("test");
  
    const loginWaitResponse = page.waitForResponse(LOGIN_URL);
    await page.getByTestId("btnLogin").click();
  
    const loginResponse = await loginWaitResponse;
  
    await expect(loginResponse.status()).toBe(200);
  
    await expect(page).toHaveURL(/.*\/SampleUser5\/profile/);
  });
  
})



