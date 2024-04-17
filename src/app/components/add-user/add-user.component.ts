import { Component } from '@angular/core';
import { user } from '../../models/user.model';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AdduserComponent {
  user: user = {
    username: '',
    email: '',
    status: false
  };
  submitted = false;

  constructor(private UserService: UserService) {}

  saveuser(): void {
    const data = {
      username: this.user.username,
      email: this.user.email,
      status: this.user.status,
      password: this.user.password
    };

    this.UserService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newuser(): void {
    this.submitted = false;
    this.user = {
      username: '',
      email: '',
      status: false
    };
  }
}
