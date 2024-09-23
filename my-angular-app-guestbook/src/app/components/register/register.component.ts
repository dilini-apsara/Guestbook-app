import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';

  constructor(private router:Router,
              private authService:AuthService) {}


  ngOnInit(): void {
  }

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('User registered successfully!', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 409) {
          alert('This email is already registered. Please log in or use a different email.');
        } else {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
