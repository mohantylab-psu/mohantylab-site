import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQHKYrfGpg9i6iyV2YrrK3c_eX9xUCnbg',
  authDomain: 'mohanty-b186b.firebaseapp.com',
  projectId: 'mohanty-b186b',
  storageBucket: 'mohanty-b186b.firebasestorage.app',
  messagingSenderId: '31767865144',
  appId: '1:31767865144:web:26d62dd560c12189ae03cd',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
