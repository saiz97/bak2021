import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';

describe('Scenario 2 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  })

  it('check if marvel logo links to marvel.com', () => {
    const headerLink = element(by.css('app-header header a.marvel'));
    expect(headerLink.getAttribute('href')).toBe('https://www.marvel.com/');
  })

  it('check if footer copyright links to marvel.com', () => {
    const footerLink = element(by.css('app-footer .copyright a'));
    expect(footerLink.getAttribute('href')).toBe('https://www.marvel.com/');
  });

   afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
