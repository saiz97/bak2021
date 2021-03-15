import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Comic } from 'src/app/model/comic.model';
import { User } from 'src/app/model/user.model';
import { DataStorageService } from 'src/app/service/data-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  user: User = null;
  userSubscription: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;

      this.dataService.getFavoritesOfUser(user);

      if (user != null) {
        const comics: Comic[] = [];

      } else {
        console.error("No user available!");
      }
    });
  }

}
