import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StatusService } from './status.service';

import {Md5} from 'ts-md5/dist/md5';
import { ComicService } from './comic.service';
import { Comic } from '../model/comic.model';
import { Creator } from '../model/creator.model';
import { Character } from '../model/character.model';
import { GlobalConstants } from '../shared/global.variables';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  timestamp:string = "0";

  constructor(private http: HttpClient, private statusService: StatusService,
  private comicService: ComicService, private globals: GlobalConstants, private authService: AuthService) { }

  getComics(year: number, page: number, offset: number) {
    console.info(`[INFO] Get comics for year=${year}, page=${page} with offset ${offset}.`)
    const ENDPOINT = "/v1/public/comics";

    const params = new Map<string, string>();
      params.set("limit", this.globals.API_REQUEST_LIMIT.toString());
      params.set("offset", offset.toString());
      params.set("format", "comic");
      params.set("formatType", "comic");
      params.set("noVariants", "true");
      params.set("dateRange", `${year}-01-01,${year}-12-31`);
      params.set("orderBy", "title");

    this.statusService.getLoadingStatus().next(true);
    this.http.get<any>(`${environment.MARVEL_BASE_URL + ENDPOINT}`, this.setRequestOptions(params)).toPromise()
    .then((response) => {
      console.info("[INFO] Success in getComics", response);
      this.processResponseData(response.data.results, response.data.total, page);
      this.statusService.getLoadingStatus().next(false);
    }).catch((error) => {
      console.error("Error occured in getComics.", error);
      this.statusService.getLoadingStatus().next(false);
    });
  }

  getCharactersByComicId(id: number) {
    // /v1/public/comics/{comicId}/characters
    const ENDPOINT = `/v1/public/comics/${id}/characters`;

    this.http.get<any>(`${environment.MARVEL_BASE_URL + ENDPOINT}`, this.setRequestOptions()).toPromise()
      .then((response) => {
        console.log("Success in fetchCharactersByComicId", response);
        const resCharacters = response.data.results;
        const characters: Character[] = [];

        for (const character of resCharacters) {
          let thumbnail = character.thumbnail.path + "/portrait_uncanny." + character.thumbnail.extension;
          characters.push(new Character(character.id, character.name, character.resourceURI, character.description, thumbnail));
        }

        this.comicService.addCharactersToComic(id, characters);
      }).catch((error) => {
        console.error("Error occured in fetchCharactersByComicId.", error);
      });
  }

  setRequestOptions(additionalParams: Map<string, string> = new Map<string, string>()) {
    this.timestamp = Date.now().toString();

    const headers = new HttpHeaders({
        "Accept": "application/json",
        });

    let params = new HttpParams()
        .set("apikey", environment.MARVEL_API_PUBLIC_KEY)
        .set("ts", this.timestamp)
        .set("hash", this.getMd5Hash());

    for (const [key, value] of additionalParams) {
      params = params.set(key, value);
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

    // console.log("MD5 Hash: ", hash);
    return hash;
  }

  processResponseData(responseComics: any, totalComics: number, page: number) {
    const comics: Comic[] = [];
    for (const comic of responseComics) {
      let printPrice = 0;
      let digitialPrice = 0;
      let saleDate: Date = null;
      let focDate: Date = null;
      let issuePreviewText = "";
      let detailLink = "";
      let thumbnail = comic.thumbnail.path + "/portrait_uncanny." + comic.thumbnail.extension;
      let creators: Creator[] = [];
      let characters: Character[] = [];

      for (const price of comic.prices) {
        if (price.type === "printPrice") printPrice = price.price;
        if (price.type === "digitalPurchasePrice") digitialPrice = price.price;
      }

      for (const date of comic.dates) {
        if (date.type === "onsaleDate") saleDate = new Date(date.date);
        if (date.type === "focDate") focDate = new Date(date.date);
      }

      for (const textObj of comic.textObjects) {
        if (textObj.type === "issue_preview_text") issuePreviewText = textObj.text;
      }

      for (const url of comic.urls) {
        if (url.type === "detail") detailLink = url.url;
      }

      for (const creator of comic.creators.items) {
        creators.push(new Creator(creator.name, creator.role));
      }

      comics.push(
        new Comic(+comic.id, +comic.digitalId,
        comic.title, ((comic.description != null) ? comic.description : ""),
        comic.isbn, comic.issn, comic.upc, comic.diamondCode, +comic.pageCount,
        printPrice, digitialPrice, saleDate, focDate, issuePreviewText,
        comic.resourceURI, thumbnail, detailLink, creators, characters)
      );
    }

    // console.info("[INFO] New comics: ", comics);
    this.comicService.addComics(comics, totalComics, page);
  }

  getFavoritesOfUser(user: User) {
    const url = this.globals.FIREBASE_DATABASE_URL + user.id + '.json';
    console.log("FAVORITES!", url);
    this.http.get<Comic[]>(url).subscribe(comics => {
      if (comics != null) {
        const favs: Comic[] = [];

        for (const comic of comics) {
          const creators:Creator[] = [];
          const characters:Character[] = [];

          for (const creator of comic.creators) {
            creators.push(new Creator(creator.name, creator.type));
          }

          for (const character of comic.characters) {
            characters.push(new Character(
              character.id, character.name,
              character.resourceURI,
              character.description, character.thumbnail
            ));
          }

          const fav = new Comic(
            comic.id, comic.digitalId, comic.title, comic.description,
            comic.isbn, comic.issn, comic.upc, comic.diamondCode,
            comic.pageCount, comic.printPrice, comic.digitalPurchasePrice,
            comic.saleDate, comic.focDate, comic.issuePreviewText,
            comic.resourceURI, comic.thumbnailURI, comic.marvelDetailLink,
            creators, characters
          );

          // console.log("Saved Favorite: ", fav);
          favs.push(fav);
        }
      }
    })
  }

  storeFavoritesOfUser(comics: Comic[], user: User) {
    const url = this.globals.FIREBASE_DATABASE_URL + user.id + '.json';

    this.http
      .put(url, comics)
      .subscribe(response => {
        console.log(response);
      });
  }
}
