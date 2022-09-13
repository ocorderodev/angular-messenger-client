import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  public user = new User('', '', '', '', '', '', '', '', '', false);
  public confirmPassword : String;
  public message : String;
  public state = false;
  public colors : String;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
  }

  register() {
    const name = this.user.name;
    const email = this.user.name;
    const password = this.user.password;

    if (name === "" || email === "" || password === "" || this.confirmPassword === "") {
      this.message = "Fields required";
      this.state = true;
      this.colors = "warning";
    } else if (password != this.confirmPassword) {
      this.message = "Password do not match";
      this.state = true;
      this.colors = "warning";
    } else {
      this.message = "Sending data...";
      this.state = true;
      this.colors = "info";
      this.userService.register(this.user).subscribe(
        (data) => {
          setTimeout(() => {
            this.message = "User created successfully";
            this.state = true;
            this.colors = "success";
          }, 1000)
        },
        (error) => {
          setTimeout(() => {
            this.message = error.error.message;
            this.state = true;
            this.colors = "danger";
          }, 1000);
        }
      );
    }
  }

}
