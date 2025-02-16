// 'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

console.log('api key', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log('auth Domain', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'tektoss-d83df.appspot.com',
  messagingSenderId: '897386202691',
  appId: '1:897386202691:web:8ec147d26f9ca63777f6f6',
  measurementId: 'G-E54BY8C0GE',
};


// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;