import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { ClansService } from "../services/clans.service";
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  players: any[] = [];
  playerInfo: any = {};
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
  async getPlayerInfo(account_id: string, fields: string = ``) {
    if(fields != ``) {
      fields = `&fields=${fields}`;
    }
    return await this.http.get(`https://api.worldofwarships.ru/wows/account/info/?application_id=${this.appId}&account_id=${account_id}${fields}`,{},{});
  }
  decObject(object: any, parent: string = null) {
    if(object != null && Object.entries(object).length != 0) {
       for(let dt of Object.keys(object)) {
         console.log(object[dt]);
         if(typeof(object[dt]) == 'object') 
            this.decObject(object[dt], dt);
         else {
           if(parent != null) 
            this.playerInfo[parent + '.' + dt] = object[dt];
          else 
            this.playerInfo[dt] = object[dt];
         }
       }
    }
  }

} 
