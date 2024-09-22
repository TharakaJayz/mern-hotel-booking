import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "nike.jpg"),
    path.join(__dirname, "files", "shoe.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved !")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(
    page.getByRole("heading", { name: "Dublin Getaways" })
  ).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit ame")).toBeVisible(); // checking the part of the paragraph will be visible or not

  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$119 per night")).toBeVisible();
  await expect(page.getByText("2 adults , 3 children")).toBeVisible();
  await expect(page.getByText("2 Start Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link",{name:"View Details"}).click();

  await page.waitForSelector('[name="name"]',{state:"attached"}) // wait to appear name input element
  await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways ");
  await page.locator('[name="name"]').fill("Dublin Getaways updated");
  await page.getByRole("button",{name:"Save"}).click();

  await expect(page.getByText("Hotel Saved !")).toBeVisible();
});
