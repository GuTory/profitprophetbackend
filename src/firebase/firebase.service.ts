import { Injectable } from '@nestjs/common';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable()
export class FirebaseService {
  // https://firebase.google.com/docs/web/setup#available-libraries
  private firebaseConfig: FirebaseOptions = {
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
    const firebaseApp = initializeApp(this.firebaseConfig);
    this.firestore = getFirestore(firebaseApp);
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
}
