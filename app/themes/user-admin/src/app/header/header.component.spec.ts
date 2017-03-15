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
                AuthService,
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

    it('should display an ul element with 3 links', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        console.log(compiled);

        expect(compiled.querySelectorAll('ul')).toBeTruthy();
        expect(compiled.querySelectorAll('ul li').length).toBe(3);
    });

});
