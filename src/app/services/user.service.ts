import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  playerInfo: any = {};
  expiresAt: any;
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  constructor(private http: HTTP, private storage: Storage, private iab: InAppBrowser) {
    this.storage.get("playerInfo").then(async value => {
      if(value != null)
        this.playerInfo = value;
    });
  }
  async userLogin() {
    // tslint:disable-next-line:max-line-length
    await this.getExpiresAt();
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
        let info: any = this.parseUrl(event.url);
        alert(info);
        this.playerInfo.token = info.access_token;
        this.playerInfo.nick = info.nickname;
        this.storage.set("playerInfo", this.playerInfo);
        browser.close();
      }
    });
  }
  async updateToken() {
    await this.getExpiresAt();
    this.storage.get("playerInfo").then(async value => {
      if (value != null) {
        this.http.post(
            `https://api.worldoftanks.ru/wot/auth/prolongate/?application_id=${this.appId}`,
            { access_token: value.token, expires_at: this.expiresAt },
            { "Content-Type": "application/json" })
            .then(data => {
              this.playerInfo.token = JSON.parse(data.data).data.access_token;
              this.storage.set('playerInfo', this.playerInfo);
            });
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
  private parseUrl(url: any) {
    let inform: any = {};
    url = url.substr(url.indexOf("?")+1, url.length-url.indexOf('?'));
    console.log(url);
    while(url.indexOf('&') != -1) {
      inform[url.substr(0, url.indexOf('='))] = url.substr(url.indexOf('=') + 1, url.indexOf('&')-url.indexOf('=')-1);
      url = url.substr(url.indexOf('&')+1, url.length-url.indexOf('&'));
    }
    inform[url.substr(0, url.indexOf('='))] = url.substr(url.indexOf('=') + 1, url.length-url.indexOf('=')-1);
    return inform;
  }
}
