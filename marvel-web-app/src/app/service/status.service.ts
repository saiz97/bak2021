import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Comic } from '../model/comic.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  comicsPageLimit = 30; // max 100
  totalComics = new ReplaySubject<number>();
  yearSelected = new ReplaySubject<number>();
  selectedComic = new ReplaySubject<Comic>();

  loadingComics = new ReplaySubject<boolean>();

  constructor() {
  }
}
