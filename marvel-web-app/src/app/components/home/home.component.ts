import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/shared/global.variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  about: string;

  constructor(private globals: GlobalConstants) { }

  ngOnInit(): void {
    this.about = this.globals.MARVEL_ABOUT_URL;
  }
}
