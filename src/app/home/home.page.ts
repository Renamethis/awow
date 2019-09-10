import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    private user: UserService
  ) {
    if(Object.entries(user.playerInfo).length == 0) {
      user.userLogin();
    }
  }
}