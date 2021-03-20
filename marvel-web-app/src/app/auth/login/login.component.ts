import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authService.form.next('login');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      authObs = this.authService.login(email, password);

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

      this.loginForm.reset();
    }

  }

  onSwitchMode() {
    this.authService.form.next('signup');
  }

}
