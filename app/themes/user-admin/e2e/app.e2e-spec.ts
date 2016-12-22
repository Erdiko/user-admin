import { UserAdminPage } from './app.po';

describe('user-admin App', function() {
  let page: UserAdminPage;

  beforeEach(() => {
    page = new UserAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
