import { AuthService } from './../shared/services/auth.service';
import { UserService } from './../shared/services/user.service';
import { CookieService } from './../shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService, private _userService: UserService) { }

  ngOnInit() {
    if (this._authService.isUserEmailLoggedIn && !this._userService.user['email']) {
      jQuery('#overlay').show();
      this.setUser();
    }
    const address = window.location.href;
    const childRoute = address.split('/');
    let isChildRoute = false;
    for (let i = 0; i <= childRoute.length; i++) {
      if (['dashboard', 'settings', 'addSplitii'].includes(childRoute[i])) {
        isChildRoute = true;
        break;
      }
    }
    if (!isChildRoute) {
      this._router.navigate(['/site/dashboard']);
    }
  }
  async setUser() {
    try {
      await this._userService.setUserbyToken(this._authService.currentUserName);
    } catch (e) {
      // this._cookieService.eraseCookie('token');
      this._router.navigate(['/']);
    }
  }
}
