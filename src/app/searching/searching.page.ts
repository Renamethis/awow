import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searching',
  templateUrl: './searching.page.html',
  styleUrls: ['./searching.page.scss'],
})

export class SearchingPage implements OnInit {
    players: any[] = [];
    flag: boolean;
  constructor(private http: HTTP, private router: Router) {this.flag = true; }
  ngOnInit() {
  }
  searchNames(ev: any) {
    this.players = [];
    console.log(this.players);
    if (ev.target.value.length >= 3) {
        this.flag = false;
        // tslint:disable-next-line:max-line-length
        this.http.get('https://api.worldofwarships.ru/wows/account/list/?application_id=8e1ae50869c452ec624476262bb20f0d&limit=20&search=' + ev.target.value, {}, {})
          .then(data => {
              for (const pl of JSON.parse(data.data).data) {
                  // tslint:disable-next-line:max-line-length
                  this.http.get('https://api.worldofwarships.ru/wows/account/info/?application_id=8e1ae50869c452ec624476262bb20f0d&account_id=' + pl.account_id + '&fields=statistics.pvp.wins,statistics.battles', {}, {}).then(dt => {
                  // tslint:disable-next-line:max-line-length
                    this.players.push({account_id: pl.account_id, nickname: pl.nickname, wins: JSON.parse(dt.data).data[pl.account_id].statistics.pvp.wins, battles: JSON.parse(dt.data).data[pl.account_id].statistics.battles});
                });
            }
              this.flag = true;
          })
          .catch(error => {
            console.log('ERROR!');
            console.log(error.error);
          });
    }
  }
  applySearch(account_id: any) {
      this.router.navigate(['/srchinfo', account_id]);
  }
}
