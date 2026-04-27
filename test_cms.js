const { Builder, By } = require('selenium-webdriver');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testUserRegistration() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // ===== TC1 =====
        await driver.get('http://localhost:6000');
        console.log("Opened page...");
        await sleep(2000);

        let title = await driver.getTitle();
        console.log("TC1 Page Loaded:", title ? "PASS" : "FAIL");

        // ===== TC2: Valid Input =====
        await driver.findElement(By.name('name')).sendKeys('Pranav Dhote');
        await sleep(1000);

        await driver.findElement(By.name('email')).sendKeys('test@gmail.com');
        await sleep(1000);

        await driver.findElement(By.css("input[type='submit']")).click();
        console.log("Clicked submit...");
        await sleep(2000);

        let body1 = await driver.findElement(By.tagName('body')).getText();
        console.log("TC2 Valid Input:",
            body1.includes('Registration Successful') ? "PASS" : "FAIL");

        // ===== TC3: Empty Input =====
        await driver.get('http://localhost:6000');  
        await sleep(2000);

        await driver.findElement(By.css("input[type='submit']")).click();
        await sleep(2000);

        let body2 = await driver.findElement(By.tagName('body')).getText();
        console.log("TC3 Empty Input:",
            body2.includes('required') || body2.includes('fill all')
                ? "PASS" : "CHECK MANUALLY");

        // ===== TC4 =====
        await driver.get('http://localhost:6000');
        await sleep(2000);

        let body4 = await driver.findElement(By.tagName('body')).getText();
        console.log("TC4 UI Present:",
            body4.includes('Event Registration') ? "PASS" : "FAIL");

        console.log("Keeping browser open for 5 seconds...");
        await sleep(5000);

    } finally {
        await driver.quit();
    }

})();