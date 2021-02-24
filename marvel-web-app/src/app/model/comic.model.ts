import { Creator } from "./creator.model";
import { Character } from "./character.model";

export class Comic {
  id: number;
  digitalId: number;

  title: string;
  description: string;

  isbn: string;
  issn: string;
  upc: string;
  diamondCode: string;

  pageCount: number;

  printPrice: number;
  digitalPurchasePrice: number;

  saleDate: Date;
  focDate: Date;

  issuePreviewText: string;

  thumbnailURI: string;

  resourceURI: string;
  marvelDetailLink: string;

  creators: Creator[];
  characters: Character[];

  constructor(id: number, digitalId: number, title: string, description: string,
  isbn: string, issn: string, upc: string, diamondCode: string,
  pageCount: number, printPrice: number, digitalPurchasePrice: number,
  saleDate: Date, focDate: Date,
  issuePreviewText: string, resourceURI: string, thumbnailURI: string, marvelDetailLink: string,
  creators: Creator[], characters: Character[]) {
    this.id = id;
    this.digitalId = digitalId;
    this.title = title;
    this.description = description;
    this.isbn = isbn;
    this.issn = issn;
    this.upc = upc;
    this.diamondCode = diamondCode;
    this.pageCount = pageCount;
    this.printPrice = printPrice;
    this.digitalPurchasePrice = digitalPurchasePrice;
    this.saleDate = saleDate;
    this.focDate = focDate;
    this.issuePreviewText = issuePreviewText;
    this.resourceURI = resourceURI;
    this.thumbnailURI = thumbnailURI;
    this.marvelDetailLink = marvelDetailLink;
    this.creators = creators;
    this.characters = characters;
  }

}
