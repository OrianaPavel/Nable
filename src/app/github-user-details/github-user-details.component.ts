import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repo } from '../shared/models/repo';
import { RepoService } from '../shared/services/repo-services';
import { BehaviorSubject, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-github-user-details',
  standalone: false,
  templateUrl: './github-user-details.component.html',
  styleUrl: './github-user-details.component.scss'
})
export class GithubUserDetailsComponent implements OnInit{

  username: string = '';
  currentPage$ = new BehaviorSubject<number>(1);
  hasNextPage$ = new BehaviorSubject<boolean>(false);

  currentPageData$ = this.currentPage$.pipe(
    switchMap((currentPage) =>
      this.repoService.fetchRepos(currentPage, this.username)
    )
  );

  constructor(
    private route: ActivatedRoute,
    private repoService: RepoService,
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.hasNextPage$ = this.repoService.hasNextPage$;
    this.currentPage$.next(1);
  }
  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
}
