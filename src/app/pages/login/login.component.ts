import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  spinner: boolean = true;
  form: FormGroup;
  email_exists: Object = {
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
      this.router.navigate(['menu/admin']);
      this.hide_spinner();
    }, e => {
      this.showError(e.error.message)
      this.hide_spinner();
    });
  }

  public check_email(email) {
    this.auth.check(email).subscribe(response => {
      this.email_exists = response;
      console.log(response['success']);
    }, e => {
      this.email_exists = e.error;
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
