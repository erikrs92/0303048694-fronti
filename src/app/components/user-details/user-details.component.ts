import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../../models/user.model';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class userDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentuser: user = {
    username: '',
    email: '',
    status: false
  };

  message = '';

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getuser(this.route.snapshot.params['id']);
    }
  }

  getuser(id: string): void {
    this.UserService.get(id).subscribe({
      next: (data) => {
        this.currentuser = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      username: this.currentuser.username,
      email: this.currentuser.email,
      status: status,
      password: this.currentuser.password,
    };

    this.message = '';

    this.UserService.update(this.currentuser.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentuser.status = status;
        this.message = res.message
          ? res.message
          : 'Actualizado correctamente!';
      },
      error: (e) => console.error(e)
    });
  }

  updateuser(): void {
    this.message = '';

    this.UserService
      .update(this.currentuser.id, this.currentuser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteuser(): void {
    this.UserService.delete(this.currentuser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/users']);
      },
      error: (e) => console.error(e)
    });
  }

  editUser(userId: number) {
    this.router.navigate(['/users', userId]);
  }
  
}
