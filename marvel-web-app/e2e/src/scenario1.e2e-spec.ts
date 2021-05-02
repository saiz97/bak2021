import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';

describe('Scenario 1 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  })

  it('check app is running', () => {
    const appContainer = element(by.css('app-root #page-container'));
    expect(appContainer.isPresent()).toBe(true);
  });

  it('check if header component exists', () => {
    const header = element(by.css('app-header'));
    expect(header.isDisplayed()).toBe(true);
  })

  it('check if navigation exists', () => {
    const nav = element(by.css('app-header .navbar'));
    expect(nav.isPresent() && nav.isDisplayed()).toBe(true);
  });

  it('check if navigation items exist', () => {

    element.all(by.css('app-header .navbar .nav-item')).then((items) => {
      expect(items.length).toBe(5);
      expect(items[0].isDisplayed()).toBe(true);
      expect(items[1].isDisplayed()).toBe(true);
      expect(items[2].isDisplayed()).toBe(false);
      expect(items[3].isDisplayed()).toBe(true);
      expect(items[4].isDisplayed()).toBe(true);
    })

    element.all(by.css('app-header .navbar .nav-link')).then((items) => {
      expect(items.length).toBe(4);
      items[0].getText().then((text) => expect(text.toLowerCase()).toBe('home'));
      items[1].getText().then((text) => expect(text.toLowerCase()).toBe('comics'));
      items[2].getText().then((text) => expect(text.toLowerCase()).toBe('login'));
      items[3].getText().then((text) => expect(text.toLowerCase()).toBe('sign up'));
    })
  })

  it('check if footer component exists', () => {
    const footer = element(by.css('app-footer'));
    expect(footer.isDisplayed()).toBe(true);
  })

   afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
