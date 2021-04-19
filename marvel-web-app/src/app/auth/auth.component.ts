import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  userSubscribtion: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.router.url.includes("login")) {
      this.isLoginMode = true;
    } else if(this.router.url.includes("signup")) {
      this.isLoginMode = false;
    } else {
      this.router.navigate(['home']);
    }

    this.userSubscribtion = this.authService.user.subscribe(user => {
      console.log("user: ", user)
      // this.router.navigate(['favorites'])
    });
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }
}
