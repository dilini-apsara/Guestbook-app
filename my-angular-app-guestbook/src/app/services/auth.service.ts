import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // Backend API URL
  private apiUrl = 'http://localhost:4000/api';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }


  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  deleteAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.apiUrl}/users/delete`, {headers});
    } else {
      throw new Error('Token not available');
    }
  }



  updateUsername(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put(`${this.apiUrl}/users/profile`, {username}, {headers});
    } else {
      throw new Error('Token not available');
    }

  }


  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Set Authorization header
      return this.http.get(`${this.apiUrl}/users/profile`, {headers});
    } else {
      throw new Error('Token is not available');
    }
  }


  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

    // ------------ posts -----------------------------
  createPost(postData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/posts`, postData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getPosts(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deletePost(postId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


}
