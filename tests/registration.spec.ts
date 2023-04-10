import {
  expect,
  test,
} from '@playwright/test';

const REGISTER_URL = /.*\/users\/register\/user/;

test.describe("Register", () => {
  /**
   * Open login/register modal
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(
      process.env.ENVIRONMENT_URL ?? "https://gcakes-fe.vercel.app/"
    );
    await page.locator("#sp-form-222665").getByRole("button").first().click();
    await page.getByTestId("menuAccount").click();
    await page.getByRole("link", { name: "Register Now!" }).click();
  });


  test("The user is created and is reflected by a confirmation message on the form", async ({
    page,
  }) => {

    await page.getByLabel("First Name *").click();
    await page.getByLabel("First Name *").fill("Bob");
    await page.getByLabel("Last Name *").click();
    await page.getByLabel("Last Name *").fill("Charlie");
    await page.getByLabel("Birthday *").click();
    await page.getByLabel("Birthday *").fill("2000-05-08");
    await page.getByRole("button", { name: "Register!" }).click();
    await page.getByLabel("Username *").click();
    await page.getByLabel("Username *").fill("Delta");
    await page.getByLabel("Username *").press("Tab");
    await page.getByLabel("Email *").fill("bob_charlie@email.com");
    await page.getByLabel("Email *").press("Tab");
    await page.getByLabel("Password *", { exact: true }).fill("autoT123");
    await page.getByLabel("Password *", { exact: true }).press("Tab");
    await page.getByLabel("Confirm Password *").fill("autoT123");

    const registerWaitResponse = page.waitForResponse(REGISTER_URL);
    await page.getByRole("button", { name: "Register!" }).click();

    const registerResponse = await registerWaitResponse;
    await expect(registerResponse.status()).toBe(200);

    const successAlert = await page.getByTestId("alertSuccessRegistration");

    //await expect(successAlert).toBeInViewport();

    await expect(await successAlert.allInnerTexts()).toContain(
      "Registration success!"
    );
  });
  test("Empty Confirmation Password Field", async ({
    page,
  }) => {
    await page.getByLabel('First Name *').click();
    await page.getByLabel('First Name *').fill('Calvin Edward');
    await page.getByLabel('Last Name *').click();
    await page.getByLabel('Last Name *').fill('Coronado');
    await page.getByLabel('Birthday *').fill('2023-03-29');
    await page.getByLabel('Username *').click();
    await page.getByLabel('Username *').fill('something5');
    await page.getByLabel('Username *').press('Tab');
    await page.getByLabel('Email *').click();
    await page.getByLabel('Email *').fill('something@gmail.com');
    await page.getByLabel('Password *', { exact: true }).click();
    await page.getByLabel('Password *', { exact: true }).fill('qwerty123');
    await page.getByRole('button', { name: 'Register!' }).click();
    const confirmPassword = await page.locator('input#confirmPassword:invalid')
    // await page.getByLabel('Confirm Password *').filter({has:":invalid"});
    await expect(confirmPassword).toBeVisible()
  })

  test("Empty Required Field", async ({
    page,
  }) => {
    await page.getByLabel('First Name *').click();
    await page.getByLabel('First Name *').fill('Calvin');
    await page.getByLabel('First Name *').press('Tab');
    await page.getByLabel('Last Name *').press('Tab');
    await page.getByLabel('Birthday *').fill('2023-04-19');
    await page.getByLabel('Username *').click();
    await page.getByLabel('Username *').fill('sample6');
    await page.getByLabel('Email *').click();
    await page.getByLabel('Email *').fill('sample6@gmail.com');
    await page.getByLabel('Password *', { exact: true }).click();
    await page.getByLabel('Password *', { exact: true }).fill('qwerty123');
    await page.getByLabel('Confirm Password *').click();
    await page.getByLabel('Confirm Password *').fill('qwerty123');
    await page.getByRole('button', { name: 'Register!' }).click();
    const missingLastName = await page.locator('input#lastName:invalid')
    await expect(missingLastName).toBeVisible()
  })

  test("Entering an Invalid Email", async ({
    page,
  }) => {
    await page.getByLabel('First Name *').click();
    await page.getByLabel('First Name *').fill('Calvin');
    await page.getByLabel('Last Name *').click();
    await page.getByLabel('Last Name *').fill('Coronado');
    await page.getByLabel('Birthday *').fill('2023-04-04');
    await page.getByLabel('Username *').click();
    await page.getByLabel('Username *').fill('sample1');
    await page.getByLabel('Email *').click();
    await page.getByLabel('Email *').fill('plserror.com');

    await page.locator('div').filter({ hasText: 'RegistrationFirst Name *First Name *Last Name *Last Name *Birthday *Birthday *Us' }).nth(1).press('F12');
    await page.getByLabel('Password *', { exact: true }).click();
    await page.getByLabel('Password *', { exact: true }).fill('qwerty123');
    await page.getByLabel('Confirm Password *').click();
    await page.getByLabel('Confirm Password *').fill('qwerty123');
    await page.getByRole('button', { name: 'Register!' }).click();

    const emailErrorMessage = await page.getByTestId("emailErrorMessage");
    await expect(emailErrorMessage).toHaveCount(1);
  })
});

