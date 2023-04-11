import { expect, test } from "@playwright/test";

const REGISTER_URL = /.*\/users\/register\/user/;

test.describe("Individual Product", () => {
  /**
   * Open login/register modal
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(
        //url for individual product
      `${process.env.ENVIRONMENT_URL ?? "https://gcakes-fe.vercel.app/"}`
    );
    try{
        await page.locator("#sp-form-222665").getByRole("button").first().click({timeout: 10000});
    }catch(e){

    }
  });
 

  test("Clicking the cupcakes button ", async ({
    page,
  }) => {
    //await page.goto('http://localhost:3000/product/view/4k4Y2F15Y50pcdM8MeJbf6'); 
    await page.getByRole('button', { name: 'Cupcakes' }).click();
    await expect(page).toHaveURL(/.*\/cupcakes/);
  })

  test("From index to individual cupcakee", async ({
    page,
  }) => {
    
    await page.getByRole('button', { name: 'Cupcakes' }).click();
    await page.getByRole('link', { name: 'Cupcakes (Fondant Toppers)' }).click();
    await expect(page).toHaveURL(/.*\/product\/view\/2TbYLqHRU8zAJBTj9ew585/);
  })

})

