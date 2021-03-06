import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { UserService } from "./services/user.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  isIos: boolean = false;
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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private user: UserService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.isIos = true;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if(Object.entries(this.user.playerInfo).length != 0) {
      this.user.updateToken();
    }
  }
}
