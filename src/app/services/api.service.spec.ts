import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { LaunchDetail } from '../models/launch-detail';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ApiService,
            ],
        });
        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Get launch details', () => {
        const responseData: LaunchDetail[] = [{} as LaunchDetail];

        it('should return the list of launch details as per the queryparams provided', () => {
            service.getLaunches().subscribe((data: LaunchDetail[]) => {
                expect(data).toEqual(responseData);
            });
            const req = httpMock.expectOne((request) => request.url === `${service.baseUrl}`);
            expect(req.request.method).toBe('GET');
            req.flush(responseData);
        });

        it('should throw an error if returned by the api', () => {
            const apiError = { code: '400', message: 'Bad Request' };
            service.getLaunches().subscribe(
                () => {},
                (err: {[key: string]: string | number}) => {
                    expect(err.status).toEqual(Number(apiError.code));
                    expect(err.statusText).toEqual(apiError.message);
                }
            );
            const req = httpMock.expectOne((request) => request.url === `${service.baseUrl}`);
            expect(req.request.method).toBe('GET');
            req.flush(apiError, { status: 400, statusText: 'Bad Request' });
        });
    });
});
