import { Component } from '@angular/core';

import { DataStorageService } from 'src/app/service/data-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marvel-web-app';

  constructor() {
    
  }
}
