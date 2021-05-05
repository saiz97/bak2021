import { AppPage } from "./app.po";
import { browser, logging, by, element, ElementArrayFinder } from 'protractor';
import { protractor } from "protractor/built/ptor";

describe('Scenario 7 - Protractor', () => {
  let page: AppPage;
  let EC = protractor.ExpectedConditions;

  const urlChanged = function() {
    return browser.getCurrentUrl().then(function(url) {
      return url.includes('favorites');
    });
  };

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('check if user is logged in and located in app-favorites', () => {
    if (!page.isLoggedIn()) {
      page.doLogin();
    }

    const favsPage = element(by.css("app-favorites .container"));
    browser.wait(protractor.ExpectedConditions.presenceOf(favsPage), 30000, 'Favorites taking too long to appear in the DOM');


    const favs = element(by.css(".nav-link[routerLink='favorites']"));
    expect(favs.getAttribute('routerlinkactive')).toBe('active');

    browser.takeScreenshot().then((png) => {
      page.writeScreenShot(png, 'after_login.png');
    });
  });

  it('check if user can add a comic to favorites', () => {
    const comicsNav = element(by.css(".nav-link[routerLink='comics']"));
    comicsNav.click();

    let comic = element.all(by.css('.comic-item')).first();
    comic.click();

    let like = element(by.css('.btn-fav'));
    expect(like.getAttribute('disabled')).toBe(null);
    like.click().then(() => {
       browser.takeScreenshot().then((png) => {
        page.writeScreenShot(png, 'after_like.png');
      });
    });
  });

  it('check if favored comic exists in favorites', () => {
    const comicsFav = element(by.css(".nav-link[routerLink='favorites']"));
    comicsFav.click();

    let comic = element(by.css('.comic-item'));
    expect(comic.isDisplayed()).toBe(true);
  });

  it('check if favored comic can be disliked', () => {
    let comic = element(by.css('.comic-item'));
    comic.click();

    let dislike = element(by.css('.btn-fav'));
    expect(dislike.getAttribute('ng-reflect-ng-class')).toBe('favored');
    dislike.click();

    browser.takeScreenshot().then((png) => {
      page.writeScreenShot(png, 'after_dislike.png');
    });
  });

  it('check if favorite got removed from favorites-list', () => {
    const comicsFav = element(by.css(".nav-link[routerLink='favorites']"));
    comicsFav.click();

    expect(element(by.css('.comic-item')).isPresent()).toBe(false);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
