import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user-services';
import { Router } from '@angular/router';
import { map, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-github-users-list',
  standalone: false,
  templateUrl: './github-users-list.component.html',
  styleUrl: './github-users-list.component.scss'
})

export class GithubUsersListComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  private loadUsers$ = new Subject<void>();

  
  currentPageData$ = this.loadUsers$.pipe(
    switchMap(() => 
      this.userService.fetchUsers().pipe(
        map(data => {
          this.isLoading = false;
          return data;
        })
      )
    )
  );
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.nextUrl = null;
    this.isLoading = true;
    this.currentPageData$.subscribe(users => {
      this.users.push(...users); 
    });
    this.loadUsers$.next();
  }

  onScroll = ()=>{
    this.isLoading = true;
    this.loadUsers$.next();
  }

  goToUserDetail(username: string) {
    this.router.navigate(['/github-user-details', username]);
  }
}