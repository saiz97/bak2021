import { Injectable } from "@angular/core";

@Injectable()
export class GlobalConstants {
  public readonly MARVEL_URL: string = "https://www.marvel.com/";
  public readonly MARVEL_DEVELOPER_URL: string = "https://developer.marvel.com/";
  public readonly MARVEL_ABOUT_URL: string = "https://www.marvel.com/corporate/about";

  public readonly BREAKPOINT_TABLET: number = 900;
  public readonly BREAKPOINT_MOBILE: number = 520;

  public readonly API_REQUEST_LIMIT = 40; // max 100
}
