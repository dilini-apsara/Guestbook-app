import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent  {

  post = { title: '', content: '' };

  constructor(private authService: AuthService,
              private router: Router) {}

  createPost() {
    this.authService.createPost(this.post).subscribe(
      (response) => {
        alert('Post created successfully!');
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Failed to create post:', error);
      }
    );
  }


}
