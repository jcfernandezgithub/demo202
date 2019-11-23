import * as _ from "lodash";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface check_email {
  success: Boolean,
  message: String
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  spinner: boolean = true;
  form: FormGroup;
  email_exists: check_email = {
    success: false,
    message: 'Provide valid email'
  };

  passwordType: String = "password";
  passwordIcon: String = "far fa-eye-slash";

  constructor(
    private auth: AuthService,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async signin(form) {
    this.show_spinner();
    const session = await this.auth.signin(form);
    session.subscribe(response => {
      sessionStorage.setItem('session', JSON.stringify(response));
      this.router.navigate(['menu/user']);
      this.hide_spinner();
    }, e => {
      this.showError(e.error.message)
      this.hide_spinner();
    });
  }

  public check_email(email) {
    this.auth.check(email).subscribe(response => {
      this.email_exists = response as check_email;
      console.log(response['success']);
    }, e => {
      this.email_exists = e.error as check_email;
      console.log(this.email_exists)
    });
  }

  check = _.debounce(() => this.check_email(this.form.value), 1000);

  public show_spinner() {
    return this.spinner = false;
  }

  public hide_spinner() {
    return this.spinner = true;
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'far fa-eye-slash' ? 'far fa-eye' : 'far fa-eye-slash';
  }

  public showSuccess(message) {
    return this.toastr.success(`${message}.`);
  }

  public showError(message) {
    return this.toastr.error(`${message}.`);
  }

}
