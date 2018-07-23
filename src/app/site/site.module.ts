import { AuthGuard } from './../shared/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { IgxCalendarModule } from 'igniteui-angular';
import { AddSplitiiComponent } from './add-splitii/add-splitii.component';
const routing: Routes = [
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'addSplitii', component: AddSplitiiComponent },

    ]
  }
];
const routes: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  imports: [
    IgxCalendarModule,
    routes,
    CommonModule,
    FormsModule
  ],

  declarations: [SiteComponent, DashboardComponent, SettingsComponent, AddSplitiiComponent],
})
export class SiteModule { }
