import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it(`should have as title 'SpaceX Launch Programs'`, () => {
        expect(app.title).toEqual('SpaceX Launch Programs');
    });

    it('should render title', () => {
        TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.wrapper header h1').textContent).toContain('SpaceX Launch Programs');
    });

    it(`should have autor as 'Balgopal Prusty'`, () => {
        expect(app.author).toEqual('Balgopal Prusty');
    });

    it('should render author', () => {
        TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('footer').textContent).toContain('Developed by: Balgopal Prusty');
    });
});
