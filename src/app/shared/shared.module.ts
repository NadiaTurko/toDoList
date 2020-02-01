import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
@NgModule({
  imports: [HttpClientModule,
  AngularFireAuthModule],
  exports: [HttpClientModule]
})

export class SharedModule {

}
