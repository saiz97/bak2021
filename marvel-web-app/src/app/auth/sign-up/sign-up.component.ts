import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

import { MustMatch } from '../helpers/must-match.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;

  signupForm: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    } else {
      this.isLoading = true;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      let authObs: Observable<AuthResponseData>;
      authObs = this.authService.signup(email, password);

      authObs.subscribe(
        resData => {
          this.isLoading = false;
          this.router.navigate(['favorites']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );

      this.signupForm.reset();
    }
  }

  onSwitchMode() {
    this.router.navigate(['login']);
  }

}
