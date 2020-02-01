import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../interfaces';
import {catchError, switchAll, tap, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { Router } from "@angular/router";


import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';


@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  public  error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
  ) {
  }

  get token():string{
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate){
      this.logout();
      return null
    }
    return localStorage.getItem('fb-token')
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => this.updateUserData(data.user))
      .then(() => console.log('Welcome, your account has been created!'))
      .then(() => {
        this.afAuth.auth.currentUser
          .sendEmailVerification()
          .then(() => console.log('We sent you an email verification'))
          .catch(error => console.log(error.message));
      })
      .catch(error => console.log(error.message));
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return  !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error;
    switch(message){
      case 'INVALID_EMAIL':
        this.error$.next('Неправильний email!');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неправильний пароль!');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Даного email не існує!');
        break
    }

    return throwError(error)
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      password: user.password,
      displayName: user.displayName,
      roles: {
        editor: true
      }
    };
    return userRef.set(data, {merge: true});
  }
}
