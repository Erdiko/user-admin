import { protractor, browser, element, by, WebElement } from 'protractor';

export class UserAdminPage {
  
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText(css) {
    return element(by.css(css)).getText();
  }

  goToUserList() {
    let userListNav = browser.findElement(protractor.by.css('nav ul > li:nth-child(2) > a'));
    userListNav.click();
  }

  login() {
    this.navigateTo();

    let email = browser.findElement(protractor.By.name('email'));
    let password = browser.findElement(protractor.By.name('password'));
    let submit = browser.findElement(protractor.By.className('btn btn-success'));

    //For the following email and password to work, the sql script in user-admin/scripts/sql/create-e2e-user.sql must be executed
    //The purpose is so that every developer running e2e test has same login credentials.
    email.sendKeys('test@bug.com');
    password.sendKeys('asdf1234');
    
    submit.click();

    expect(this.getParagraphText("app-message .alert-success")).toEqual('You have Successfully logged in');
    expect(this.getParagraphText("app-home h1")).toEqual('Welcome to the Erdiko User Admin');
  }

  logout() {

    expect(element(by.cssContainingText('a', 'Logout'))).toBeTruthy();
    
    //Logout is clicked
    let logout = browser.findElement(protractor.By.cssContainingText('a', 'Logout'));
    logout.click();

    expect(this.getParagraphText("app-message .alert-success")).toEqual('You have Successfully logged out');

    //Check for the logout status
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
    email.sendKeys('test@bug.com');
    password.sendKeys('1234asdf');

    // Click the Submit button
    submit.click();

    //Warning Message
    expect(element(by.css('.alert alert-danger'))).toBeTruthy();

    email.clear();
    password.clear();
  }

  loginWithUpdated(updated) {
    let email = browser.findElement(protractor.By.name('email'));
    let password = browser.findElement(protractor.By.name('password'));
    let submit = browser.findElement(protractor.By.className('btn btn-success'));

    // Input Values
    email.sendKeys('sam@sepiol.com');
    password.sendKeys(updated);
  }
}