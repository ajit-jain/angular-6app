import { CookieService } from './shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token = '';
  constructor(private _cookieService: CookieService) {

  }
  ngOnInit() {
    this.token = this._cookieService.readCookie('token');
    // if (token) {
    //   window.location.href = `${environment.APP_PROTOCOL}${environment.APP_EXTENSION}/dashboard`; 
    // }
  }
  isUserLoggedIn(){
    return this._cookieService.readCookie('token');
  }
}
