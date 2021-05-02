import { browser } from 'protractor';

var fs = require('fs');

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  writeScreenShot(data, filename) {
    const path = "e2e/screenshots/";
    filename = path + filename;
    var stream = fs.createWriteStream(filename);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
  }
}
