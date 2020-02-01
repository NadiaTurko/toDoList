import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ListPageComponent} from './list-page/list-page.component';
import {SingUpComponent} from './admin/sing-up/sing-up.component';
import {ProfileComponent} from './admin/profile/profile.component';
import {LoginPageComponent} from './admin/login-page/login-page.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin/list', component: ListPageComponent, canActivate: [AuthGuard] },
  { path: 'user/login', component: LoginPageComponent },
  { path: 'user/sing-up', component: SingUpComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
