import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface check_email {
  success: Boolean,
  message: String
}
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  spinner: boolean = true;

  form: FormGroup;

  email_exists: check_email = {
    success: false,
    message: 'Provide valid email'
  };

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public async reset(form) {
    this.show_spinner();
    const reset = await this.auth.reset(form);

    reset.subscribe(response => {
      console.log(response);
      this.hide_spinner();
      this.showSuccess(response['message']);
    }, e => {
      console.log(e.error);
      this.hide_spinner();
      this.showError(e.error.message);
    });
  }

  public check_email(email) {
    this.auth.check(email).subscribe(response => {
      this.email_exists = response as check_email;
    }, e => {
      this.email_exists = e.error as check_email;
    });
  }

  public check = _.debounce(() => this.check_email(this.form.value), 1000);

  public show_spinner() {
    return this.spinner = false;
  }

  public hide_spinner() {
    return this.spinner = true;
  }

  public showSuccess(message) {
    return this.toastr.success(`${message}.`);
  }

  public showError(message) {
    return this.toastr.error(`${message}.`);
  }

}
