import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';

describe('Scenario 4 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('check if comics route is click- and reachable', () => {
    const comics = element(by.css('a[routerlink="comics"'));
    expect(comics.isDisplayed()).toBe(true);
    comics.click();

    const comicsComponent = element(by.css('app-comics .container'));
    expect(comicsComponent.isDisplayed()).toBe(true);
  });

  it('check if intro is visible', () => {
    const intro = element(by.css('app-comics .intro'));
    expect(intro.isDisplayed()).toBe(true);
  });

  it('check if year-select is exists and has data', () => {
    const select = element(by.css('app-comics .filter-container select'));
    select.all(by.css("option")).then((options) => {
      expect(options.length).toBeGreaterThan(0);
    });

    const selectedOption = select.element(by.css("[selected='true'"));
    expect(selectedOption.getText()).toBe("2021");
  });

  it('check if comic-list-item has mouse-hover', () => {
    const firstComic = element.all(by.css('app-comic-list .comic-list .comic-item')).first();

    expect(firstComic.isDisplayed()).toBe(true);
    expect(firstComic.element(by.css('figcaption')).isDisplayed()).toBe(false);

    browser.actions().mouseMove(firstComic).perform();
    expect(firstComic.element(by.css('figcaption')).isDisplayed()).toBe(true);

    browser.takeScreenshot().then((png) => {
      page.writeScreenShot(png, 'hover_comic_item.png');
    });
  });

  it('check if new comics are loaded after selecting another year', () => {
    const firstComicBefore = element.all(by.css('app-comic-list .comic-list .comic-item')).first();
    const firstComicIdBefore = firstComicBefore.getId();
    expect(firstComicBefore.isDisplayed()).toBe(true);

    element(by.cssContainingText('app-comics .filter-container select option', '2019')).click();

    const firstComicAfter = element.all(by.css('app-comic-list .comic-list .comic-item')).first();
    expect(firstComicAfter.isDisplayed()).toBe(true);
    const firstComicIdAfter = firstComicAfter.getId();

    expect(firstComicIdBefore).not.toEqual(firstComicIdAfter);
  });

  it('check if new comics are loaded when selecting another page of pagination', () => {
    const firstComicBefore = element.all(by.css('app-comic-list .comic-list .comic-item')).first();
    const firstComicIdBefore = firstComicBefore.getId();
    expect(firstComicBefore.isDisplayed()).toBe(true);

    element.all(by.css('app-comics .filter-container .page-btn')).then(((pages) => {
      expect(pages.length).toBeGreaterThan(1);
    }));

    element.all(by.css('app-comics .filter-container .page-btn[value="2"]')).click();

    const firstComicAfter = element.all(by.css('app-comic-list .comic-list .comic-item')).first();
    expect(firstComicAfter.isDisplayed()).toBe(true);
    const firstComicIdAfter = firstComicAfter.getId();

    expect(firstComicIdBefore).not.toEqual(firstComicIdAfter);

    browser.takeScreenshot().then((png) => {
      page.writeScreenShot(png, 'second_page_check.png');
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
