import { Component, OnInit } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Router } from "@angular/router";
import { ClansService } from "../services/clans.service";

@Component({
  selector: "app-clans",
  templateUrl: "./clans.page.html",
  styleUrls: ["./clans.page.scss"]
})
export class ClansPage implements OnInit {
  clans: any[] = [];
  constructor(
    private http: HTTP,
    private router: Router,
    private clansService: ClansService
  ) {}

  async searchClans(event: any) {
    if (event.target.value.length >= 2) {
      this.clans = [];
      const clanName = event.target.value;
      this.clans = await this.clansService.getInfoByTag(clanName);
    }
  }
  range(limit: number) {
    return Array(limit);
  }
  applySearch() {}
  ngOnInit() {}
}
