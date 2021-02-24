import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentStatusService {

  comicsPageLimit = 30; // max 100
  totalComics = new ReplaySubject<number>();
  yearSelected = new ReplaySubject<number>();

  constructor() { }
}
