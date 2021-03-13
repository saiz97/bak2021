import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  activeFormSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.activeFormSubscription = this.authService.form.subscribe(formState => {
      if (formState === "signup" || formState === "") this.isLoginMode = false;
      else this.isLoginMode = true;
    });
  }


}
