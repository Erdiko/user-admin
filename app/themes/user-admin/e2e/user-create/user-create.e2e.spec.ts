// import { UserAdminPage } from './user-create.po';
// import { protractor, browser, element, by, WebElement } from 'protractor';

// describe('Login', function() {
//     let page: UserAdminPage;

//     beforeEach(() => {
//         page = new UserAdminPage();
//     });

//     it('should login successfully with right email and password', () => {
//         page.navigateTo();
//         let email = browser.findElement(protractor.By.name('email'));
//         let password = browser.findElement(protractor.By.name('password'));
//         let submit = browser.findElement(protractor.By.className('btn btn-default'));

//         email.sendKeys('foo@mail.com');
//         password.sendKeys('asdf1234');
        
//         submit.click();

//         expect(page.getParagraphText("app-home h1")).toEqual('Welcome to the Erdiko User Admin');
//     });

//     it('should lead to User List page at click of the User List link', () => {
//         //check for both User List Link
//         let userListNav = browser.findElement(protractor.by.css('nav ul > li:nth-child(2) > a'));
//         userListNav.click();
//     });


//     it('should logout when Logout link is clicked', () => {
        
//         expect(element(by.css(".nav navbar-nav > li:last-child > a"))).toBeTruthy();
//         //Logout is clicked

//         let logout = browser.findElement(protractor.by.css('ul > li:last-child > a'));
//         logout.click();

//         expect(page.getParagraphText(".navbar-brand")).toEqual('User Admin');
//     });
// });