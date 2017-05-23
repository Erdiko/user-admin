import { UserAdminPage } from '../app.po';
import { protractor, browser, element, by, WebElement } from 'protractor';

describe('User List Page', function() {
    let page: UserAdminPage;

    beforeEach(() => {
        page = new UserAdminPage();
    });

    it('should login successfully with right email and password', () => {
        page.login();
    });

    it('should have both link in navbar and body content lead to User List page', () => {
        //check User Link in Nav bar
        page.goToUserList();

        //go back to home page
        let home = browser.findElement(protractor.by.css('app-header ul > li:first-child > a'));
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

    //For the pagination to work, the e2e test should have more than 10 users in the user-list
    //If there are less than 10 users in the list, Please refer to user-admin/scripts/sql/create-e2e-user.sql
    it('should check for pagination', () => {

        //check for active class on Page 1
        expect(element(by.id('page1')).getAttribute('class')).toMatch("active");

        //If there is more than 10 users for pagination to take effect..
        element(by.css("a[aria-label=Next]")).isPresent().then(displayed => {


            if (displayed) {
                let first = browser.findElement(protractor.By.cssContainingText('.pagination a', '1'));
                let second = browser.findElement(protractor.By.cssContainingText('.pagination a', '2'));

                //browser.findElement(protractor.By.css('#page1'));
                let firstli = element(by.id('page1'));
                let secondli = element(by.id('page2'));

                let next = browser.findElement(protractor.By.css('a[aria-label=Next]'));
        
                // go to page 2
                next.click(); 
                expect(secondli.getAttribute('class')).toMatch("active");

                let prev = browser.findElement(protractor.By.css('a[aria-label=Previous]'));

                // go back to page 1
                prev.click();
                expect(firstli.getAttribute('class')).toMatch("active");

                //Click on <a>2</a>
                second.click();
                expect(secondli.getAttribute('class')).toMatch("active");

                //Click on <a>1</a>
                first.click();
                expect(firstli.getAttribute('class')).toMatch("active");
            }

        }); 

    });

    it('should check for sort function', () => {
        //get the id of the first user in column
        let latestID = page.getParagraphText("tbody > tr:first-child > th");

        //click the sort column
        let sortid = browser.findElement(protractor.By.css('thead th:first-child'));
        sortid.click();

        //Get the lowestID that floated to the top.
        let firstID = page.getParagraphText("tbody > tr:first-child > th");

        //click the sort column again to reset to 'desc' order
        sortid.click();

        //The latestID should be the same
        expect(page.getParagraphText("tbody > tr:first-child > th")).toEqual(latestID);

        //The latestID and firstID should not match
        expect(page.getParagraphText("tbody > tr:first-child > th")).not.toEqual(firstID);
        
    });

    it('should delete the user that is created in the user-create test', () => {
        let deleteID = page.getParagraphText("tbody > tr:first-child > th");

        browser.executeScript("document.body.className += ' notransition';");

        //the user that is to be deleted
        expect(page.getParagraphText("tbody tr:first-child > .user_name")).toEqual('Sam Sepiol');

        let deleteUser = browser.findElement(protractor.By.css('tbody tr:first-child .btn-danger'));
        deleteUser.click();

        //Check for modal's showing
        expect(page.getParagraphText(".modal-header > h4")).toEqual('Delete?');

        let deleteUserConfirm = browser.findElement(protractor.By.cssContainingText('.modal-body .btn-danger', 'Confirm'));
        deleteUserConfirm.click();

        //Wait for the browser to register the newly updated list
        browser.waitForAngular();
        //deleteID should now be deleted and no longer present
        expect(page.getParagraphText("tbody tr:first-child > .user_id")).not.toEqual(deleteID);

        expect(page.getParagraphText("app-message .alert-success")).toEqual('User successfully deleted');

    });

});