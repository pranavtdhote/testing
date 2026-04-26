const { Builder, By, until } = require('selenium-webdriver');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testAdditionApp() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // STEP 1: Open Application
        await driver.get('file:///D:/Choco/Devops/Assignment/testing/index.html');
        console.log("Application Opened Successfully...");
        await sleep(2000);

        // TEST CASE 1: Valid Input Test (5 + 3 = 8)
        console.log("Running Test Case 1: Valid Addition");

        let num1 = await driver.findElement(By.id('num1'));
        let num2 = await driver.findElement(By.id('num2'));

        await num1.clear();
        await num2.clear();

        await num1.sendKeys('5');
        await sleep(1000);

        await num2.sendKeys('3');
        await sleep(1000);

        let button = await driver.findElement(By.id('addBtn'));
        await button.click();

        await sleep(2000);

        let resultElement = await driver.findElement(By.id('result'));
        let result = await resultElement.getText();

        console.log("Output:", result);

        if (result.includes('8')) {
            console.log("Test Case 1 Passed ✅");
        } else {
            console.log("Test Case 1 Failed ❌");
        }

        // TEST CASE 2: Empty Input Validation
        console.log("Running Test Case 2: Empty Input Validation");

        await num1.clear();
        await num2.clear();

        await button.click();
        await sleep(2000);

        let emptyResult = await resultElement.getText();
        console.log("Output:", emptyResult);

        if (emptyResult.includes('Please enter both numbers')) {
            console.log("Test Case 2 Passed ✅");
        } else {
            console.log("Test Case 2 Failed ❌");
        }

        // TEST CASE 3: Negative Number Test
        console.log("Running Test Case 3: Negative Numbers");

        await num1.clear();
        await num2.clear();

        await num1.sendKeys('-2');
        await sleep(1000);

        await num2.sendKeys('4');
        await sleep(1000);

        await button.click();
        await sleep(2000);

        let negativeResult = await resultElement.getText();
        console.log("Output:", negativeResult);

        if (negativeResult.includes('2')) {
            console.log("Test Case 3 Passed ✅");
        } else {
            console.log("Test Case 3 Failed ❌");
        }

        console.log("All Test Cases Executed Successfully 🚀");
        await sleep(5000);

    } catch (error) {
        console.log("Error Occurred:", error);
    } finally {
        await driver.quit();
    }

})();