const { test, expect } = require('@playwright/test')

const baseURL = 'http://localhost:3000'

test('Verify "All Books" link is available', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const allBokksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBokksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});


test('Verify "Login" button is available', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const loginBtn = await page.$('a[href="/login"]');
    const isLoginBtnVisible = await loginBtn.isVisible();
    expect(isLoginBtnVisible).toBe(true);
});

test('Verify "Register" button is available', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const registerBtn = await page.$('a[href="/register"]');
    const isRegisterBtnVisible = await registerBtn.isVisible();
    expect(isRegisterBtnVisible).toBe(true);
});

test.only('Verify "All Books" link is visible after user login', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // Check if "Logout" button is visible
    const logoutBtn = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutBtn.isVisible();
    expect(isLogoutBtnVisible).toBe(true);

    // Check if "All Books" link is visible
    const allBokksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBokksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});
