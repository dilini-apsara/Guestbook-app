import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = { username: '', email: '' };

  constructor(private http: HttpClient,
              private authService:AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.http.get('/api/profile').subscribe((data: any) => {
      this.user = data.user;
    });
  }

  updateProfile(){
    this.authService.updateUsername(this.user.username).subscribe({
      next: (response) => {
        console.log('Username updated successfully!', response);
        alert('Username updated successfully!');
      },
      error: (err) => {
        console.error('Error updating username', err);
        alert('Error updating username');
      }
    });
  }


  deleteAccount() {
    this.http.delete('/api/profile').subscribe({
      next: (res) => alert('Account deleted successfully'),
      error: (err) => alert('Error deleting account')
    });
  }


}
