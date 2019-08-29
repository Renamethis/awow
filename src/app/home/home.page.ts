import { Component } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Storage } from "@ionic/storage";
import { ThrowStmt } from "@angular/compiler";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  token: string;
  uri: any;
  expiresAt;
  appId: string = "8e1ae50869c452ec624476262bb20f0d";
  constructor(
    private http: HTTP,
    private iab: InAppBrowser,
    private storage: Storage
  ) {
    this.init();
  }

  private async init() {
    this.storage.set("appId", this.appId);

    this.storage.get("token").then(async value => {
      if (value == null) {
        await this.getExpiresAt();
        // tslint:disable-next-line:max-line-length
        const browser = this.iab.create(
          `https://api.worldoftanks.ru/wot/auth/login/?application_id=${this.appId}&expires_at=${this.expiresAt}&display=page&redirect_uri=https://google.com`,
          "_blank",
          { fullscreen: "yes" }
        );
        browser.on("loadstart").subscribe(event => {
          if (
            event.url.substr(0, event.url.indexOf("?")) ===
            "https://google.com/"
          ) {
            // tslint:disable-next-line:max-line-length
            this.token = event.url.substr(
              event.url.indexOf("access_token") + 13,
              event.url.indexOf("&nickname") -
                (event.url.indexOf("access_token") + 13)
            );
            this.storage.set("token", this.token);
            browser.close();
          }
        });
      } else {
      }
    });
  }
  private async getExpiresAt() {
    await this.http
      .get("http://worldtimeapi.org/api/timezone/Europe/London", {}, {})
      .then(response => {
        const data = JSON.parse(response.data);
        // 15 days in unixtime
        const offset = 1296000;
        this.expiresAt = Number(data.unixtime) + offset;
      });
  }
}
