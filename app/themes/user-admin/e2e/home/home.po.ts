import { protractor, browser, element, by, WebElement } from 'protractor';

export class UserAdminPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText(css) {
    return element(by.css(css)).getText();
  }

  login() {
    this.navigateTo();

    let email = browser.findElement(protractor.By.name('email'));
    let password = browser.findElement(protractor.By.name('password'));
    let submit = browser.findElement(protractor.By.className('btn btn-success'));

    email.sendKeys('foo@mail.com');
    password.sendKeys('asdf1234');
    
    submit.click();

    expect(this.getParagraphText("app-home h1")).toEqual('Erdiko User Admin');
  }

  logout() {
    expect(element(by.css(".nav navbar-nav > li:last-child > a"))).toBeTruthy();
    //Logout is clicked
    let logout = browser.findElement(protractor.by.css('ul > li:last-child > a'));
    logout.click();

    expect(this.getParagraphText(".navbar-brand")).toEqual('User Admin');
  }
}
