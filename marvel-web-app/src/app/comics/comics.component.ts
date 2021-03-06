import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { StatusService } from 'src/app/service/status.service';
import { Subscription } from 'rxjs';
import { last } from 'rxjs/operators';
import { ComicService } from '../service/comic.service';
import { Comic } from '../model/comic.model';
import { GlobalConstants } from '../shared/global.variables';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit, OnDestroy {
  startYear:number = 1949;
  endYear:number = 2021;
  yearOptions: number[] = [];

  selectedYear: number = 0;
  selectedPage: number = 1;
  isLoading: boolean = false;
  existingPages: number = 0;

  comicPageMap: Map<number, Comic[]> = null;

  comicPageMapSubscription: Subscription;
  yearSubscription: Subscription;
  loadingSubscription: Subscription;

  constructor(private dataService: DataStorageService,
              private statusService: StatusService,
              private comicService: ComicService,
              private globals: GlobalConstants) { }

  ngOnInit(): void {
    for(let i = this.endYear; i >= this.startYear; i--) {
      this.yearOptions.push(i)
    }

    this.selectedYear = this.endYear;
    this.statusService.getSelectedYear().next(this.selectedYear);

    this.comicPageMapSubscription = this.comicService.getComicPageMap().subscribe((comicMap) => {
      console.log("Comic Map: ", comicMap)
      if (comicMap != null) {
        this.comicPageMap = comicMap;
        this.statusService.getDisplayedComicList().next(comicMap.get(this.selectedPage));
      }
    });

    this.yearSubscription = this.statusService.getSelectedYear().subscribe((year) => {
      console.log("HEY", year);
      if (this.comicPageMap == null || this.comicPageMap.size === 0) {
        this.dataService.getComics(year, 1, 0); // first page, offset 0 -> new year = new comics
      }
    });

    this.loadingSubscription = this.statusService.getLoadingStatus().subscribe((loadingState) => {
      this.isLoading = loadingState;
      console.log("loading state: ", this.isLoading)
    });
  }

  changeYear(year: number) {
    this.comicService.resetComics();
    this.statusService.resetStatus(this.selectedYear);
  }

  changePage(page: number) {
    console.info(`[INFO] Page changed from ${this.selectedPage} to ${page}.`)
    this.selectedPage = page;

    if (this.comicPageMap.get(page).length === 0) {
      this.dataService.getComics(this.selectedYear, page, this.globals.comicsPageLimit * (page - 1));
    } else {
      this.statusService.getDisplayedComicList().next(this.comicPageMap.get(page));
    }
  }

  ngOnDestroy(): void {
    this.yearSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.comicPageMapSubscription.unsubscribe();
  }

}

