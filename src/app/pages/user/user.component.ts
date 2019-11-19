import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  users: any;

  constructor(
    private user: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user.list().subscribe(response => {
      console.log(response)
      this.users = response;
    }, e => {
      console.log(e.error);
    });
  }

  public remove(id) {
    return this.user.remove(id).subscribe(response => {
      return this.showSuccess(response['message']);
    }, e => {
      console.log(e.error);
      return this.showError(e.error.message);
    });
  }

  public showSuccess(message) {
    return this.toastr.success(`${message}.`);
  }

  public showError(message) {
    return this.toastr.error(`${message}.`);
  }

}
