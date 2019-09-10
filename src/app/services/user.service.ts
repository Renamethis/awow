import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private appId: any = "8e1ae50869c452ec624476262bb20f0d";
  constructor(private http: HTTP, private storage: Storage) { }
  login() {

  }
  updateToken() {
    this.storage.get("token").then(async value => {
      if (value != null) {
        await this.getExpiresAt();
        this.http.post(
            'https://api.worldoftanks.ru/wot/auth/prolongate/?application_id=${this.appId}',
            { access_token: value, expires_at: this.getExpiresAt() },
            { "Content-Type": "application/json" })
            .then(data => {
              this.storage.set('token', JSON.parse(data.data).data.access_token);
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
        return Number(data.unixtime) + offset;
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
