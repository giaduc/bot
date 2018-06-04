const fs = require('fs');
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

/**
 * auto login Facebook
 */
(async function loginFacebook() {
    const driver = new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
    try {
        await driver.get('https://facebook.com');
        const email = driver.findElement(By.name('email'));
        const password = driver.findElement(By.name('pass'));
        await email.sendKeys('giaduc22@gmail.com');
        await password.sendKeys('rDuLTDI9', Key.RETURN);
        await driver.manage().getCookies().then((e) => {
            const data = JSON.stringify(e, null, 2);
            fs.writeFileSync('fbcookies.json', data, null);
        });
        await driver.manage().deleteAllCookies();

        await driver.navigate().refresh();

        // await driver.manage().addCookie();

        const ob = readCo();
        for (const o of ob) {
            const {name, value} = o;
            console.log(name, value);
            await driver.manage().addCookie({name, value});
        }
        await driver.navigate().refresh();
    } catch (error) {
        console.log(error);
    } finally {
        // driver.quit();
    }
})();

function readCo() {
    return JSON.parse(fs.readFileSync('fbcookies.json', 'utf8'));
}