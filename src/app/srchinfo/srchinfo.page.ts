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
  headlines: any = [
    {'Статистика игрока': {
      'statistics.battles': 'Проведено боев',
      'statistics.distance': 'Пройдено миль',
    }},
    {},
    {},
  ];
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
      let data: any = await this.playersService.getPlayerInfo(this.accid);
      this.playersService.decObject(JSON.parse(data.data).data[this.accid]);
      this.player = this.playersService.playerInfo;
      const clanInfo = await this.clansService.getInfoForPlayer(this.accid);
      if (clanInfo) {
        this.player.clanTag = clanInfo.tag;
      }
      console.log(this.playersService.playerInfo);
      this.date = this.helper.getTimeString(this.player.last_battle_time);
    });
  }
}
