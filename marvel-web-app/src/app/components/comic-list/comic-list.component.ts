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
  @Input() year: number;

  currentPage: number;
  maxPages: number;

  totalPageSubscription: Subscription;
  comicSubscription: Subscription;

  comicList: Comic[] = [];
  isLoading: boolean = false;

  constructor(private comicService: ComicService,
    private dataService: DataStorageService,
    private statusService: StatusService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("YEAR: ", this.year)
    this.statusService.loadingComics.subscribe((loadingState) => {
      console.log("loading: ", loadingState)
      this.isLoading = loadingState;
    });

    switch (this.listType) {
      case "full":
        this.comicSubscription = this.comicService.getComicsSubject().subscribe((comics) => {
          console.log("@ComicList Component: ", comics);
          this.comicList = comics;
        });

        this.totalPageSubscription = this.statusService.totalComics.subscribe((totalComics) => {
          this.maxPages = Math.floor(totalComics / this.statusService.comicsPageLimit);
          console.log("Total Pages: ", totalComics, " MaxPages: ", this.maxPages);
        });

        break;

      case "favorites":
        this.comicList = this.comicService.getFavorites();
        break;
    }
  }

  ngOnDestroy(): void {
    this.totalPageSubscription.unsubscribe();
    this.comicSubscription.unsubscribe();
  }

  selectComic(comic: Comic) {
    this.statusService.selectedComic.next(comic);
    this.router.navigate(['comics', 'comic', comic.id]);
  }

}
