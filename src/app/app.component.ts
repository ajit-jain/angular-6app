import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { CookieService } from './shared/services/cookie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token = '';
  activeTab = 'dashboard';
  isHideBar = true;
  constructor(private _cookieService: CookieService, private activeRoute: ActivatedRoute,
    private _userService: UserService, private router: Router, private sanitizer: DomSanitizer,
    public _authService: AuthService) {

  }
  ngOnInit() {
    this.token = this._cookieService.readCookie('token');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
        if (location.pathname.includes('/site/addSplitii') || location.pathname.includes('/not-connected') || event.url === '/') {
          this.isHideBar = true;
        } else {
          this.isHideBar = false;
        }
        this.checkForActiveTab(location.pathname);
      }

    });
    if (location.pathname.includes('/not-connected') && !this._userService.user['email']) {
      this.setUser();
    }
    this._userService.userData.subscribe(async (data) => {
      if (data) {
        // jQuery('#overlay').hide();
        console.log("world")
        const partnerRef = await this._userService.getUser(data['partner_email']);
        if (!partnerRef) {
          this.isHideBar = true;
          this.router.navigate(['/not-connected']);
        } else {
          const d = partnerRef.data();
          if (d['email'] === data['partner_email']) {
            this.isHideBar = false;
            this._userService.user['partner_name'] = d['name'];
            const path = location.pathname.split('/');
            (!path[path.length-1] || path[path.length-1]==='/') && this.router.navigate(['/site/dashboard']);
          }
        }
      }
    });
  }
  async setUser() {
    try {
      await this._userService.setUserbyToken(this._authService.currentUserName);
    } catch (e) {
      // this._cookieService.eraseCookie('token');
      this.router.navigate(['/']);
    }
  }
  checkForActiveTab(path) {
    if (path.includes('/site/dashboard')) {
      this.activeTab = 'dashboard';
    } else if (path.includes('/site/settings')) {
      this.activeTab = 'settings';
    }
  }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }
  get isUserLoggedIn(): boolean {
    console.log(this._authService.isUserEmailLoggedIn, this.isHideBar);
    return this._authService.isUserEmailLoggedIn && !this.isHideBar;
  }
}
