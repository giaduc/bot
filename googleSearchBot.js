const fs = require('fs');
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

/**
 * auto Google search
 */
(async function searchGoogle() {
    const driver = new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
    try {
        await driver.get('https://google.com');
        const element = driver.findElement(By.name('q'));
        await element.sendKeys('Victory two step from hell', Key.RETURN);
        await driver.takeScreenshot().then(e => {
            const data = e.replace(/^data:image\/\w+;base64,/, "");
            const buf = new Buffer(data, 'base64');
            fs.writeFile('image.png', buf);
        });
    } catch (error) {
        console.log(error);
    } finally {
        driver.quit();
    }
})();