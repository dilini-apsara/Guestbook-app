import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = 'some one';
  posts: any[] = [];

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.authService.getProfile().subscribe(user => {
        this.username = user.username;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
    this.loadPosts();

  }

  updateUsername() {
    this.authService.updateUsername(this.username).subscribe(response => {
        this.username = '';
      },
      (error) => {
        console.error('Error updating username:', error);
        alert('Failed to update username. Please try again.');
      }
    );
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteAccount().subscribe(() => {
          alert('Account deleted');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error deleting account:', error);
          alert('Failed to delete account. Please try again.');
        }
      );
    }
  }

  loadPosts() {
    this.authService.getPosts().subscribe(
      (response) => {
        this.posts = response.posts;
      },
      (error) => {
        console.error('Failed to load posts:', error);
      });
  }

  deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.authService.deletePost(postId).subscribe(
        () => {
          alert('Post deleted successfully!');
          this.posts = this.posts.filter(post => post._id !== postId);
        },
        (error) => {
          console.error('Failed to delete post:', error);
        }
      );
    }
  }

}
