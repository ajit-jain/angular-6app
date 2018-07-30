import { map,take,tap } from 'rxjs/operators';
import { UserService } from './../services/user.service';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _cookieService: CookieService, private _authService: AuthService,
    private router: Router, private userService: UserService, public fireauth: AngularFireAuth) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this._cookieService.readCookie('token'));
    // if (this._authService.isUserEmailLoggedIn) {
    //   return true;
    // }
    // this.router.navigate(['/']);
    // return false;
    return this.fireauth.authState.pipe(
      take(1),
      map(user => !!user),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          console.log("access-denied");
          this.router.navigate(['/']);
        }
      })
    );
  }
}
