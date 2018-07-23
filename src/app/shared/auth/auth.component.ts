import { CookieService } from 'src/app/shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = 'signup';
  constructor(private _cookieService:CookieService,private _router:Router) { }

  ngOnInit() {

  }
  changeAuthType(type) {
    this.authType = type;
  }
  redirectToSite(details) {
    this._cookieService.createCookie('token', btoa(JSON.stringify(details)), 3);
    this._router.navigate(['/site']);
  }
}
