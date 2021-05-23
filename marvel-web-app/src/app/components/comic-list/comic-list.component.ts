import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ComicService } from '../../service/comic.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StatusService } from 'src/app/service/status.service';
import { Subscription } from 'rxjs';
import { Comic } from 'src/app/model/comic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit, OnDestroy {
  @Input() listType: string;
  @Input() comicList: Comic[];

  displayedComicsSubscription: Subscription;

  constructor(private statusService: StatusService,
    private router: Router) { }

  ngOnInit(): void {

    switch (this.listType) {
      case "full":
        this.displayedComicsSubscription = this.statusService.getDisplayedComicList().subscribe((comics: Comic[] = []) => {
          this.comicList = comics;
        });

        break;

      case "favorites":
        break;
    }
  }

  toString(id) {
    return "comic_" + id;
  }

  selectComic(comic: Comic) {
    this.statusService.getSelectedComic().next(comic);
    this.router.navigate(['comics', 'comic', comic.id]);
  }

  ngOnDestroy(): void {
    if (this.displayedComicsSubscription) {
      this.displayedComicsSubscription.unsubscribe();
    }
  }

}
