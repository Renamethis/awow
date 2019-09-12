import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { ClansService } from "../services/clans.service";
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  players: any[] = [];
  constructor(private http: HTTP, private clansService: ClansService) { }
  async searchUsers(name: string) {
    this.players = [];
    await this.http.get(`https://api.worldofwarships.ru/wows/account/list/?application_id=${this.appId}&limit=20&search=${name}`,
    {},{}).then(async data => {
      for (const pl of JSON.parse(data.data).data) {
        const clanInfo = await this.clansService.getInfoForPlayer(pl.account_id);
        let clanTag: any;
        if (clanInfo) {
          clanTag = clanInfo.tag;
        }
        let data = await this.getPlayerInfo(pl.account_id, 'statistics.pvp.wins,statistics.pvp.battles');
        this.players.push({
          account_id: pl.account_id,
          nickname: pl.nickname,
          clanTag,
          wins: JSON.parse(data.data).data[pl.account_id].statistics.pvp.wins,
          battles: JSON.parse(data.data).data[pl.account_id].statistics.pvp.battles
        });
      }
    }).catch(error => {
      console.log("ERROR!");
      console.log(error.error);
    });
  }
  async getPlayerInfo(account_id: string, fields: string) {
    return await this.http.get(`https://api.worldofwarships.ru/wows/account/info/?application_id=${this.appId}&account_id=${account_id}&fields=${fields}`,{},{});
  }
} 
