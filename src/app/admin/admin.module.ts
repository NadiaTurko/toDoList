import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/services/auth.guard';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import {MaterialModule} from '../material.module';
import { ProfileComponent } from './profile/profile.component';
import {AppModule} from '../app.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    SingUpComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'sing-up', component: SingUpComponent},
        ]
      }
    ]),
    MaterialModule,
  ],
    exports: [
        RouterModule,
        AdminLayoutComponent,
        LoginPageComponent
    ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AdminModule {

}
