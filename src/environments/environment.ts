// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_EXTENSION: 'localhost',
  firebase: {
    apiKey: 'AIzaSyAmGW_Fts3KWy4jEdm7P60UhyNdeief3js',
    authDomain: 'my-firebase-app-85331.firebaseapp.com',
    databaseURL: 'https://my-firebase-app-85331.firebaseio.com',
    projectId: 'my-firebase-app-85331',
    storageBucket: 'my-firebase-app-85331.appspot.com',
    messagingSenderId: '804854701047'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
