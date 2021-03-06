import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusService } from 'src/app/service/status.service';
import { Comic } from 'src/app/model/comic.model';
import { Subscription } from 'rxjs';
import { last } from 'rxjs/operators';
import { ComicService } from 'src/app/service/comic.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { Router } from '@angular/router';
import { Creator } from 'src/app/model/creator.model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit, OnDestroy {
  comic: Comic;
  comicSubscription: Subscription;
  backgroundImage: string;

  writers: string = "";
  pencillers: string = "";
  converArtists: string = "";

  creatorsMap: Map<string, string[]> = new Map<string, string[]>();

  constructor(private statusService: StatusService, private comicService: ComicService,
              private dataService: DataStorageService, private router: Router) { }

  ngOnInit(): void {
    this.comicSubscription = this.statusService.getSelectedComic().subscribe((comic: Comic) => {
      console.log("??? ", comic)
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
  }

}
