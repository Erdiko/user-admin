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

    expect(this.getParagraphText("app-home h1")).toEqual('Welcome to the Erdiko User Admin');
  }

  logout() {

    expect(element(by.cssContainingText('a', 'Logout'))).toBeTruthy();
    
    //Logout is clicked
    let logout = browser.findElement(protractor.By.cssContainingText('a', 'Logout'));
    logout.click();

    expect(this.getParagraphText(".navbar-brand")).toEqual('User Admin');
    expect(element(by.css('#edit-user'))).toBeTruthy();
    expect(element(by.css('#email-form'))).toBeTruthy();
    expect(element(by.css('#password-form'))).toBeTruthy();
  }

  loginFail() {
    let email = browser.findElement(protractor.By.name('email'));
    let password = browser.findElement(protractor.By.name('password'));
    let submit = browser.findElement(protractor.By.className('btn btn-success'));

    // Input Values
    //////////Inconsistent test username and passwords
    email.sendKeys('foo@bar.com');
    password.sendKeys('barfood');
    
    // Click the Submit button
    submit.click();

    //Warning Message
    expect(element(by.css('.alert alert-danger'))).toBeTruthy();

    email.clear();
    password.clear();
  }
}