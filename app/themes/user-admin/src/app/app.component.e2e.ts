describe('App', function(){
    beforeEach(function(){
        browser.get('');
    });
    it('should have an app-root', function(){
        expect(element(by.css('app-header'))).isPresent().toEqual(true);
    });
});