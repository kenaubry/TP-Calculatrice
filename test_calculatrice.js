const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testCalculatrice() {
    let options = new chrome.Options();
    options.addArguments('--headless');             // exécution sans interface graphique
    options.addArguments('--no-sandbox');           // nécessaire dans Docker
    options.addArguments('--disable-dev-shm-usage');// éviter les erreurs mémoire partagée

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // ⚠️ l’app tourne dans le même container → localhost:8080
        await driver.get("http://localhost:8080");

        // --- Test 1 : Addition ---
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('5');
        await driver.findElement(By.css('#operation')).click();
        await driver.findElement(By.css('#operation option[value="add"]')).click();
        await driver.findElement(By.id('calculate')).click();

        let resultAdd = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Addition : ", resultAdd === '15' ? "Réussi ✅" : `Échoué ❌ (obtenu: ${resultAdd})`);

        // --- Test 2 : Division par zéro ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('0');
        await driver.findElement(By.css('#operation')).sendKeys(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN); // division
        await driver.findElement(By.id('calculate')).click();

        let resultDivZero = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Division par Zéro : ", resultDivZero === 'Division par zéro impossible.' ? "Réussi ✅" : `Échoué ❌ (obtenu: ${resultDivZero})`);

        // --- Test 3 : Entrée non valide ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('5'); // number1 manquant
        await driver.findElement(By.id('calculate')).click();

        let resultInvalid = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Entrée Non Valide : ", resultInvalid === 'Veuillez entrer des nombres valides.' ? "Réussi ✅" : `Échoué ❌ (obtenu: ${resultInvalid})`);

        // --- Test 4 : Soustraction ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('50');
        await driver.findElement(By.id('number2')).sendKeys('30');
        await driver.findElement(By.css('#operation')).click();
        await driver.findElement(By.css('#operation option[value="subtract"]')).click();
        await driver.findElement(By.id('calculate')).click();

        let resultSub = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Soustraction : ", resultSub === '20' ? "Réussi ✅" : `Échoué ❌ (obtenu: ${resultSub})`);

    } finally {
        await driver.quit(); // ferme Chrome
    }
})();
