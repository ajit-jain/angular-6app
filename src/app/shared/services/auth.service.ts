import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/shared/services/cookie.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  $authSubscriber;
  constructor(private afAuth: AngularFireAuth,
    private router: Router, private _cookieService: CookieService) {

    this.$authSubscriber = this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this._cookieService.createCookie('token', btoa(JSON.stringify(this.authState)), 3);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this._cookieService.createCookie('token', btoa(JSON.stringify(this.authState)), 3);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut(): void {
    this.$authSubscriber.unsubscribe();
    this.afAuth.auth.signOut().then(() => {
      this._cookieService.eraseCookie('token');
      this.router.navigate(['/']);

    }).catch(e => {
      console.log(e);
    });
  }
}
