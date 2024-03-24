const { test, expect } = require('@playwright/test')

const baseURL = 'http://localhost:3000'

// Check if Links are visible 
test('Verify "All Books" link is available', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const allBokksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBokksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});


test('Verify "Login" button is available', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const loginBtn = await page.$('a[href="/login"]');
    const isLoginBtnVisible = await loginBtn.isVisible();
    expect(isLoginBtnVisible).toBe(true);
});

test('Verify "Register" button is available', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const registerBtn = await page.$('a[href="/register"]');
    const isRegisterBtnVisible = await registerBtn.isVisible();
    expect(isRegisterBtnVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ({ page }) => {
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

    await page.fill('input[name="email"]', 'asdtest@abv.bg');
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

// Check Add Book

test('Add book with correct data', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    // fill the form with dummy data
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'this is a test book description');
    await page.fill('#image', 'https://example.com/book-image.png');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    await page.waitForURL(baseURL + '/catalog');
    expect(page.url()).toBe(baseURL + '/catalog');
});

test('Add book with empty Title field', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    // fill the form with dummy data
    await page.fill('#description', 'this is a test book description');
    await page.fill('#image', 'https://example.com/book-image.png');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(baseURL + '/create');
});

test('Add book with empty Descritption field', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    // fill the form with dummy data
    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'https://example.com/book-image.png');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(baseURL + '/create');
});


test('Add book with empty Image field', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    // fill the form with dummy data
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'this is a test book description');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    // Check if popup window shows
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(baseURL + '/create');
});


test('Verify that all books are displayed', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

test('Login and navigate to Details page', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitlee = await page.textContent('.book-information h3');
    expect(detailsPageTitlee).toBe('Test Book');
});

test('Navigate as Guest to Details page', async ({ page }) => {
    await page.goto(baseURL + '/catalog');

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Verify Details page if filled with correct data', async ({ page }) => {
    await page.goto(baseURL + '/catalog');

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');

    const detailsPageDescription = await page.textContent('.book-description p');
    expect(detailsPageDescription).toBe('this is a test book description');

    const detailsPageImage = await page.getAttribute('.img img', 'src');
    expect(detailsPageImage).toBe('https://example.com/book-image.png');

    const detailsPageType = await page.textContent('.type');
    expect(detailsPageType).toBe('Type: Fiction');
});


test('Creator see Edit and Delete buttons in Details', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const editLink = page.locator('a.button[href^="/edit/"]');
    const isEditBtnVisible = await editLink.isVisible();
    expect(isEditBtnVisible).toBe(true);

    const deleteLink = page.locator('a.button', { hasText: 'Delete' });
    const isDeleteBtnVisible = await deleteLink.isVisible();
    expect(isDeleteBtnVisible).toBe(true);
});


test('Non creator can NOT see Edit and Delete buttons in Details', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const editLink = page.locator('a.button[href^="/edit/"]');
    const isEditBtnVisible = await editLink.isVisible();
    expect(isEditBtnVisible).toBe(false);

    const deleteLink = page.locator('a.button', { hasText: 'Delete' });
    const isDeleteBtnVisible = await deleteLink.isVisible();
    expect(isDeleteBtnVisible).toBe(false);
});


test('Non creator can see Like option in Details', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const likeLink = page.locator('a.button', { hasText: 'Like' });
    const isLikeLinkVisible = await likeLink.isVisible();
    expect(isLikeLinkVisible).toBe(true);
});


test('Creator can NOT see Like option in Details', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        await page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const likeLink = page.locator('a.button', { hasText: 'Like' });
    const isLikeLinkVisible = await likeLink.isVisible();
    expect(isLikeLinkVisible).toBe(false);
});


test('Verify redirection of Logout link after user login', async ({ page }) => {
    await page.goto(baseURL + '/login');

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedURL = page.url();
    expect(redirectedURL).toBe(baseURL + '/catalog');
});
