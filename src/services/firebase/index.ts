import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from './serviceAccountKey.json';

export class Firebase {
  public admin: admin.app.App;
  private static instance: Firebase;

  private constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  }

  public static getInstance = () => {
    if (!Firebase.instance) Firebase.instance = new Firebase();

    return Firebase.instance;
  };
}
