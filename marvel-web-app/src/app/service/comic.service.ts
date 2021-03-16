import { Injectable } from '@angular/core';
import { Comic } from '../model/comic.model';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../model/character.model';
import { GlobalConstants } from '../shared/global.variables';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  comicPageMapSubject = new BehaviorSubject<Map<number, Comic[]>>(new Map<number, Comic[]>());
  private comicsSubject = new BehaviorSubject<Comic[]>([]);
  private favoritesSubject = new BehaviorSubject<Comic[]>([]);

  private comics: Comic[] = [];
  private comicPageMap: Map<number, Comic[]> = new Map<number, Comic[]>();
  private favorites: Comic[] = [];

  constructor(private globals: GlobalConstants) { }

  addComics(comics: Comic[], totalComics: number, page: number) {
    this.comics = this.comics.concat(comics);
    this.comicsSubject.next(this.comics.slice());
    this.addToComicPageMap(comics, totalComics, page);
  }

  addToComicPageMap(comics: Comic[], totalComics: number, page: number) {
    if (this.comicPageMap.size === 0) {
      const pages = Math.floor(totalComics / this.globals.API_REQUEST_LIMIT);
      for (let i = 1; i <= pages; i++) {
        (i == page) ? this.comicPageMap.set(i, comics) : this.comicPageMap.set(i, []);
      }
    } else {
      this.comicPageMap.set(page, comics)
    }

    this.comicPageMapSubject.next(this.comicPageMap);
  }

  addCharactersToComic(id: number, characters: Character[]) {
    this.comics.find((comic) => {
      if (comic.id === id) {
        comic.characters = characters;
        this.comicsSubject.next(this.comics.slice());
      }
    })
  }

  isFavoriteComic(id: number): boolean {
    return (this.favorites.find(comic => (comic.id === id)) !== undefined);
  }

  getComics(): Comic[] {
    return this.comics.slice();
  }

  getComicsSubject(): BehaviorSubject<Comic[]> {
    return this.comicsSubject;
  }

  getComicPageMap(): BehaviorSubject<Map<number, Comic[]>> {
    return this.comicPageMapSubject;
  }

  addFavorite(comic: Comic) {
    this.favorites.push(comic);
    this.favoritesSubject.next(this.favorites.slice());
    console.info("Favorite added: ", comic, this.favorites);
  }

  removeFavorite(fav: Comic) {
    this.favorites = this.favorites.filter(comic => comic.id !== fav.id);
    this.favoritesSubject.next(this.favorites.slice());
    console.info("Favorite removed: ", this.favorites);
  }

  addFavorites(comics: Comic[]) {
    this.favorites = comics;
    this.favoritesSubject.next(this.favorites.slice());
    console.info("Favorites: ", this.favorites);
  }

  getFavorites(): Comic[] {
    return this.favorites.slice();
  }

  getFavoritesSubject(): BehaviorSubject<Comic[]> {
    return this.favoritesSubject;
  }

  resetComics() {
    this.comics.length = 0;
    this.comicsSubject.next(this.comics.slice());
    this.comicPageMap = new Map<number, Comic[]>();
    this.comicPageMapSubject.next(this.comicPageMap);
  }

  resetFavorites() {
    this.favorites.length = 0;
    this.favoritesSubject.next(this.favorites.slice());
  }
}
