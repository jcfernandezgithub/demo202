import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  administration = [
    {
      path: "user",
      text: "Users",
      icon: "fas fa-user-tie"
    },
    {
      path: "admin",
      text: "Clients",
      icon: "far fa-user"
    },
    {
      path: "admin",
      text: "Roles",
      icon: "fas fa-user-tag"
    },
    {
      path: "admin",
      text: "Services",
      icon: "fas fa-archway"
    },
    {
      path: "user",
      text: "invoice",
      icon: "fas fa-file-invoice fa-lg"
    }
  ]

  account = [
    {
      text: "sign out",
      icon: "fas fa-sign-out-alt"
    }
  ]

  constructor(
    private auth: AuthService,
    private router: Router) { }

  public signout() {
    this.router.navigate(['/login']);
    return this.auth.signout();
  }

}
