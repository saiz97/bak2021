import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../shared/constants.global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  marvel: string;

  constructor(private globals: GlobalConstants) { }

  ngOnInit(): void {
    this.marvel = this.globals.MARVEL_URL;
  }

}
