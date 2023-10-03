import { Injectable } from '@nestjs/common';
import * as credentials from '../environments/serviceAccountKeys.json';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { environment } from 'src/environments/environment';
import * as admin from 'firebase-admin';

// https://firebase.google.com/docs/firestore/quickstart#node.js

@Injectable()
export class FirebaseService {
  // https://firebase.google.com/docs/web/setup#available-libraries
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
    // Initialize Firebase
    let keys: admin.ServiceAccount = {};
    const firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(credentials as admin.ServiceAccount),
    });
    this.firestore = getFirestore(firebaseApp);
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
}
