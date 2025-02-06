import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-users-list',
  standalone: false,
  templateUrl: './github-users-list.component.html',
  styleUrl: './github-users-list.component.scss'
})

export class GithubUsersListComponent implements OnInit {
  users: User[] = [];
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.nextUrl = null;
    this.appendUsers();
  }

  appendUsers = ()=>{
    if (this.isLoading) return; 
    this.isLoading = true;

    this.userService.fetchUsers().subscribe({
      next: (data) => {
        this.users.push(...data); 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error appending users:', err);
        this.isLoading = false;
      }
    });
  }

  onScroll = ()=>{
    this.appendUsers();
  }

  goToUserDetail(username: string) {
    this.router.navigate(['/github-user-details', username]);
  }
}