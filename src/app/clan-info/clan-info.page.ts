import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  private members: Object[];
  constructor(
    private clansService: ClansService,
    private route: ActivatedRoute,
    private helper: HelperService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clanId = params["clan_id"];
    });
    this.getInfo();
  }

  private async getInfo() {
    this.info = await this.clansService.getInfoById(
      this.clanId,
      ["tag", "name", "created_at", "description", "members_count", "members"],
      ["members"]
    );
    this.info["created_at"] = this.helper.getTimeString(
      this.info["created_at"]
    );
    this.members = Object.values(this.info["members"]);
  }

  private showMemberInfo(memberId: number) {
    this.router.navigate(["/srchinfo", memberId]);
  }
}
