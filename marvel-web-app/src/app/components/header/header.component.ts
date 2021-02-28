import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../shared/constants.global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  marvel: string;

  constructor(private globals: GlobalConstants) { }

  ngOnInit(): void {
    this.marvel = this.globals.MARVEL_URL;
  }

}
