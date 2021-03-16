import { Component, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/service/data-storage.service'
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'marvel-web-app';

  constructor(private authService: AuthService, private dataService: DataStorageService) { }

  ngOnInit(): void {
    this.authService.autoLogin();

    this.authService.user.subscribe(user => {
      if (user != null) {
        this.dataService.getFavoritesOfUser(user);
      }
    })
  }
}
