import { browser, element, by } from 'protractor';

export class UserAdminPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText(css) {
    return element(by.css(css)).getText();
  }
}
