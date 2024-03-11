const { test, expect } = require('@playwright/test')

test('Verify "All Books" link is available', async ( {page} ) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBokksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBokksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})
