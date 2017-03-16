import { UserAdminPage } from './user-edit.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('User Edit Page', function() {
    let page: UserAdminPage;

    beforeEach(() => {
        page = new UserAdminPage();
    });

    it('should login successfully with right email and password', () => {
        page.navigateTo();
        let email = browser.findElement(protractor.By.name('email'));
        let password = browser.findElement(protractor.By.name('password'));
        let submit = browser.findElement(protractor.By.className('btn btn-success'));

        email.sendKeys('foo@mail.com');
        password.sendKeys('asdf1234');
        
        submit.click();

        expect(page.getParagraphText("app-home h1")).toEqual('Welcome to the Erdiko User Admin');
    });

    it('should lead to User List page at click of the User List link', () => {
        //Click UserList in Nav to get to UserList Page
        let userListNav = browser.findElement(protractor.by.css('nav ul > li:nth-child(2) > a'));
        userListNav.click();
    });

    //this test should lead to the user created inside the user-create e2e test    
    it('should lead to individual user edit page at click of EDIT', () => {

        let edit = browser.findElement(protractor.By.css('tbody tr:first-child a'));
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

        //check the user list for updated content
        cancel.click();

        browser.manage().timeouts().pageLoadTimeout(5000);
        expect(page.getParagraphText("tbody tr:first-child td")).toEqual('Sam Sepiol'); 

    });

    it('should update the password', () => {
        let edit = browser.findElement(protractor.By.css('tbody tr:first-child a'));
        edit.click();

        //check for content of edit page
        expect(element(by.id('user-edit'))).toBeTruthy();

        let updatePassword = browser.findElement(protractor.By.cssContainingText('button', 'Update Password'));
        updatePassword.click();


        let password = browser.findElement(protractor.By.name('password'));
        let confirm = browser.findElement(protractor.By.name('confirm'));

        password.sendKeys('MrRob0t');
        confirm.sendKeys('MrRob0t');

        let passwordSave = browser.findElement(protractor.By.css('#user-edit .btn.btn-success'));
        passwordSave.click();

        expect(element(by.className('alert alert-success'))).toBeTruthy();

    });
    
    it('should logout when Logout link is clicked', () => {
        
        expect(element(by.css(".nav navbar-nav > li:last-child > a"))).toBeTruthy();
        
        //Logout is clicked
        let logout = browser.findElement(protractor.by.css('ul > li:last-child > a'));
        logout.click();

        expect(page.getParagraphText(".navbar-brand")).toEqual('User Admin');
    });

});