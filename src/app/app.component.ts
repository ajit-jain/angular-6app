import { AuthService } from './shared/services/auth.service';
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
  activeTab = 'dashboard';
  isHideBar = false;
  constructor(private _cookieService: CookieService, private activeRoute: ActivatedRoute,
    private _userService: UserService, private router: Router, private sanitizer: DomSanitizer,
    public _authService: AuthService) {

  }
  ngOnInit() {
    this.token = this._cookieService.readCookie('token');
    this.router.events.subscribe((event) => {
      if (location.pathname.includes('/site/addSplitii') || location.pathname.includes('/not-connected')) {
        this.isHideBar = true;
      } else {
        this.isHideBar = false;
      }
      this.checkForActiveTab(location.pathname);
    });
    this._userService.userData.subscribe((data) => {
      if (data) {
        this._userService.getUser(data['partner_email']).then(d => {
          // if (!d) {
          //   this.isHideBar = true;
          //   this.router.navigate(['/not-connected']);
          // }
        });
      }
    });
  }
  checkForActiveTab(path) {
    if (path.includes('/site/dashboard')) {
      this.activeTab = 'dashboard';
    } else if (path.includes('/site/settings')) {
      this.activeTab = 'settings';
    }
  }
  isUserLoggedIn() {
    return this._cookieService.readCookie('token');
  }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }
}
