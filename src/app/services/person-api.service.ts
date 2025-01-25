import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PersonApiService {
    private apiUrl = environment.API_URL;

    constructor(private http: HttpClient) {}

    fetchAll(params?: {
        term?: string;
        color?: string
    }): Observable<any> {
        let httpParams = new HttpParams();

        if(params?.term) {
            httpParams = httpParams.set('term', params.term.trim());
        }
        if(params?.color) {
            httpParams = httpParams.set('color', params.color.trim());
        }

        return this.http.get(`${this.apiUrl}/search`, { params: httpParams });
    }

    getPersonDetails(id: string): Observable<any> {
        const url = `${this.apiUrl}/details/${id}`;
        return this.http.get<any>(url);
    }
}