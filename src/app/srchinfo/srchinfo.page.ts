import { Component, OnInit, APP_INITIALIZER } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HTTP } from "@ionic-native/http/ngx";
import { ClansService } from "../services/clans.service";
import { HelperService } from "../services/helper.service";
import { PlayersService } from "../services/players.service";
import { IonItem } from '@ionic/angular';
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
    private clansService: ClansService,
    private helper: HelperService,
    private playersService: PlayersService,
  ) {}
  async ngOnInit() {
    this.init();
  }
  async init() {
    this.route.params.subscribe(async params => {
      this.accid = params["account_id"];
      // tslint:disable-next-line:max-line-length
      let data: any = await this.playersService.getPlayerInfo(this.accid, "nickname,last_battle_time,statistics.distance,statistics.pvp.battles,statistics.pvp.wins");
      this.player = JSON.parse(data.data).data[this.accid];
      const clanInfo = await this.clansService.getInfoForPlayer(this.accid);
      if (clanInfo) {
        this.player.clanTag = clanInfo.tag;
      }
      this.date = this.helper.getTimeString(this.player.last_battle_time);
    });
  }
}
