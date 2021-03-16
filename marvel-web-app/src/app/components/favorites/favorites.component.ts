import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Comic } from 'src/app/model/comic.model';
import { User } from 'src/app/model/user.model';
import { ComicService } from 'src/app/service/comic.service';
import { DataStorageService } from 'src/app/service/data-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  user: User = null;
  userSubscription: Subscription;
  favoriteSubscription: Subscription;

  comics: Comic[] = [];

  constructor(private authService: AuthService,
    private comicService: ComicService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.favoriteSubscription = this.comicService.getFavoritesSubject().subscribe(favs => {
      this.comics = favs;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.favoriteSubscription.unsubscribe();
  }
}
