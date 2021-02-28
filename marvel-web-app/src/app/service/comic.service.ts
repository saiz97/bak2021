import { Injectable } from '@angular/core';
import { Comic } from '../model/comic.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Character } from '../model/character.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private comicsSubject = new BehaviorSubject<Comic[]>([]);
  private favoritesSubject = new BehaviorSubject<Comic[]>([]);
  private comics: Comic[] = [];
  private favorites: Comic[] = [];

  constructor() { }

  addComics(comics) {
    this.comics = this.comics.concat(comics);
    this.comicsSubject.next(this.comics.slice());
  }

  addCharactersToComic(id: number, characters: Character[]) {
    this.comics.find((comic) => {
      if (comic.id === id) {
        comic.characters = characters;
        this.comicsSubject.next(this.comics.slice());
      }
    })
  }

  getComics(): Comic[] {
    return this.comics.slice();
  }

  getComicsSubject(): BehaviorSubject<Comic[]> {
    return this.comicsSubject;
  }

  addFavorite(comic: Comic) {
    this.favorites.push(comic);
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
  }

  resetFavorites() {
    this.favorites.length = 0;
    this.favoritesSubject.next(this.favorites.slice());
  }
}
