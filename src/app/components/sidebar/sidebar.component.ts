import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu = [
    {
      path: "admin",
      text: "admin"
    },
    {
      path: "user",
      text: "users"
    }
  ]

  constructor() { }

  ngOnInit() {

  }

}
