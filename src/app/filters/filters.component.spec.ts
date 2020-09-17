import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponents } from 'ng-mocks';

import { FiltersComponent } from './filters.component';
import { ChipComponent } from '../chip/chip.component';

class MockActivatedRoute {
    snapshot = {
        queryParamMap: {
            get: () => {}
        }
    };
}

describe('FiltersComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ FiltersComponent, MockComponents(ChipComponent) ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: new MockActivatedRoute(),
                },
            ],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

