import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class ClansService {
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  constructor(private http: HTTP, private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.keys().then(appId => {
      // this.appId = appId;
      console.log(appId);
    });
  }

  async getInfo(accId: number) {
    let info;
    if (accId) {
      await this.http
        .get(
          `https://api.worldofwarships.ru/wows/clans/accountinfo/?application_id=${this.appId}&account_id=${accId}`,
          {},
          {}
        )
        .then(response => {
          const clPlInfo = JSON.parse(response.data);

          if (Object.values(clPlInfo.data)) {
            const clanInfo = clPlInfo.data[accId];
            if (clanInfo) {
              if (clanInfo.clan_id) {
                console.log("clan_id: " + clanInfo.clan_id);
                const clanId = clanInfo.clan_id;
                this.http
                  .get(
                    `https://api.worldofwarships.ru/wows/clans/info/?application_id=${this.appId}&clan_id=${clanId}`,
                    {},
                    {}
                  )
                  .then(response => {
                    info = JSON.parse(response.data);
                  });
              }
            }
          }
        })
        .catch(error => {
          console.log("ERROR");
          console.log(this.appId);
          console.log(error);
        });
    }
    return info;
  }
}
