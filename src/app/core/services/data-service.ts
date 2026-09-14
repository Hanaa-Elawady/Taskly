import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../enviroment';

@Service()
export class DataService {
    private http = inject(HttpClient);
    private url = environment.apiUrl;

    postPerAction(action: string, resource: any) {

    return this.http.post(this.url + action, resource)
        .pipe(
            catchError((error: HttpErrorResponse) => {
            return throwError(() => error);})
        );
    }
}
