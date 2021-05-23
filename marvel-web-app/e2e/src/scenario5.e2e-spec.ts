import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';

describe('Scenario 5 - Protractor', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo("comics");
  });

  it('check if click on list-item leads to comic-detail-view', () => {
    element.all(by.css('app-comic-list .comic-list .comic-item')).first().click();
    expect(element(by.css('app-comic-detail .comic-detail-container')).isPresent()).toBe(true);
  });

  it('check detail-view has primary data displayed', () => {
    const detailContainer = element(by.css('app-comic-detail .comic-detail-container'));

    expect(detailContainer.element(by.css(".details h1 a")).getText()).toBe("Alien (2021) #2");
    expect(detailContainer.element(by.css(".details .published")).isPresent()).toBe(true);
    expect(detailContainer.element(by.css(".details .creators")).isPresent()).toBe(true);
    expect(detailContainer.element(by.css(".thumbnail")).isDisplayed()).toBe(true);
  });

  it('check if the more-details section exists', () => {
    const detailContainer = element(by.css('app-comic-detail .comic-detail-container'));
    expect(detailContainer.element(by.css(".more-details")).isDisplayed()).toBe(true);
  });

  it('check if the characters are displayed and hidden, if not existing', () => {
    const detailContainer = element(by.css('app-comic-detail .comic-detail-container'));
    expect(detailContainer.element(by.css(".characters")).isPresent()).toBe(false);

    const btnNav = element(by.css(".nav-item a[routerLink='comics']"));
    btnNav.click().then(() => {
      element(by.css('app-comic-list .comic-list #comic_90046')).click();
      expect(detailContainer.element(by.css(".characters")).isPresent()).toBe(true);
    })
  });

  it('check if like-btn is available and is disabled if user is not logged in', () => {
    const likeBtn = element(by.css('.btn-fav'));
    expect(likeBtn.isDisplayed()).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
