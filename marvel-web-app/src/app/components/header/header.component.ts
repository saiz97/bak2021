import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalConstants } from '../../shared/global.variables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  marvel: string;
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(private globals: GlobalConstants, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.marvel = this.globals.MARVEL_URL;

    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("Authenticated: ", this.isAuthenticated, !!user);
    });
  }

  onAuth() {
    if (!this.isAuthenticated) {
      this.router.navigate(['auth']);
    } else {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
