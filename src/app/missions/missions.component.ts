import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LaunchDetail } from '../models/launch-detail';
import { ApiService } from '../services/api.service';
import { SearchParams } from '../enums/search-params.enum';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();
    @Input() launchList: LaunchDetail[];

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: Params) => {
                if (params && Object.keys(params).length > 0) {
                    this.loadMissions(params);
                } else {
                    this.loadMissions();
                }
            });
    }

    private loadMissions(filters?: Params) {
        this.apiService.getLaunches(filters).pipe(takeUntil(this.destroy$)).subscribe((data: LaunchDetail[]) => {
            this.launchList = data;
        });
    }

    private navigate(route: any[], queryParams: { [key: string]: any }) {
        queryParams = this.encodeQueryParam(queryParams);
        this.router.navigate(route, {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    private encodeQueryParam(params: { [key: string]: string | number | boolean }): { [key: string]: string | number | boolean } {
        const encodedQueryParams = {};
        if (params) {
            if (params.name === 'year' ) {
                encodedQueryParams[SearchParams.year] = params.value;
            }
            if (params.name === 'launch') {
                encodedQueryParams[SearchParams.launch] = params.value;
            }
            if (params.name === 'land') {
                encodedQueryParams[SearchParams.land] = params.value;
            }
        }
        return encodedQueryParams;
    }

    onYearFilterChange(val: {[key: string]: string}) {
        this.navigate([], val);

    }

    onLaunchFilterChange(val: {[key: string]: string}) {
        this.navigate([], val);
    }

    onLandingFilterChange(val: {[key: string]: string}) {
        this.navigate([], val);
    }

    ngOnDestroy(){
        this.destroy$.next();
        this.destroy$.complete();
    }

}
