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

    prevQueryParam = {
        launch_year: null,
        launch_success: null,
        land_success: null
    };

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
        queryParams = this.remeberLastQuery(this.encodeQueryParam(queryParams));
        // queryParams = this.encodeQueryParam(queryParams);
        this.router.navigate(route, {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    private encodeQueryParam(params: { [key: string]: string }): { [key: string]: string } {
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

    private remeberLastQuery(params: { [key: string]: string }) {

        const updatedParam = { ...this.prevQueryParam, ...params };
        if (params.launch_year === this.prevQueryParam.launch_year) {
            updatedParam.launch_year = null;
            this.prevQueryParam.launch_year = null;
        } else {
            this.prevQueryParam.launch_year = updatedParam.launch_year;
        }

        if (params.launch_success === this.prevQueryParam.launch_success) {
            updatedParam.launch_success = null;
            this.prevQueryParam.launch_success = null;
        } else {
            this.prevQueryParam.launch_success = updatedParam.launch_success;
        }

        if (params.land_success === this.prevQueryParam.land_success) {
            updatedParam.land_success = null;
            this.prevQueryParam.land_success = null;
        } else {
            this.prevQueryParam.land_success = updatedParam.land_success;
        }
        return updatedParam;
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
