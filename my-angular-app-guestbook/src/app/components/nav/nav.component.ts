import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
