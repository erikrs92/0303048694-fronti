import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdduserComponent } from './components/add-user/add-user.component';
import { userDetailsComponent } from './components/user-details/user-details.component';
import { usersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    userDetailsComponent,
    usersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
