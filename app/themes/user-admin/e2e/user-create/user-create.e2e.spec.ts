import { UserAdminPage } from './user-create.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('Login', function() {
    let page: UserAdminPage;

    beforeEach(() => {
        page = new UserAdminPage();
    });

    it('should login successfully with right email and password', () => {
        page.navigateTo("/");
        let email = browser.findElement(protractor.By.name('email'));
        let password = browser.findElement(protractor.By.name('password'));
        let submit = browser.findElement(protractor.By.className('btn btn-default'));

        email.sendKeys('foo@mail.com');
        password.sendKeys('asdf1234');
        
        submit.click();

        expect(page.getParagraphText("app-home h1")).toEqual('Welcome to the Erdiko User Admin');
    });

    it('should lead to Create a User page at click of the Create a User link', () => {
        //check for both User List Link
        let create = browser.findElement(protractor.by.css('app-home ul > li:first-child > a'));
        create.click();
    });

    it('should lead to User List page at click of the cancel button', () => {
        let cancel = browser.findElement(protractor.By.css('button[type=cancel]'));
        cancel.click();

        //Go back to Create User page by clicking 'Create a New User'
        let create = browser.findElement(protractor.By.css('button[routerlink=/user/]'));
        create.click();
    });

    it('should input name, email, role and save the user and check its presence', () => {
        let name = browser.findElement(protractor.By.name('name'));
        let email = browser.findElement(protractor.By.name('email'));
        let user = browser.findElement(protractor.By.cssContainingText('option', 'User'));
        let admin = browser.findElement(protractor.By.cssContainingText('option', 'Admin'));
        let save = browser.findElement(protractor.By.css('button[type=submit]'));
        
        //Create new user
        name.sendKeys('Elliott Alderson');
        email.sendKeys('elliott@funsociety.com');
        admin.click();
        save.click();

        //Check new user's presense
        page.navigateTo("/list")
    });

    it('should logout when Logout link is clicked', () => {
        
        expect(element(by.css(".nav navbar-nav > li:last-child > a"))).toBeTruthy();
        //Logout is clicked

        let logout = browser.findElement(protractor.by.css('ul > li:last-child > a'));
        logout.click();

        expect(page.getParagraphText(".navbar-brand")).toEqual('User Admin');
    });
});