import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder, ExpectedConditions } from 'protractor';

describe('Scenario 6 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('check if click on signup leads to signup-form', () => {
    element(by.css(".nav-link[routerLink='signup']")).click();
    expect(element(by.css('app-sign-up')).isPresent()).toBe(true);
  });

  it('check if switch to login is working and route changed', () => {
    element(by.css("app-sign-up .btn-switch-mode")).click();
    expect(element(by.css('app-login')).isPresent()).toBe(true);
  });

  it('check if login button is disabled, when input-fields are empty', () => {
    const loginComponent = element(by.css('app-login'));
    const loginBtn = loginComponent.element(by.css('.btn-primary[type="submit"]')).getAttribute('disabled');
    const inputEmail = loginComponent.element(by.css('input[formcontrolname="email"]')).getAttribute('value');
    const inputPassword = loginComponent.element(by.css('input[formcontrolname="password"]')).getAttribute('value');

    expect(inputEmail).toBe('');
    expect(inputPassword).toBe('');
    expect(loginBtn).toBe('true');
  });

  it('check for error messages on invalid user input', () => {
    const loginComponent = element(by.css('app-login'));
    const inputEmail = loginComponent.element(by.css('input[formcontrolname="email"]'));

    inputEmail.sendKeys("kwm");
    expect(element(by.css('.invalid-feedback div')).getText()).toBe('Email must be a valid email address');

    inputEmail.sendKeys("@e2e.at");
    expect(element(by.css('.invalid-feedback')).isPresent()).toBe(false);
  });

  it('check if user can log in', () => {
    const loginComponent = element(by.css('app-login'));
    const inputPassword = loginComponent.element(by.css('input[formcontrolname="password"]'));
    const loginBtn = loginComponent.element(by.css('.btn-primary[type="submit"]'));

    inputPassword.sendKeys(browser.params.user.password);
    expect(loginBtn.getAttribute('disabled')).toBe(null);

    loginBtn.click();
    // browser.sleep(5000);

    expect(element(by.css('app-loader')).isDisplayed()).toBe(true);

    expect(element(by.css('app-favorites')).isDisplayed()).toBe(true);


    browser.takeScreenshot().then((png) => {
      page.writeScreenShot(png, 'after_login.png');
    });
  });

  it('check if user-sessions is stored', () => {
    let localStorageUserBefore = browser.executeScript("return window.localStorage.getItem('userData');");
    expect(localStorageUserBefore).not.toBe(null);

    page.navigateTo();
    // browser.waitForAngularEnabled(false);
    let localStorageUserAfter = browser.executeScript("return window.localStorage.getItem('userData');");
    expect(localStorageUserAfter).not.toBe(null);
  });

  it('check if user-sessions still exists after reload', () => {

    let favoriteNavItem = element(by.css(".nav-link[routerLink='favorites']"));
    expect(favoriteNavItem.isDisplayed()).toBe(true);

    browser.takeScreenshot().then((png) => {
      page.writeScreenShot(png, 'after_refresh.png');
    });
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
