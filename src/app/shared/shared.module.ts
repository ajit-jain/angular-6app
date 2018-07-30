import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NotConnectedComponent } from './components/not-connected/not-connected.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [SignupComponent, LoginComponent, AuthComponent, AutofocusDirective, NotConnectedComponent],
  exports: [AuthComponent, AutofocusDirective]
})
export class SharedModule { }
