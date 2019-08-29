import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'app-srchinfo',
  templateUrl: './srchinfo.page.html',
  styleUrls: ['./srchinfo.page.scss'],
})
export class SrchinfoPage implements OnInit {
  accid: any;
  constructor(private route: ActivatedRoute, private http: HTTP) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accid = params['account_id'];
      // tslint:disable-next-line:max-line-length
      this.http.get('https://api.worldofwarships.ru/wows/account/info/?application_id=8e1ae50869c452ec624476262bb20f0d&account_id=' + this.accid, {}, {}).then(data => {
        console.log(JSON.parse(data.data));
      });
    });
  }

}
