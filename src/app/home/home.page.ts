import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    token: any;
  constructor(private http: HTTP, private iab: InAppBrowser, private storage: Storage) {
    // tslint:disable-next-line:max-line-length
    /*this.http.get('https://api.worldoftanks.ru/wot/auth/login/?application_id=8e1ae50869c452ec624476262bb20f0d&expires_at=1566512595&application_id=8e1ae50869c452ec624476262bb20f0d&display=page&nofollow=1', {}, {})
        .then(data => {
            this.http.get(JSON.parse(data.data).data.location, {}, {}).then( dt => {
                console.log(dt);
            }).catch(error => {
                console.log('ERROR!');
                console.log(error.error);
            });
        })
        .catch(error => {
          console.log('ERROR!');
          console.log(error.error);
        });*/
    storage.get('token').then(value => {
       if (value == null) {
           // tslint:disable-next-line:max-line-length
           const browser = this.iab.create('https://api.worldoftanks.ru/wot/auth/login/?application_id=8e1ae50869c452ec624476262bb20f0d&expires_at=1566512595&application_id=8e1ae50869c452ec624476262bb20f0d&display=page&redirect_uri=https://google.com', '_blank', {fullscreen: 'yes'});
           browser.on('loadstart').subscribe(event => {
               if (event.url.substr(0, event.url.indexOf('?')) === 'https://google.com/') {
                   // tslint:disable-next-line:max-line-length
                   this.token = event.url.substr(event.url.indexOf('access_token=') + 13, event.url.length - event.url.substr(event.url.indexOf('access_token=') + 13, event.url.substr(0, event.url.indexOf('access_token=') + 13).length).length - event.url.substr(event.url.indexOf('&nickname'), event.url.length).length);
                   storage.set('token', this.token);
                   browser.close();
               }
           });
       } else {
           this.token = value;
       }
        // tslint:disable-next-line:max-line-length
       this.http.get('https://api.worldofwarships.ru/wows/account/info/?application_id=8e1ae50869c452ec624476262bb20f0d&fields=created_at,karma,last_battle_time,leveling_points,leveling_tier,private.credits,private.free_xp,private.gold,statistics.battles,statistics.club.draws,statistics.club.losses,statistics.club.wins&access_token=' + this.token, {}, {}).then(data => {
        alert(JSON.parse(data.data).data);
       });
    });
  }

}
