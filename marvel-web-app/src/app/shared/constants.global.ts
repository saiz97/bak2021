import { Injectable } from "@angular/core";

@Injectable()
export class GlobalConstants {
  public readonly MARVEL_URL: string = "https://www.marvel.com/";
  public readonly MARVEL_DEVELOPER_URL: string = "https://developer.marvel.com/";

  public readonly BREAKPOINT_TABLET: number = 900;
  public readonly BREAKPOINT_MOBILE: number = 520;
}
