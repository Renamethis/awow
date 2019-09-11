import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HelperService {
  constructor() {}

  getTimeString(timestamp: any) {
    return new Date(Number(timestamp) * 1000).toLocaleString().replace(",", "");
  }
}
