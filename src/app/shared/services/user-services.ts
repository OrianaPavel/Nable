import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Constants } from '../constants';
import { User } from '../models/user';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    nextUrl: string | null = null;

    constructor(private http: HttpClient) { }

    private parseLinkHeader(header: string): string | null {
        let match = header.match(Constants.NEXT_PAGE_PATTERN);
        return match ? match[0] : null;
    }

    fetchUsers(): Observable<User[]> {
        var requestUrl = this.nextUrl == null ? `${Constants.BASE_URL}?per_page=${Constants.ITEMS_PER_PAGE}` : this.nextUrl;

        if (!requestUrl) {
            return of<User[]>([]);
        }

        return this.http.get<HttpResponse<any>>(requestUrl, {
            observe: 'response',
            headers: new HttpHeaders({
                'Authorization': 'Bearer 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'
            })
        })
            .pipe(
                tap((response) => {
                    let linkHeader = response.headers.get('Link');
                    this.nextUrl = linkHeader ? this.parseLinkHeader(linkHeader) : '';
                }),
                map((response) => {
                    let users: any[] = Array.isArray(response.body) ? response.body : [];
                    return users.map(u => ({
                        id: u.id,
                        username: u.login,
                        avatar_url: u.avatar_url,
                        type: u.type,
                        html_url: u.html_url,
                    }))
                })
            );
    }

}

