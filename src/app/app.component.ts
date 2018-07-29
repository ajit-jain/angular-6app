import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { CookieService } from './shared/services/cookie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token = '';
  isHideBar = false;
  constructor(private _cookieService: CookieService, private activeRoute: ActivatedRoute,
    private _userService: UserService, private router: Router, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.token = this._cookieService.readCookie('token');
    if (this.token && !this._userService.user['email']) {
      this.setUser();
    }
    // if (token) {
    //   window.location.href = `${environment.APP_PROTOCOL}${environment.APP_EXTENSION}/dashboard`; 
    // }
    this.router.events.subscribe((event) => {
      if (location.pathname.includes('/site/addSplitii')) {
        this.isHideBar = true;
      } else {
        this.isHideBar = false;
      }
    });

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
  transform(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }
}
