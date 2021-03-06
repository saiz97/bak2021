import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../shared/global.variables';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  marvel: string;
  about: string;

  constructor(private globals: GlobalConstants) { }

  ngOnInit(): void {
    this.marvel = this.globals.MARVEL_URL;
    this.about = this.globals.MARVEL_ABOUT_URL;
  }

}
