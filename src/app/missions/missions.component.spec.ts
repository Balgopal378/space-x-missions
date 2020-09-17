import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BehaviorSubject } from 'rxjs';
import { MockComponents } from 'ng-mocks';

import { MissionsComponent } from './missions.component';
import { ApiService } from '../services/api.service';
import { FiltersComponent } from '../filters/filters.component';
import { CardComponent } from '../card/card.component';

class MockActivatedRoute {
    queryParams = new BehaviorSubject<Params>({ 'test-page': 1 });
}

describe('MissionsComponent', () => {
    let component: MissionsComponent;
    let fixture: ComponentFixture<MissionsComponent>;
    let router: jasmine.SpyObj<Router>;
    const apiService = jasmine.createSpyObj(['getLaunches']);

    beforeEach(async () => {
        router = jasmine.createSpyObj(['navigate']);
        apiService.getLaunches.and.returnValue([{}]);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ MissionsComponent, MockComponents(FiltersComponent, CardComponent) ],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiService,
                },
                {
                    provide: Router,
                    useValue: router,
                },
                {
                    provide: ActivatedRoute,
                    useValue: new MockActivatedRoute(),
                },
            ],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(MissionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
