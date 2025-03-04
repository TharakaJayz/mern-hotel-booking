import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page
    .getByRole("link", {
      name: "Sign In",
    })
    .click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("nethmi@gmail.com");

  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("SignIn successful !")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("where are you going ?").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
  await expect(page.getByText("Dublin Getaways updated")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page
    .getByRole("link", {
      name: "Sign In",
    })
    .click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("nethmi@gmail.com");

  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await page.getByPlaceholder("where are you going ?").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Dublin Getaways updated").click();

  await expect(page).toHaveURL(/detail/);
  // make sure url has detail word inside it
  await expect(page.getByText("Book Now")).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page
    .getByRole("link", {
      name: "Sign In",
    })
    .click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("nethmi@gmail.com");

  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();
 await page.getByRole("link",{ name: /my hotels/i}).click();
  await page.getByPlaceholder("where are you going ?").fill("Dublin");
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Dublin Getaways updated").click();


  // make sure url has detail word inside it
  await page.getByText("Book Now").click()

  await expect(page.getByText("Total Cost:$357.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");

  await stripeFrame.locator('[placeholder="MM / YY"]').fill("12/28");
  await stripeFrame.locator('[placeholder="CVC"]').fill("123");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12350");
  await page.getByRole("button",{name:"Confirm Booking"}).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();
});
