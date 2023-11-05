import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../../common/service/firebase/firebase.service';
import {
  DocumentData,
  FirestoreDataConverter,
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from '@firebase/firestore';
import { UserInterface } from '../../model/user.interface';

const UserInterfaceConverter: FirestoreDataConverter<UserInterface> = {
  toFirestore: (user: UserInterface): DocumentData => {
    console.log(user);
    return { ...user };
  },
  fromFirestore: (docSnap) => {
    console.log(docSnap);
    return docSnap.data() as UserInterface;
  },
};

@Injectable()
export class AuthService {
  private readonly collection;
  private isAuthenticated = false;
  private currentUser: UserInterface | null = null;

  constructor(private firebaseService: FirebaseService) {
    this.collection = collection(
      firebaseService.getFirestore(),
      'users',
    ).withConverter(UserInterfaceConverter);
  }

  async authenticateUser(user: UserInterface): Promise<UserInterface | null> {
    let resUser: UserInterface | null = null;
    const q = query(
      this.collection,
      where('email', '==', user.email),
      limit(1),
    );
    const fetchedUser = await getDocs(q);
    fetchedUser.forEach((doc) => {
      resUser = this.loginUser(doc.data() as UserInterface);
    });
    if (resUser === null) {
      await this.createUser(user);
    }
    return resUser;
  }

  async createUser(user: UserInterface) {
    const addedUser = await addDoc(this.collection, user);
    if (addedUser) {
      this.loginUser(user);
    }
  }

  async logout(user: UserInterface) {
    this.isAuthenticated = false;
    this.currentUser = null;
    return user;
  }

  private loginUser(user: UserInterface): UserInterface {
    this.currentUser = user;
    this.isAuthenticated = true;
    return user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
