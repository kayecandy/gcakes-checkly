import { expect, test } from "@playwright/test";

const LOGIN_URL = /.*\/login/;

test.describe("Login Product Review", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            process.env.ENVIRONMENT_URL ?? "https://gcakes-fe.vercel.app/"
        );
        await page.locator("#sp-form-222665").getByRole("button").first().click();
        await page.getByTestId("menuAccount").click();
        await page.getByTestId("inputUsername").click();
        await page.getByTestId("inputUsername").fill("Autoqa1");
        await page.getByTestId("inputPassword").click();
        await page.getByTestId("inputPassword").fill("Autoqa1");

        const loginWaitResponse = page.waitForResponse(LOGIN_URL);
        await page.getByTestId("btnLogin").click();

        console.log(LOGIN_URL);
        console.log(loginWaitResponse);

        const loginResponse = await loginWaitResponse;

        await expect(loginResponse.status()).toBe(200);

        await expect(page).toHaveURL(/.*\/Autoqa1\/profile/);
    });

    test("Login Review and Rating", async ({ page }) => {
        await page.getByRole("button", { name: "Cakes", exact: true }).click();
        await page.getByRole("link", { name: "Number Cake" }).click();
        await page.getByRole("button", { name: "Add a review" }).click();

        // await page.locator('label').filter({ hasText: '0.5 Stars' }).click();
        // await page.locator('label').filter({ hasText: '1 Star' }).click();
        // await page.locator('label').filter({ hasText: '1.5 Stars' }).click();
        // await page.locator('label').filter({ hasText: '2 Stars' }).click();
        // await page.locator('label').filter({ hasText: '2.5 Stars' }).click();
        // await page.locator('label').filter({ hasText: '3 Stars' }).click();
        // await page.locator('label').filter({ hasText: '3 Stars' }).click();
        // await page.locator('label').filter({ hasText: '4 Stars' }).click();
        // await page.locator('label').filter({ hasText: '4.5 Stars' }).click();
        await page
            .locator("label")
            .filter({ hasText: /^5 Stars$/ })
            .click();

        await page.getByLabel("Title *").click();
        await page.getByLabel("Title *").fill("AutoQA Title");
        await page.getByLabel("Comment *").click();
        await page.getByLabel("Comment *").fill("AutoQA Comment");

        const productid = page.url().substring(page.url().lastIndexOf("/") + 1);

        const REVIEW_URL = RegExp(`.*\/products\/${productid}\/review`);

        const reviewWaitResponse = page.waitForResponse(REVIEW_URL);
        await page.getByRole("button", { name: "Submit" }).click();

        const reviewResponse = await reviewWaitResponse;

        await expect(reviewResponse.status()).toBe(200);

        const successAlert = await page.getByTestId("alertSuccessReview");

        await expect(await successAlert.allInnerTexts()).toContain(
            "Review successfully added"
        );
    });

    test("Login Review w/o Rating", async ({ page }) => {
        await page.getByRole("button", { name: "Cakes", exact: true }).click();
        await page.getByRole("link", { name: "Number Cake" }).click();
        await page.getByRole("button", { name: "Add a review" }).click();

        await page.getByLabel("Title *").click();
        await page.getByLabel("Title *").fill("AutoQA Title");
        await page.getByLabel("Comment *").click();
        await page.getByLabel("Comment *").fill("AutoQA Comment");

        const productid = page.url().substring(page.url().lastIndexOf("/") + 1);

        const REVIEW_URL = RegExp(`.*\/products\/${productid}\/review`);

        const reviewWaitResponse = page.waitForResponse(REVIEW_URL);
        await page.getByRole("button", { name: "Submit" }).click();

        const reviewResponse = await reviewWaitResponse;

        await expect(reviewResponse.status()).toBe(422);

        const errorAlert = await page.getByTestId("alertErrorReview");

        await expect(await errorAlert.allInnerTexts()).toContain(
            "Error in adding a review. Please check the fields and try again."
        );
    });
});

test.describe("No Login Product Review", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            process.env.ENVIRONMENT_URL ?? "https://gcakes-fe.vercel.app/"
        );
        await page.locator("#sp-form-222665").getByRole("button").first().click();
    });

    test("No Login Review", async ({ page }) => {
        await page.getByRole("button", { name: "Cakes", exact: true }).click();
        await page.getByRole("link", { name: "Number Cake" }).click();
        await page.getByRole("button", { name: "Add a review" }).click();
        await page.getByRole("button", { name: "Login to add a review" }).click();

        await expect(
        await page
            .getByRole("button", { name: "Login to add a review" })
            .isVisible()
        ).toBe(true);
    });
});
