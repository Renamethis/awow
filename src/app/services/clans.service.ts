import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class ClansService {
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  constructor(private http: HTTP, private storage: Storage) {}

  async getInfoForPlayer(accId: number) {
    let info;
    if (accId) {
      await this.http
        .get(
          `https://api.worldofwarships.ru/wows/clans/accountinfo/?application_id=${this.appId}&account_id=${accId}`,
          {},
          {}
        )
        .then(async response => {
          const clPlInfo = JSON.parse(response.data);
          if (Object.values(clPlInfo.data)) {
            const clanInfo = clPlInfo.data[accId];
            if (clanInfo) {
              if (clanInfo.clan_id) {
                info = this.getInfoById(clanInfo.clan_id);
              }
            }
          }
        })
        .catch(error => {
          console.log("ERROR");
          console.log(error);
        });
    }
    return info;
  }

  private async getInfoById(clanId: any) {
    let info;
    await this.http
      .get(
        `https://api.worldofwarships.ru/wows/clans/info/?application_id=${this.appId}&clan_id=${clanId}`,
        {},
        {}
      )
      .then(response => {
        info = JSON.parse(response.data);
        info = info.data[clanId];
      })
      .catch(error => {
        console.log("ERROR");
        console.log(error.error);
      });

    return info;
  }

  async getInfoByTag(tag: String) {
    let clans: any[] = [];
    await this.http
      .get(
        `https://api.worldofwarships.ru/wows/clans/list/?application_id=8e1ae50869c452ec624476262bb20f0d&search=${tag}`,
        {},
        {}
      )
      .then(response => {
        if (200 >= response.status && response.status < 300) {
          return JSON.parse(response.data);
        }
      })
      .then(data => {
        for (const clan of data.data) {
          clans.push(clan);
        }
      })
      .catch(error => {
        console.log("ERROR");
        console.log(error.error);
      });
    return clans;
  }
}
