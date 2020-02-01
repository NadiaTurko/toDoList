import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user : User = {
    uid: '',
    email: '',
    password: '',
    displayName: '',
    roles: {},
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.displayName = user.displayName;
        this.user.email = user.email;
        this.providerId = user.providerData[0].providerId;
      }
    })
  }


}
