import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/shared/services/cookie.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private _cookieService:CookieService,private router:Router) { }

  ngOnInit() {
  }
  logout(){
    this._cookieService.eraseCookie('token');
    this.router.navigate(['/']);
  }

}
