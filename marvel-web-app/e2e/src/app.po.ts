import { browser, element, by } from 'protractor';

var fs = require('fs');

export class AppPage {
  navigateTo(route?: string): Promise<unknown> {
    return browser.get(route != "" ? `${browser.params.appUrl}/${route}` : browser.params.appUrl) as Promise<unknown>;
  }

  writeScreenShot(data, filename) {
    const path = "e2e/screenshots/";
    filename = path + filename;
    var stream = fs.createWriteStream(filename);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
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
