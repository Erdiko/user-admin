import { UserAdminPage } from '../app.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('User Create', function() {
    let page: UserAdminPage;

    beforeEach(() => {
        page = new UserAdminPage();
    });

    it('should login successfully with right email and password', () => {
        page.login();
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
        let create = browser.findElement(protractor.By.cssContainingText('button', 'Create a New User'));
        create.click();
    });

    it('should input name, email, role and save the user and check its presence', () => {
        let name = browser.findElement(protractor.By.name('name'));
        let email = browser.findElement(protractor.By.name('email'));
        let user = browser.findElement(protractor.By.cssContainingText('option', 'User'));
        let admin = browser.findElement(protractor.By.cssContainingText('option', 'Admin'));
        let save = browser.findElement(protractor.By.cssContainingText('button', 'Save'));

        let cancel = browser.findElement(protractor.By.cssContainingText('button', 'Cancel'));

        //Create new user
        name.sendKeys('Elliot Alderson');
        email.sendKeys('elliot@funsociety.com');
        admin.click();
        save.click();

        cancel.click();

        //NOTE. clicking cancel with following config will cause save button to be clicked twice.
        //Go back to User List Page and check for the new user's presense
        //let cancel = browser.findElement(protractor.By.css('button[type=cancel]'));
        //cancel.click();

        //expect(page.getParagraphText("tbody tr:first-child > td:first-child")).toEqual('Elliot Alderson');

    });

    it('should logout when Logout link is clicked', () => {
        page.logout();
    });
});