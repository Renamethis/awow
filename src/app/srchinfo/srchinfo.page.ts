import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HTTP } from "@ionic-native/http/ngx";
import { ClansService } from "../services/clans.service";
@Component({
  selector: "app-srchinfo",
  templateUrl: "./srchinfo.page.html",
  styleUrls: ["./srchinfo.page.scss"]
})
export class SrchinfoPage implements OnInit {
  accid: any;
  player: any;
  date: any;
  constructor(
    private route: ActivatedRoute,
    private http: HTTP,
    private clansService: ClansService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accid = params["account_id"];
      // tslint:disable-next-line:max-line-length
      this.http
        .get(
          "https://api.worldofwarships.ru/wows/account/info/?application_id=8e1ae50869c452ec624476262bb20f0d&fields=nickname,last_battle_time,statistics.distance,statistics.pvp.battles,statistics.pvp.wins&account_id=" +
            this.accid,
          {},
          {}
        )
        .then(async data => {
          this.player = JSON.parse(data.data).data[this.accid];
          const clanInfo = await this.clansService.getInfoForPlayer(this.accid);
          if (clanInfo) {
            this.player.clanTag = clanInfo.tag;
          }
          console.log(this.player);
          console.log(JSON.parse(data.data));
          this.date = new Date(this.player.last_battle_time * 1000)
            .toLocaleString()
            .replace(",", "");
        });
    });
  }
}
