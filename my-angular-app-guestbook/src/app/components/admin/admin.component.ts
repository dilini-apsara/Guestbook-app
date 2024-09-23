import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
    this.loadPosts();
  }

  loadUsers() {
    this.http.get('/api/admin/users').subscribe((data: any) => {
      this.users = data;
    });
  }

  loadPosts() {
    this.http.get('/api/admin/posts').subscribe((data: any) => {
      this.posts = data;
    });
  }

  deleteUser(userId: string) {
    this.http.delete(`/api/admin/users/${userId}`).subscribe(() => {
      this.loadUsers();
    });
  }

  deletePost(postId: string) {
    this.http.delete(`/api/admin/posts/${postId}`).subscribe(() => {
      this.loadPosts();
    });
  }

}
