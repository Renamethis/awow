import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from "@ionic-native/http/ngx";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Игроки',
      url: '/searching',
      icon: 'search'
    },
    {
      title: 'Аккаунт',
      url: '/home',
      icon: 'person'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'people'
    }
  ];
  nick: any;
  expiresAt: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private http: HTTP,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
