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
 

  test("Clicking the cakes button ", async ({
    page,
  }) => {
    //await page.goto('http://localhost:3000/product/view/4k4Y2F15Y50pcdM8MeJbf6'); 
    await page.getByRole('link', { name: 'Cakes', exact: true }).getByRole('button', { name: 'Cakes' }).click();
    await expect(page).toHaveURL(/.*\/cakes/);
  })

  test("From index to individual cake", async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Cakes', exact: true }).getByRole('button', { name: 'Cakes' }).click();
    await page.getByRole('link', { name: 'Number Cake' }).click();
    await expect(page).toHaveURL(/.*\/product\/view\/4k4Y2F15Y50pcdM8MeJbf6/);
  })

})

