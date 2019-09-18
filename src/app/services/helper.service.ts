import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HelperService {
  constructor() {}

  getTimeString(timestamp: any) {
    return new Date(Number(timestamp) * 1000).toLocaleString().replace(",", "");
  }
  parseHTMLFD(html: string) {
    let arr: any[] = [];
    while(html.includes('<tr')) { 
      let sub: string = html.substring(html.indexOf('<tr') + 3, html.indexOf('</tr>') + 1);
      sub = sub.substring(sub.indexOf('>') + 1, sub.length-1);
      console.log(sub);
      let desc: string = sub.substring(sub.indexOf('<p>')+3, sub.indexOf('</p>'));
      let val: string = sub.substring(sub.indexOf('<spandata-reactid='), sub.indexOf('</span>'));
      val = val.substring(val.lastIndexOf('>')+1, val.length);
      console.log(desc);
      console.log(val);
      html = html.substr(html.indexOf('</tr>') + 5, html.length - html.indexOf('</tr>'));
      arr.push({'key': val, 'desc': desc})
    }
    return arr;
  }
}
