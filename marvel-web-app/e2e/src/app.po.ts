import { browser, element, by } from 'protractor';

var fs = require('fs');

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.params.appUrl) as Promise<unknown>;
  }

  writeScreenShot(data, filename) {
    const path = "e2e/screenshots/";
    filename = path + filename;
    var stream = fs.createWriteStream(filename);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
  }

  isLoggedIn() {
    let localStorageUserAfter = browser.executeScript("return window.localStorage.getItem('userData');");
    // expect(localStorageUserAfter).not.toBe(null);
    return (localStorageUserAfter == null);
  }

  doLogin() {
    element(by.css(".nav-link[routerLink='login']")).click();
    const loginComponent = element(by.css('app-login'));
    const inputPassword = loginComponent.element(by.css('input[formcontrolname="password"]'));
    const inputEmail = loginComponent.element(by.css('input[formcontrolname="email"]'));
    const loginBtn = loginComponent.element(by.css('.btn-primary[type="submit"]'));

    inputEmail.sendKeys(browser.params.user.email);
    inputPassword.sendKeys(browser.params.user.password);

    loginBtn.click();
  }
}
