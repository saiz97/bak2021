import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CurrentStatusService } from './current-status.service';

import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  timestamp:string = "0";

  constructor(private http: HttpClient, private statusService: CurrentStatusService) { }

  fetchAllCharacters() {

    const ENDPOINT = "/v1/public/characters";
    // const ENDPOINT = "/v1/public/characters?orderBy=name";
    // const ENDPOINT = `/v1/public/characters?apikey=${environment.MARVEL_API_PUBLIC_KEY}?ts=${this.timestamp}?hash=${this.getMd5Hash()}`;

    const promise = this.http.get<any>(`${environment.MARVEL_BASE_URL + ENDPOINT}`, this.setRequestOptions()).toPromise()
    .then((response) => {
      console.log("Success in fetchAllCharacters", response);
    }).catch((error) => {
      console.error("Error occured in fetchAllCharacters.", error);
    });
  }

  getFirst30ComicsByYear() {
    const ENDPOINT = "/v1/public/characters";

    this.statusService.yearSelected.subscribe((year) => {
      const params = new Map<string, string>();
        params.set("limit", this.statusService.comicsPageLimit.toString());
        params.set("format", "comic");
        params.set("formatType", "comic");
        params.set("noVariants", "true");
        params.set("dateRange", `${year}-01-01,${year}-12-31`);
        params.set("orderBy", "onSaleDate");

      this.http.get<any>(`${environment.MARVEL_BASE_URL + ENDPOINT}`, this.setRequestOptions()).toPromise()
        .then((response) => {
          console.log("Success in getFirst30ComicsByYear", response);
          this.statusService.totalComics.next(response.data.total);
        }).catch((error) => {
          console.error("Error occured in getFirst30ComicsByYear.", error);
        });
    })
  }

  getNext30ComicsByOffset(offset: number) {
    const ENDPOINT = "/v1/public/comics";

    this.statusService.yearSelected.subscribe((year) => {
      const params = new Map<string, string>();
        params.set("limit", this.statusService.comicsPageLimit.toString());
        params.set("offset", offset.toString());
        params.set("format", "comic");
        params.set("formatType", "comic");
        params.set("noVariants", "true");
        params.set("dateRange", `${year}-01-01,${year}-12-31`);
        params.set("orderBy", "onSaleDate");

      this.http.get<any>(`${environment.MARVEL_BASE_URL + ENDPOINT}`, this.setRequestOptions()).toPromise()
        .then((response) => {
          console.log("Success in getNext30ComicsByOffset", response);
          this.statusService.totalComics.next(response.data.total);
        }).catch((error) => {
          console.error("Error occured in getNext30ComicsByOffset.", error);
        });
    })
  }

  getCharactersByComicId(id: number) {
    // TODO: Call, when comic detail page
    // /v1/public/comics/{comicId}/characters

    const ENDPOINT = `/v1/public/comics/${id}/characters`;

    this.statusService.yearSelected.subscribe((year) => {
      const params = new Map<string, string>();

      this.http.get<any>(`${environment.MARVEL_BASE_URL + ENDPOINT}`, this.setRequestOptions()).toPromise()
        .then((response) => {
          console.log("Success in fetchCharactersByComicId", response);
          this.statusService.totalComics.next(response.data.total);
        }).catch((error) => {
          console.error("Error occured in fetchCharactersByComicId.", error);
        });
    })
  }

  setRequestOptions(additionalParams: Map<string, string> = null) {
    this.timestamp = Date.now().toString();

    const headers = new HttpHeaders({
        "Accept": "application/json",
        });

    const params = new HttpParams()
        .set("apikey", environment.MARVEL_API_PUBLIC_KEY)
        .set("ts", this.timestamp)
        .set("hash", this.getMd5Hash());

    for (const [key, value] of additionalParams) {
      params.set(key, value);
    }

    return { headers: headers, params: params };
  }

  // md5(timestamp + private_key + public_key)
  getMd5Hash(): string {
    const md5 = new Md5();
    const hash = md5
          .appendStr(this.timestamp)
          .appendStr(environment.MARVEL_API_PRIVATE_KEY)
          .appendStr(environment.MARVEL_API_PUBLIC_KEY)
          .end().toString();

    console.log("MD5 Hash: ", hash);
    return hash;
  }
}
