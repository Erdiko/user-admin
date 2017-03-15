import { browser, element, by } from 'protractor';

export class UserAdminPage {
  navigateTo(path) {
    return browser.get(path);
  }

  getParagraphText(css) {
    return element(by.css(css)).getText();
  }
}
