import { expect, test } from "@playwright/test";

const LOGIN_URL = /.*\/login/;

test.describe("Login Product Review", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            process.env.ENVIRONMENT_URL ?? "https://gcakes-fe.vercel.app/"
        );
        try {
            await page
                .locator("#sp-form-222665")
                .getByRole("button")
                .first()
                .click({
                    timeout: 10000,
                });
        } catch (e) {}
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

    test("The list of products in the cart should contain the successfully added product.", async ({
        page,
    }) => {
        await page.getByRole("button", { name: "Cakes", exact: true }).click();
        await page.getByRole("link", { name: "Number Cake" }).click();
        await page.getByRole("button", { name: "Add to cart" }).click();

        const productName = await page
            .getByRole("heading")
            .nth(4)
            .textContent();

        await expect(
            await page
                .locator("button")
                .filter({ hasText: /^Add to cart$/ })
                .isDisabled()
        ).toBe(true);

        await page
            .locator(
                ".MuiBadge-root > .MenuItem_Link__bvsP_ > .MuiButtonBase-root"
            )
            .click();
        await expect(
            page.getByRole("listitem").getByText(productName!)
        ).toBeVisible();
    });

    test("An error must be displayed stating that the product to be added is already in the cart.", async ({
        page,
    }) => {
        await page.getByRole("button", { name: "Cakes", exact: true }).click();
        await page.getByRole("link", { name: "Number Cake" }).click();
        await page.getByRole("button", { name: "Add to cart" }).click();

        const productName = await page
            .getByRole("heading")
            .nth(4)
            .textContent();

        await page.getByRole("button", { name: "Cakes", exact: true }).click();
        await page.getByRole("link", { name: "Number Cake" }).click();

        await expect(
            await page
                .locator("button")
                .filter({ hasText: /^Add to cart$/ })
                .isDisabled()
        ).toBe(true);

        await page
            .locator(
                ".MuiBadge-root > .MenuItem_Link__bvsP_ > .MuiButtonBase-root"
            )
            .click();
        await expect(
            page.getByRole("listitem").getByText(productName!)
        ).toBeVisible();
    });
});
