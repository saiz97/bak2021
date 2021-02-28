import { Component, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/service/data-storage.service';
import { StatusService } from 'src/app/service/status.service';
import { Subscription } from 'rxjs';
import { ComicService } from '../service/comic.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  startYear:number = 1949;
  endYear:number = 2021;
  yearOptions: number[] = [];

  selectedYear: number;
  yearSubscription: Subscription;

  totalComics:number = 0;

  constructor(private dataService: DataStorageService,
              private statusService: StatusService,
              private comicService: ComicService) { }

  ngOnInit(): void {
    for(let i = this.endYear; i >= this.startYear; i--) {
      this.yearOptions.push(i)
    }
    this.selectedYear = this.endYear;
    this.statusService.yearSelected.next(this.selectedYear);

    this.statusService.totalComics.subscribe((total) => {
      this.totalComics = total;
    })

    this.yearSubscription = this.statusService.yearSelected.subscribe((year) => {
      if (this.totalComics <= 0) {
        this.dataService.getFirst30ComicsByYear(year);
      }
    })
  }

  changeYear(year: number) {
    this.statusService.totalComics.next(0);
    this.comicService.resetComics();
    this.statusService.yearSelected.next(this.selectedYear);
  }
}
