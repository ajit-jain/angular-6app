import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { environment } from './../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './shared/guards/login.guard';
import { SiteModule } from './site/site.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthComponent } from 'src/app/shared/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { NotConnectedComponent } from 'src/app/shared/components/not-connected/not-connected.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
const routing: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'site',
    loadChildren: './site/site.module#SiteModule'
  },
  {
    path: 'not-connected',
    component: NotConnectedComponent,
    canActivate: [AuthGuard]
  }
];
const routes: ModuleWithProviders = RouterModule.forRoot(routing);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    routes,
    SharedModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
