import { UserAdminPage } from './home.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('Home Page', function() {
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

    it('should show the User Admin nav bar and its contents', () => {
        //Navbar shows
        expect(element(by.tagName("nav"))).toBeTruthy();

        expect(page.getParagraphText("nav ul > li:first-child > a")).toEqual('Home');
        expect(page.getParagraphText("nav ul > li:nth-child(2) > a")).toEqual('User List');
        expect(page.getParagraphText("nav ul > li:last-child > a")).toEqual('Logout');
    });

    it('should show the main body contents', () => {
        //Main Body shows
        expect(element(by.tagName("app-home"))).toBeTruthy();

        expect(page.getParagraphText("app-home ul > li:first-child > a")).toEqual('Create a User');
        expect(page.getParagraphText("app-home ul > li:nth-child(2) > a")).toEqual('User List');
    });

    it('should logout when Logout link is clicked', () => {
        
        expect(element(by.css(".nav navbar-nav > li:last-child > a"))).toBeTruthy();
        //Logout is clicked

        let logout = browser.findElement(protractor.by.css('ul > li:last-child > a'));
        logout.click();

        expect(page.getParagraphText(".navbar-brand")).toEqual('User Admin');
    });
});

