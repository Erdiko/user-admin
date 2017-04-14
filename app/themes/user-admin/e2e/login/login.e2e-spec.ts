import { UserAdminPage } from '../app.po';
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
    page.loginFail();
  });

  /*
    Login form positive case
  */
  it('should login successfully with right email and password', () => {
    page.login();
  });

  it('should logout when Logout link is clicked', () => {
    page.logout();
  });

});
