import { UserAdminPage } from '../app.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('User List Page', function() {
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
        //check User Link in Nav bar
        let userListNav = browser.findElement(protractor.by.css('nav ul > li:nth-child(2) > a'));
        userListNav.click();

        //go back to home page
        let home = browser.findElement(protractor.by.css('nav ul > li:first-child > a'));
        home.click()

        //check User Link in Body
        let userListBody = browser.findElement(protractor.by.css('app-home ul > li:nth-child(2) > a'));
        userListBody.click();
    });

    it('should show the user list table header', () => {

        //check for table header
        expect(page.getParagraphText("thead th:first-child")).toEqual('ID');
        expect(page.getParagraphText("thead th:nth-child(2)")).toEqual('User Name');
        expect(page.getParagraphText("thead th:nth-child(3)")).toEqual('Role');
        expect(page.getParagraphText("thead th:nth-child(4)")).toEqual('Last Login');
        expect(page.getParagraphText("thead th:nth-child(5)")).toEqual('Joined');
        expect(page.getParagraphText("thead th:nth-child(6)")).toEqual('Edit');
        expect(page.getParagraphText("thead th:last-child")).toEqual('Delete');

    });

    it('should check for pagination', () => {

        //check for active class on Page 1
        expect(element(by.css("ul.pagination > li:first-child")).
            getAttribute('class')).toMatch("active");

        //If there is more than 10 users for pagination to take effect..
        element(by.css("a[aria-label=Next]")).isPresent().then(displayed => {


            if (displayed) {
                let first = browser.findElement(protractor.By.cssContainingText('.pagination a', '1'));
                let second = browser.findElement(protractor.By.cssContainingText('.pagination a', '2'));

                let next = browser.findElement(protractor.By.css('a[aria-label=Next]'));
        
                next.click(); 

                //check for active class on Page 2
                expect(element(by.css("ul.pagination > li:last-child")).
                    getAttribute('class')).toMatch("active");

                let prev = browser.findElement(protractor.By.css('a[aria-label=Previous]'));

                prev.click(); //Back to Page 1

                //Click on <a>2</a>
                second.click();
                expect(element(by.css("ul.pagination > li:last-child")).
                    getAttribute('class')).toMatch("active");

                //Click on <a>1</a>
                first.click();
                expect(element(by.css("ul.pagination > li:first-child")).
                getAttribute('class')).toMatch("active");

            }
 
        }); 

    });

    it('should check for sort function', () => {
        //get the id of the first item in column to not be 1
        expect(page.getParagraphText("tbody th:first-child")).not.toBe('1');

        //click the sort column
        let id = browser.findElement(protractor.By.css('thead th:first-child'));
        id.click();

        //get the id of the new first item in column to be 1
        expect(page.getParagraphText("tbody th:first-child")).toEqual('1');

        //click the sort column again to reset to 'desc' order
        id.click();
        
    });

    /**** NOTE ****/
    //Had trouble finally testing the delete user function.
    //Suspicion goes to interferance by modal animation.
    //Manual test successfully deletes the user.

});