const { test, expect } = require('@playwright/test')

const baseURL = 'http://localhost:3000'

// Check if Links are visible 
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

test('Verify "All Books" link is visible after user login', async ( {page} ) => {
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

// Check Login

test('Login with valid credentials', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(baseURL + '/catalog');
});


test('Submit Login form with empty fields', async ({ page }) => {
    await page.goto(baseURL + '/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + '/login');
});

test('Submit Login form with empty email field', async ({ page }) => {
    await page.goto(baseURL + '/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + '/login');
});

test('Submit Login form with empty password field', async ({ page }) => {
    await page.goto(baseURL + '/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + '/login');
});

// Check Register

test('Register with valid credentials', async ({ page }) => {
    await page.goto(baseURL + '/register');

    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(baseURL + '/catalog');
});


test('Submit Register form with empty fields', async ({ page }) => {
    await page.goto(baseURL + '/register');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + '/register');
});

test('Submit Register form with empty email field', async ({ page }) => {
    await page.goto(baseURL + '/register');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + '/register');
});

test('Submit Register form with empty password field', async ({ page }) => {
    await page.goto(baseURL + '/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + '/register');
});

test('Submit Register form with empty confirm password field', async ({ page }) => {
    await page.goto(baseURL + '/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + '/register');
});

test('Submit Register form with different password fields', async ({ page }) => {
    await page.goto(baseURL + '/register');
    await page.fill('input[name="email"]', 'test1@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '654321');
    await page.click('input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + '/register');
});