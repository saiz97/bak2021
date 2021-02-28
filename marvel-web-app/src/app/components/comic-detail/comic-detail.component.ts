import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusService } from 'src/app/service/status.service';
import { Comic } from 'src/app/model/comic.model';
import { Subscription } from 'rxjs';
import { ComicService } from 'src/app/service/comic.service';
import { DataStorageService } from 'src/app/service/data-storage.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit, OnDestroy {
  comic: Comic;
  comicSubscription: Subscription;

  constructor(private statusService: StatusService, private comicService: ComicService, private dataService: DataStorageService) { }

  ngOnInit(): void {
    this.comicSubscription = this.statusService.selectedComic.subscribe((comic) => {
      this.comic = comic;
      this.dataService.getCharactersByComicId(comic.id);
    });

  }

  ngOnDestroy(): void {
    this.comicSubscription.unsubscribe();
  }

}
