/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ 
                HeaderComponent 
            ],
            imports: [
                HttpModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: AuthService, 
                    useClass: MockAuthService
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
        expect(compiled.querySelectorAll('ul li').length).toBe(3);
    });

});
