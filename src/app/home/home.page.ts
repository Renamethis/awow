import { Component } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Storage } from "@ionic/storage";
import { ThrowStmt } from "@angular/compiler";
//import { timingSafeEqual } from 'crypto';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  token: string;
  uri: any;
  nick: any;
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
            this.parseUrl(event.url, "https://google.com/");
            this.token = event.url.substr(
              event.url.indexOf("access_token") + 13,
              event.url.indexOf("&nickname") -
                (event.url.indexOf("access_token") + 13)
            );
            this.storage.set("token", this.token);
            this.nick = event.url.substr(event.url.indexOf('nickname') + 9, event.url.indexOf('&account_id')-(event.url.indexOf('nickname')+9));
            this.storage.set("nickname", this.nick);
            alert(this.nick);
            browser.close();
          }
        });
      } else {
        this.storage.get('nickname').then(data => {
          this.nick = data;
          alert(this.nick);
        });
      }
    });
  }
  private parseUrl(url: any, rpurl: any) {
    url.substr(url.indexOf(rpurl)+rpurl.length, url.length-rpurl.length);
    alert(url);
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
