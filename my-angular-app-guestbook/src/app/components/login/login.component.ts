import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router,
             private authService:AuthService) {}


  onSubmit() {
    const credentials={
      email:this.email,
      password:this.password
    };

    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful! ', response);
        localStorage.setItem('token', response.token);

        this.router.navigate(['/profile']); // Redirect after login
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    );

  }
  ngOnInit(): void {
  }

  registration() {
    this.router.navigate(['/register'])
  }

  // onSubmit(){
  //   this.authService.login(this.email, this.password).subscribe(response => {
  //     // Store both the token and the username
  //     localStorage.setItem('token', response.token);
  //     localStorage.setItem('username', response.user.username);  // Store the username
  //     this.router.navigate(['/profile']);
  //   }, error => {
  //     console.error('Login failed', error);
  //   });
  // }


}
