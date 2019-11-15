import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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

  constructor(private auth: AuthService) { }

  ngOnInit() {

  }

  public signout() {
    return this.auth.signout();
  }

}
