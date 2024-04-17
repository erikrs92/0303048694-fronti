import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user.model';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class usersListComponent implements OnInit {
  users?: user[];
  currentuser: user = {};
  currentIndex = -1;
  username = '';

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.retrieveusers();
  }

  retrieveusers(): void {
    this.UserService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveusers();
    this.currentuser = {};
    this.currentIndex = -1;
  }

  setActiveuser(user: user, index: number): void {
    this.currentuser = user;
    this.currentIndex = index;
  }

  removeAllusers(): void {
    this.UserService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentuser = {};
    this.currentIndex = -1;

    this.UserService.findByTitle(this.username).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
