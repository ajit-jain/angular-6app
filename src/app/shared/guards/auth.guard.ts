import { UserService } from './../services/user.service';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _cookieService: CookieService, private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this._cookieService.readCookie('token'));
    if (this._cookieService.readCookie('token')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
