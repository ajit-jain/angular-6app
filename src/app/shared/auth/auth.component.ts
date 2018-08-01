
import { UserService } from './../services/user.service';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = 'signup';
  constructor(private _cookieService: CookieService, private _router: Router,
    private authService: AuthService, private _userService: UserService) { }
  error: string;
  ngOnInit() {

  }
  changeAuthType(type) {
    this.authType = type;
  }
  redirectToSite(details) {
    this._userService.userData.next(this._userService.user);
    this._router.navigate(['/site']);
  }
}
