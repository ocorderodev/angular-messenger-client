import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public user = new User('', '', '', '', '', '', '', '', '', false);
  public message : String;
  public state = false;
  public colors : String;
  public ACCESS_TOKEN = environment.ACCESS_TOKEN;
  public GUID = environment.IDENTIFY;

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  auth() {
    const email = this.user.email;
    const password = this.user.password;

    if (email === "" || password === "") {
      this.message = "Fields required";
      this.state = true;
      this.colors = "warning";
    } else {
      this.message = "Validate info...";
      this.state = true;
      this.colors = "warning";
      this.userService.auth(this.user).subscribe(
        (data) => {
          setTimeout(() => {
            this.message = "Login successfully";
            this.state = true;
            this.colors = "success";
            const TOKEN = data.access_token;
            const GUID = data.guid;
            localStorage.setItem(this.ACCESS_TOKEN, TOKEN);
            localStorage.setItem(this.GUID,JSON.stringify(GUID));
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
          }, 1000);
        },
        (error) => {
          setTimeout(() => {
            this.message = "Error in the login";
            this.state = true;
            this.colors = "danger";
          }, 1000);
        }
      );
    }
  }

}
