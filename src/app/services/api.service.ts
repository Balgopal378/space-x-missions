import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LaunchDetail } from '../models/launch-detail';

/**
 * Provider for performing API requests
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
    /**
     * The base spaceX URL
     */
    baseUrl = environment.config.apiUrl;

    /**
     * The constructor to initalze the class
     *
     * @param http Service to perform HTTP requests
     */
    constructor(private readonly http: HttpClient) { }

    /**
     * Convert HttpErrorResponse into an ApiError
     *
     * @param response The HttpErrorResponse to convert
     * @returns An ApiError representing the provided response
     */
    private readonly handleError = (response: HttpErrorResponse): Observable<never> => {
        const apiError = { ...response };
        return throwError(apiError);
    }

    /**
     * Fetches the launch details
     *
     * @param filters The filters applied by the user
     * @param limit The number of records to return
     * @returns An observable of launch details
     */
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
