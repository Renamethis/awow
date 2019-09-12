import { Component, OnInit } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Router } from "@angular/router";
import { PlayersService } from "../services/players.service";
@Component({
  selector: "app-searching",
  templateUrl: "./searching.page.html",
  styleUrls: ["./searching.page.scss"]
})
export class SearchingPage implements OnInit {
  players: any[] = [];
  isSearching: boolean;
  constructor(
    private http: HTTP,
    private router: Router,
    private playersService: PlayersService) {
    this.isSearching = true;
  }
  ngOnInit() {}
  async searchNames(ev: any) {
    this.players = [];
    console.log(this.players);
    if (ev.target.value.length >= 3) {
      this.isSearching = false;
      await this.playersService.searchUsers(ev.target.value); 
      this.isSearching = true;
    }
  }
  range(limit: number) {
    return Array(limit);
  }
  applySearch(account_id: any) {
    this.router.navigate(["/srchinfo", account_id]);
  }
}
