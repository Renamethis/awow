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
    token: string;
    uri:any;
  constructor(private http: HTTP, private iab: InAppBrowser, private storage: Storage) {
    storage.get('token').then(value => {
       if (value == null) {
           // tslint:disable-next-line:max-line-length
           const browser = this.iab.create('https://api.worldoftanks.ru/wot/auth/login/?application_id=8e1ae50869c452ec624476262bb20f0d&expires_at=1568200768&display=page&redirect_uri=https://google.com', '_blank', {fullscreen: 'yes'});
           browser.on('loadstart').subscribe(event => {
               if (event.url.substr(0, event.url.indexOf('?')) === 'https://google.com/') {
                   // tslint:disable-next-line:max-line-length
                   this.token = event.url.substr(event.url.indexOf('access_token') + 13, event.url.indexOf('&nickname')-(event.url.indexOf('access_token')+13));
                   storage.set('token', this.token);
                   browser.close();
               }
           });
       } else {
           this.token = value;
           alert(this.token);
           this.http.post('https://api.worldoftanks.ru/wot/auth/prolongate/?application_id=8e1ae50869c452ec624476262bb20f0d', {'access_token' : this.token, 'expires_at': '1568200768'}, {'Content-Type': 'application/json'}).then(data => {
                alert(data.data);
           });
        }
    });
  }

}
