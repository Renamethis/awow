import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class ClansService {
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  constructor(private http: HTTP, private storage: Storage) {}

  async getInfo(accId: number) {
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
                const clanId = clanInfo.clan_id;
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
}
