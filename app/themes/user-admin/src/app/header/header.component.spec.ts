/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router, ROUTER_PROVIDERS } from "@angular/router";

import { HttpModule }               from '@angular/http';

import { AuthService }     from '../shared/auth.service';
import { UsersService }    from '../shared/users.service';
import { UserResolve }     from '../shared/user-resolve.service';

import { HeaderComponent } from './header.component';

class MockAuthService extends AuthService {
    isLoggedIn() {
        return false;
    }
}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    let router: any;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ 
                HeaderComponent 
            ],
            imports: [
                HttpModule
            ],
            providers: [
                {
                    provide: AuthService, 
                    useClass: MockAuthService
                },
                {
                    provide: Router, 
                    useClass: class { navigate = jasmine.createSpy("navigate"); } 
                },
                UsersService,
                UserResolve
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display an navbar', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('.navbar.navbar-inverse')).toBeTruthy();
    });

    it('should display an ul element with 0 links when notlogged in', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('ul')).toBeTruthy();
        expect(compiled.querySelectorAll('ul li').length).toBe(0);
    });


    it('should display an ul element with 3 links when logged in', () => {
        
        /*
         * Get the mocked service here from our fixture
         * and add a spyOn over-ride to pretend we have
         * a logged in user.
         */
        let service = fixture.debugElement.injector.get(AuthService);
        spyOn(service, 'isLoggedIn').and.returnValue(true);

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('ul')).toBeTruthy();
        expect(compiled.querySelectorAll('ul li').length).toBe(4);
    });

    it('should navigate to /login when clickLogout is fired', () => {

        let service = fixture.debugElement.injector.get(AuthService);
        spyOn(service, 'isLoggedIn').and.returnValue(true);

        let router = fixture.debugElement.injector.get(Router);

        component.clickLogout();

        expect(router.navigate).toHaveBeenCalledWith(["/login"]);
    });

});
