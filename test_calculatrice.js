const { Builder, By, Key } = require('selenium-webdriver');

(async function testCalculatrice() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Accéder au site local
        await driver.get('http://localhost:8081');

        // --- Test 1 : Vérifier l'Addition ---
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('5');
        await driver.findElement(By.css('#operation')).click();
        await driver.findElement(By.css('#operation option[value="add"]')).click();
        await driver.findElement(By.id('calculate')).click();

        let result = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Addition : ", result === '15' ? "Réussi" : "Échoué");

        // --- Test 2 : Division par Zéro ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('0');
        await driver.findElement(By.css('#operation')).sendKeys(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN); // Sélectionner Division
        await driver.findElement(By.id('calculate')).click();

        let divisionError = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Division par Zéro : ", divisionError === 'Division par zéro impossible.' ? "Réussi" : "Échoué");

        // --- Test 3 : Entrée Non Valide ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('5');
        await driver.findElement(By.id('calculate')).click();

        let inputError = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Entrée Non Valide : ", inputError === 'Veuillez entrer des nombres valides.' ? "Réussi" : "Échoué");

        // --- Test 4 : Vérifier la Soustraction ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('50');
        await driver.findElement(By.id('number2')).sendKeys('30');
        await driver.findElement(By.css('#operation')).click();
        await driver.findElement(By.css('#operation option[value="subtract"]')).click();
        await driver.findElement(By.id('calculate')).click();

        let subtractionResult = await driver.findElement(By.css('#result span')).getText();
        console.log("Test Soustraction : ", subtractionResult === '20' ? "Réussi" : "Échoué");

    } finally {
        // Fermer le navigateur
        await driver.quit();
    }
})();
