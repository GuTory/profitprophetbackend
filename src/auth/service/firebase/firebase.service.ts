import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
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
    this.firestore = getFirestore(app);
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
}
