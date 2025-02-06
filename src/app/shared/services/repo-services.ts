import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Constants } from '../constants';

import { Repo } from '../models/repo';


@Injectable({
    providedIn: 'root',
})
export class RepoService {
    hasNextPage$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    fetchRepos(page: number, username: string): Observable<Repo[]> {
        var requestUrl = `${Constants.BASE_URL}/${username}/repos?per_page=${Constants.ITEMS_PER_PAGE}&page=${page}`;
        return this.http.get<HttpResponse<any>>(requestUrl, { 
            observe: 'response',
            headers: new HttpHeaders({
                'Authorization': 'Bearer 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'
            })
         })
            .pipe(
                tap((response) => {
                    let linkHeader = response.headers.get('Link') ?? '';
                    this.hasNextPage$.next(linkHeader.match(Constants.NEXT_PAGE_PATTERN) !== null);
                }),
                map((response) => {
                    let users: any[] = Array.isArray(response.body) ? response.body : [];
                    return users.map(u => ({ 
                        id: u.id,
                        name: u.name,
                        avatar_url: u.avatar_url, 
                        description: u.description,
                        html_url: u.html_url, 
                    }))
                })
            );
    }
}

