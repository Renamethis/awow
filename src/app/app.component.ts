import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    {
      title: "Игроки",
      url: "/searching",
      icon: "search"
    },
    {
      title: "Аккаунт",
      url: "/home",
      icon: "person"
    },
    {
      title: "Кланы",
      url: "/clans",
      icon: "people"
    },
    {
      title: "List",
      url: "/list",
      icon: "people"
    }
  ];
  nick: any;
  expiresAt: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private http: HTTP
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
<<<<<<< HEAD
=======
    this.storage.get("token").then(async value => {
      if (value != null) {
        await this.getExpiresAt();
        this.http
          .post(
            "https://api.worldoftanks.ru/wot/auth/prolongate/?application_id=8e1ae50869c452ec624476262bb20f0d",
            { access_token: value, expires_at: this.expiresAt },
            { "Content-Type": "application/json" }
          )
          .then(data => {
            this.storage.set("token", JSON.parse(data.data).data.access_token);
          });
      }
    });
>>>>>>> df2858fe5b42d04745d88f90629ae8ca94ee6894
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
