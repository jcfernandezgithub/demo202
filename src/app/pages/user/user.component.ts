import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as _ from "lodash";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  exists: Boolean;
  form: FormGroup;
  users: any;

  constructor(
    private user: UserService,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user.list().subscribe(response => {
      console.log(response)
      this.users = response;
    }, e => {
      console.log(e.error);
    });

    this.form = this.builder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.email]],
      role: ['', Validators.required]
    });

  }

  public create(form) {

  }

  public email(email) {
    this.auth.check(email).subscribe(response => {
      this.exists = true;
    }, e => {
      this.exists = false;
    });
  }

  check = _.debounce(() => this.email(this.form.value), 1000);

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
