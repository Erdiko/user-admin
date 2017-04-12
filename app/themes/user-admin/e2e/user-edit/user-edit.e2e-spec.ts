import { UserAdminPage } from '../app.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('User Edit Page', function() {
    let page: UserAdminPage;

    beforeEach(() => {
        page = new UserAdminPage();
    });

    it('should login successfully with right email and password', () => {
        page.login();
    });

    it('should lead to User List page at click of the User List link', () => {
        //Click UserList in Nav to get to UserList Page
        page.goToUserList();
    });

    //this test should lead to the user created inside the user-create e2e test    
    it('should lead to individual user edit page at click of EDIT', () => {

        let edit = browser.findElement(protractor.By.css('tbody tr:first-child > .user_edit > a'));
        edit.click();

        //check for content of edit page
        expect(element(by.id('user-edit'))).toBeTruthy();

    });

    it('should change name, email and role of the user ', () => {

        let name = browser.findElement(protractor.By.name('name'));
        let email = browser.findElement(protractor.By.name('email'));
        let user = browser.findElement(protractor.By.cssContainingText('option', 'User'));
        let admin = browser.findElement(protractor.By.cssContainingText('option', 'Admin'));
        let save = browser.findElement(protractor.By.css('#user-edit .btn.btn-success'));
        let cancel = browser.findElement(protractor.By.css('#user-edit .btn.btn-warning'));

        name.clear();
        name.sendKeys('Sam Sepiol');

        email.clear();
        email.sendKeys('sam@sepiol.com');
        
        user.click();
        save.click()

        //user is successfully edited
        expect(element(by.className('alert alert-success'))).toBeTruthy();

        //cancel is clicked to go back to the user list to check for updated content
        cancel.click();

        //Wait for the browser to register the newly updated Username in the list
        browser.waitForAngular();
        expect(page.getParagraphText("tbody tr:first-child > .user_name")).toEqual('Sam Sepiol'); 

    });

    it('should update the password', () => {

        //Go to User Edit Page
        let edit = browser.findElement(protractor.By.css('tbody tr:first-child > .user_edit > a'));
        edit.click();

        let updatePasswordTab = browser.findElement(protractor.By.css('.nav-tabs > li:last-child'));
        //let updatePassword = browser.findElement(protractor.By.css('.nav-item:last-child > a'));
        let updatePasswordContent = browser.findElement(protractor.By.css('.tab-content > .tab-pane:last-child'));

        //Currently, Update User is not displayed
        expect(updatePasswordContent.isDisplayed()).toBeFalsy();

        updatePasswordTab.click();

        //Now, Update User is displayed.
        expect(updatePasswordContent.isDisplayed()).toBeTruthy();

        let password = browser.findElement(protractor.By.name('password'));
        let confirm = browser.findElement(protractor.By.name('confirm'));

        password.sendKeys('MrRob0t');
        confirm.sendKeys('MrRob0t');

        //Wait for the Update Password Button to be enabled.
        browser.waitForAngular();

        let passwordSave = browser.findElement(protractor.By.css('#user-password-change .btn-success'));
        passwordSave.click();

    });
    
    it('should logout when Logout link is clicked', () => {
        page.logout();
    });

    it('should login with updated user credentials', () => {
        page.loginWithUpdated("MrRob0t");
    });
});