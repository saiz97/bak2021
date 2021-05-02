import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';

describe('Scenario 2 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  })

  it('check if marvel logo links to marvel.com', () => {
    const header = element(by.css('app-header'));
    expect(header.isDisplayed()).toBe(true);
  })

  it('check if footer copyright links to marvel.com', () => {
    const nav = element(by.css('app-header .navbar'));
    expect(nav.isPresent() && nav.isDisplayed()).toBe(true);
  });

   afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
