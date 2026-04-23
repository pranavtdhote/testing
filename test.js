const { Builder, By, until } = require('selenium-webdriver');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testAddition() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open HTML file
        await driver.get('file:///D:/Choco/Devops/Assignment/testing/index.html');

        console.log("Opened page...");
        await sleep(2000);

        // Enter values slowly (visible typing)
        let num1 = await driver.findElement(By.id('num1'));
        let num2 = await driver.findElement(By.id('num2'));

        await num1.sendKeys('5');
        await sleep(1000);

        await num2.sendKeys('3');
        await sleep(1000);

        // Click button
        let button = await driver.findElement(By.tagName('button'));
        await button.click();
        console.log("Clicked button...");
        await sleep(2000);

        // Wait until result appears
        let resultElement = await driver.wait(
            until.elementLocated(By.id('result')),
            5000
        );

        let result = await resultElement.getText();
        console.log("Result:", result);

        // Assertion
        if (result.includes('8')) {
            console.log("Test Passed ✅");
        } else {
            console.log("Test Failed ❌");
        }

        // Keep browser open for observation
        console.log("Keeping browser open for 5 seconds...");
        await sleep(5000);

    } finally {
        await driver.quit();
    }

})();