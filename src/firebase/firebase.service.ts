import { Injectable } from '@nestjs/common';
import * as credentials from '../environments/serviceAccountKeys.json';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
// import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firebaseConfig = {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId,
    measurementId: environment.measurementId,
  };
  private readonly firestore: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    /*
    const firebaseApp = initializeApp({
      credential: credential.cert(credentials as admin.ServiceAccount),
    });
     */
    this.firestore = getFirestore(app);
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
}
