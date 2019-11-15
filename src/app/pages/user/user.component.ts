import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any;

  constructor(
    private user: UserService,
  ) { }

  ngOnInit() {
    this.user.list().subscribe(response => {
      console.log(response)
      this.users = response;
    }, e => {
      console.log(e.error);
    });
  }

}
