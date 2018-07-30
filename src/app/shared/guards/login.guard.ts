import { map, tap, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../services/auth.service';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _cookieService: CookieService, private router: Router,
    private authService: AuthService,
    public fireauth: AngularFireAuth) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.authService.isUserEmailLoggedIn) {
    //   return true;
    // }
    // this.router.navigate(['/site']);
    // return false;
    return this.fireauth.authState.pipe(
      take(1),
      map(user => !user),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          console.log("access-denied");
          this.router.navigate(['/site']);
          return false;
        }else{
          return true;
          
        }
      })
    );
  }
}
