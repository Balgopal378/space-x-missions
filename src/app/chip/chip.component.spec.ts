import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
    let component: ChipComponent;
    let fixture: ComponentFixture<ChipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ChipComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit year', () => {
        const spy = spyOn(component.yearFilterChanged, 'emit');
        component.onClick({ name: 'year' });
        expect(spy).toHaveBeenCalledWith({ name: 'year' });
    });

    it('should emit launch', () => {
        const spy = spyOn(component.launchFilterChanged, 'emit');
        component.onClick({ name: 'launch' });
        expect(spy).toHaveBeenCalledWith({ name: 'launch' });
    });

    it('should emit land', () => {
        const spy = spyOn(component.landingFilterChanged, 'emit');
        component.onClick({ name: 'land' });
        expect(spy).toHaveBeenCalledWith({ name: 'land' });
    });
});
