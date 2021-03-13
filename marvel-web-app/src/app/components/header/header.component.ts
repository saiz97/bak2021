import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalConstants } from '../../shared/global.variables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  marvel: string;
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(private globals: GlobalConstants, private authService: AuthService) { }

  ngOnInit(): void {
    this.marvel = this.globals.MARVEL_URL;

    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("Authenticated: ", this.isAuthenticated, !!user);
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
