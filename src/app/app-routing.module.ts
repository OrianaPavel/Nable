import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubUsersListComponent } from './github-users-list/github-users-list.component';
import { GithubUserDetailsComponent } from './github-user-details/github-user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'github-users-list', pathMatch: 'full' },
  { path: 'github-users-list', component: GithubUsersListComponent },
  { path: 'github-user-details/:username', component: GithubUserDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
