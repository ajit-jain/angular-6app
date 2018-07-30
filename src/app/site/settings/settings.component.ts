import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  constructor(private _cookieService: CookieService, private router: Router,
    private _fb: FormBuilder, public _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
    this._userService.userData.subscribe((data) => {
      if (data) {
        this.settingsForm = this._fb.group({
          email: [data['email'], [Validators.required, Validators.email]],
          partner_email: [data['partner_email'], [Validators.required, Validators.email]],
          name: [data['name'], [Validators.required]]
        });
      }
    });

  }
  async logout() {
    // this._cookieService.eraseCookie('token');
    await this._authService.signOut();
    this.router.navigate(['/']);
  }

}
