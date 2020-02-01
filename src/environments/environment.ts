// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Envirenment} from './interface';

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCEQ_o6lfjOuBaeiaI8QvlcF_H-nlaLuoo",
    authDomain: "todo-list-bb08c.firebaseapp.com",
    databaseURL: "https://todo-list-bb08c.firebaseio.com",
    projectId: "todo-list-bb08c",
    storageBucket: "todo-list-bb08c.appspot.com",
    messagingSenderId: "259757467615",
    appId: "1:259757467615:web:fdde638c8bf747e254c66a",
    measurementId: "G-Q1FE4YE5M6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
