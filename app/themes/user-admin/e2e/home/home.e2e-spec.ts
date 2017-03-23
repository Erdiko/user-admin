import { UserAdminPage } from '../app.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('Home Page', function() {
    let page: UserAdminPage;

    beforeEach(() => {
        page = new UserAdminPage();
    });

    it('should login successfully with right email and password', () => {
        page.login();
    });

    it('should show the User Admin nav bar and its contents', () => {
        //Navbar shows
        expect(element(by.tagName("nav"))).toBeTruthy();

        expect(page.getParagraphText("nav ul > li:first-child > a")).toEqual('Home');
        expect(page.getParagraphText("nav ul > li:nth-child(2) > a")).toEqual('User List');
        expect(page.getParagraphText("nav ul > li:nth-child(3) > a")).toEqual('Users Event Log');
        expect(page.getParagraphText("nav ul > li:last-child > a")).toEqual('Logout');
    });

    it('should show the main body contents', () => {
        //Main Body shows
        expect(element(by.tagName("app-home"))).toBeTruthy();

        expect(page.getParagraphText("app-home ul > li:first-child > a")).toEqual('Create a User');
        expect(page.getParagraphText("app-home ul > li:nth-child(2) > a")).toEqual('User List');
        expect(page.getParagraphText("app-home ul > li:last-child > a")).toEqual('User Event Log');
    });

    it('should logout when Logout link is clicked', () => {
        page.logout();
    });
});

