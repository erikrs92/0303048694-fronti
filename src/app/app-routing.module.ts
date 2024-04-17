import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usersListComponent } from './components/users-list/users-list.component';
import { userDetailsComponent } from './components/user-details/user-details.component';
import { AdduserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: usersListComponent },
  { path: 'users/:id', component: userDetailsComponent },
  { path: 'add', component: AdduserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
