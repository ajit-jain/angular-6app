import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { CookieService } from './shared/services/cookie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token = '';
  constructor(private _cookieService: CookieService,
    private _userService: UserService, private router: Router) {

  }
  ngOnInit() {
    this.token = this._cookieService.readCookie('token');
    if (this.token && !this._userService.user['email']) {
      this.setUser();
    }

    // if (token) {
    //   window.location.href = `${environment.APP_PROTOCOL}${environment.APP_EXTENSION}/dashboard`; 
    // }
  }
  isUserLoggedIn() {
    return this._cookieService.readCookie('token');
  }
  async setUser() {
    try {
      await this._userService.setUserbyToken(this.token);
    } catch (e) {
      this._cookieService.eraseCookie('token');
      this.router.navigate(['/']);
    }
  }

}
