import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit {

  post = { title: '', content: '' };

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  createPost() {

    this.authService.createPost(this.post).subscribe(
      (response) => {
        alert('Post created successfully!');
        this.router.navigate(['/profile']); // Redirect to profile after post creation
      },
      (error) => {
        console.error('Failed to create post:', error);
      }
    );
  }


}
