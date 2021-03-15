import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusService } from 'src/app/service/status.service';
import { Comic } from 'src/app/model/comic.model';
import { Subscription } from 'rxjs';
import { last } from 'rxjs/operators';
import { ComicService } from 'src/app/service/comic.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { Router } from '@angular/router';
import { Creator } from 'src/app/model/creator.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';
import { ComicsComponent } from '../comics/comics.component';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit, OnDestroy {
  comic: Comic;
  comicSubscription: Subscription;
  userSubscription: Subscription;
  user: User;
  backgroundImage: string;

  writers: string = "";
  pencillers: string = "";
  converArtists: string = "";

  creatorsMap: Map<string, string[]> = new Map<string, string[]>();

  constructor(private statusService: StatusService, private comicService: ComicService,
              private dataService: DataStorageService, private router: Router,
              private authSerice: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authSerice.user.subscribe(user => {
      console.log("USER: ", user)
      this.user = user
    });

    this.comicSubscription = this.statusService.getSelectedComic().subscribe((comic: Comic) => {
      if (comic.characters.length === 0) {
        this.dataService.getCharactersByComicId(comic.id);
      }

      this.comic = comic;
      this.backgroundImage = 'url(' + this.comic.thumbnailURI + ')';

      this.creatorsToMap(comic.creators);
    });

    if (this.comic === undefined) {
      this.router.navigate(["comics"]);
    }
  }

  creatorsToMap(creators: Creator[]) {
   this.creatorsMap.clear();
    for (const creator of creators) {
      if (!this.creatorsMap.has(creator.type)) {
        this.creatorsMap.set(creator.type, []);
      }
      this.creatorsMap.get(creator.type).push(creator.name);
    }
  }

  ngOnDestroy(): void {
    this.comicSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  favorComic() {
    this.comicService.addFavorite(this.comic);
    this.comicService.getFavoritesSubject().subscribe(favorites => {
      console.log("==", favorites);
      this.dataService.storeFavoritesOfUser(favorites, this.user);
    }).unsubscribe();
  }

}
