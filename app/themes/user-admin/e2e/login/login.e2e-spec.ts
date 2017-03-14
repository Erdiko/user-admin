import { UserAdminPage } from './login.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('login page', () => {
  let page: UserAdminPage;

  beforeEach(() => {
    page = new UserAdminPage();
  });

  /*
    Initial home page (login form) elements
  */

  it('should display message saying User Admin', () => {
    page.navigateTo();
    expect(page.getParagraphText(".navbar-brand")).toEqual('User Admin');
  });

  it('should display a login email and password input element', () => {
    expect(element(by.css('input[name=email]'))).toBeTruthy();
    expect(element(by.css('input[name=password]'))).toBeTruthy();
  });

  it('should display a submit button', () => {
    expect(element(by.css('btn btn-default'))).toBeTruthy();
  });

  /*
    Login form negative case
  */
  it('should display a login fail message', () => {
    let email = browser.findElement(protractor.By.name('email'));
    let password = browser.findElement(protractor.By.name('password'));
    let submit = browser.findElement(protractor.By.className('btn btn-default'));

    // Input Values
    email.sendKeys('foo@bar.com');
    password.sendKeys('barfood');
    
    // Click the Submit button
    submit.click();

    //Warning Message
    expect(element(by.css('.alert alert-danger'))).toBeTruthy();

    email.clear();
    password.clear();
  });

  /*
    Login form positive case
  */
  it('should login successfully with right email and password', () => {
    let email = browser.findElement(protractor.By.name('email'));
    let password = browser.findElement(protractor.By.name('password'));
    let submit = browser.findElement(protractor.By.className('btn btn-default'));

    email.sendKeys('foo@mail.com');
    password.sendKeys('asdf1234');
    
    submit.click();

    // If the login is a success, "Welcome to the Erdiko User Admin" will be displayed
    expect(page.getParagraphText("app-home h1")).toEqual('Welcome to the Erdiko User Admin');
    
  });

  it('should logout when Logout link is clicked', () => {
    //Logout is clicked
    let logout = browser.findElement(protractor.by.css('ul > li:last-child > a'));
    logout.click();

    expect(page.getParagraphText(".navbar-brand")).toEqual('User Admin');
  });

});
