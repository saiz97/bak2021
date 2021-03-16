import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Comic } from '../model/comic.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private yearSelected = new BehaviorSubject<number>(2021);
  private selectedComic = new BehaviorSubject<Comic>(null);
  private displayedComicList = new BehaviorSubject<Comic[]>([]);
  private isLoadingComics = new BehaviorSubject<boolean>(false);

  getSelectedComic(): BehaviorSubject<Comic> {
    return this.selectedComic;
  }

  getSelectedYear(): BehaviorSubject<number> {
    return this.yearSelected;
  }

  getDisplayedComicList(): BehaviorSubject<Comic[]> {
    return this.displayedComicList;
  }

  getLoadingStatus(): BehaviorSubject<boolean> {
    return this.isLoadingComics;
  }

  constructor() { }

  resetStatus(year: number) {
    console.warn("== StatusService: resetStatus");
    this.yearSelected.next(year);
  }

}
