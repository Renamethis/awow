import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HTTP, private iab: InAppBrowser) {
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
// tslint:disable-next-line:max-line-length
    const browser = this.iab.create('https://api.worldoftanks.ru/wot/auth/login/?application_id=8e1ae50869c452ec624476262bb20f0d&expires_at=1566512595&application_id=8e1ae50869c452ec624476262bb20f0d&display=page&redirect_uri=https://google.com', '_blank', {fullscreen: 'yes'});
    browser.on('loadstart').subscribe(event => {
        if (event.url.substr(0, event.url.indexOf('?')) === 'https://google.com/') {
            alert(event.url);
            // tslint:disable-next-line:max-line-length
            alert(event.url.substr(event.url.indexOf('access_token=') + 13, event.url.length - event.url.substr(event.url.indexOf('access_token=') + 13, event.url.substr(0, event.url.indexOf('access_token=') + 13).length).length - event.url.substr(event.url.indexOf('&nickname'), event.url.length).length));
            browser.close();
        }
    });
  }

}
