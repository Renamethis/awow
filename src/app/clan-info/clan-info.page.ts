import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClansService } from "../services/clans.service";
import { HelperService } from "../services/helper.service";

@Component({
  selector: "app-clan-info",
  templateUrl: "./clan-info.page.html",
  styleUrls: ["./clan-info.page.scss"]
})
export class ClanInfoPage implements OnInit {
  private clanId: number;
  private info: object;
  constructor(
    private clansService: ClansService,
    private route: ActivatedRoute,
    private helper: HelperService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clanId = params["clan_id"];
    });
    this.getInfo();
  }

  private async getInfo() {
    this.info = await this.clansService.getInfoById(this.clanId);
    this.info["created_at"] = this.helper.getTimeString(
      this.info["created_at"]
    );
  }
}
