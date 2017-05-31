/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpModule }               from '@angular/http';

import { AppComponent }         from './app.component';
import { HeaderComponent }      from './header/header.component';
import { AuthService }          from './shared/auth.service';
import { UsersService }         from './shared/users.service';
import { UserResolve }          from './shared/user-resolve.service';

describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
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
            ],
            schemas:  [CUSTOM_ELEMENTS_SCHEMA]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        const compiled = fixture.debugElement.nativeElement;
        expect(app).toBeTruthy();
    }));

    it('should include and render the header component', async(() => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('app-header')).toBeTruthy();
    }));

    it('should include and render a router outlet', async(() => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('router-outlet')).toBeTruthy();
    }));

});
