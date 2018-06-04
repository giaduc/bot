const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');

/**
 * auto Google search
 */
(async function searchGoogle() {
    const driver = new Builder().forBrowser('safari').build();
    driver.manage().window().maximize();
    await driver.get('https://google.com');
    const element = driver.findElement(By.name('q'));
    await element.sendKeys('Victory');
    await element.submit();
    driver.takeScreenshot().then(
        (i, e) => {
            const data = i.replace(/^data:image\/\w+;base64,/, "");
            const buf = new Buffer.from(data, 'base64');
            fs.writeFile('image.png', buf, e => {
                if (e) throw e;
            });
        }
    );
})();