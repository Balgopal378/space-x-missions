import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpParameterCodec } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LaunchDetail } from '../models/launch-detail';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private readonly baseUrl = environment.config.apiUrl;

    constructor(private readonly http: HttpClient) { }

    private readonly handleError = (response: HttpErrorResponse): Observable<never> => {
        const apiError = { ...response };
        return throwError(apiError);
    }

    getLaunches(filters = {}, limit = 100): Observable<LaunchDetail[]> {
        const params = this.createQueryParams({
            ...filters,
            limit,
        });
        return this.http.get<LaunchDetail[]>(`${this.baseUrl}`, { params }).pipe(catchError(this.handleError));
    }

    /**
     * Creates HTTP Query Params
     *
     * @param params An object representing the query parameters to be created
     * @returns A set of HTTP parameters
     */
    private createQueryParams(params: { [key: string]: string | number | boolean }): HttpParams {
        let httpParams = new HttpParams();
        for (const [name, value] of Object.entries(params)) {
            try {
                const stringValue = value.toString();
                if (stringValue !== '') {
                    httpParams = httpParams.append(name, stringValue);
                }
            } catch {}
        }
        return httpParams;
    }
}
