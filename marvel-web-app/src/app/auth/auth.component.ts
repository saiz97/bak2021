import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  activeFormSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.router.navigate(['favorites'])).unsubscribe();
    this.activeFormSubscription = this.authService.form.subscribe(formState => {
      if (formState === "login" || formState === "") this.isLoginMode = true;
      else this.isLoginMode = true;
    });
  }
}
