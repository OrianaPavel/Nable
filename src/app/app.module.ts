import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubUsersListComponent } from './github-users-list/github-users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollDirective  } from 'ngx-infinite-scroll';
import { GithubUserDetailsComponent } from './github-user-details/github-user-details.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GithubUsersListComponent,
    GithubUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollDirective,
    CommonModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
