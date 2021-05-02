import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';

describe('Scenario 3 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  })

  it('check if home route is click- and reachable', () => {
    const home = element(by.css('a[routerlink="home"'));
    expect(home.isDisplayed()).toBe(true);
    home.click();
  });

  it('check if articles are visible', () => {
    element.all(by.css('app-home section.content article')).then((articles) => {
      expect(articles.length).toBe(3);
    });
  });

  it('check header text and images of articles', () => {
    element.all(by.css('app-home section.content article')).then((articles) => {
      articles[0].element(by.css('.title')).getText().then((text => {
        expect(text.toLowerCase()).toBe('the purpose');
      }));
      articles[1].element(by.css('.title')).getText().then((text => {
        expect(text.toLowerCase()).toBe('the application');
      }));
      articles[2].element(by.css('.title')).getText().then((text => {
        expect(text.toLowerCase()).toBe('the author');
      }));

      expect(articles[0].element(by.css('.image img')).isDisplayed()).toBe(true);
      expect(articles[1].element(by.css('.image img')).isDisplayed()).toBe(true);
      expect(articles[2].element(by.css('.image img')).isDisplayed()).toBe(true);
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
