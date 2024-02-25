import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { 
  getStorage
} from "firebase/storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyAIFe818zWJpMAfL3KX6Lficl925eBJZqs",
    authDomain: "aimee-145d0.firebaseapp.com",
    projectId: "aimee-145d0",
    storageBucket: "aimee-145d0.appspot.com",
    messagingSenderId: "377816724566",
    appId: "1:377816724566:web:365c1e017df65cbbbd77f7",
  };
const firebaseApp = initializeApp(firebaseConfig);
initializeAuth(firebaseApp, {
persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth();
const db = getFirestore();
const fbStorage = getStorage();


// getDocs('/OnlineClass').then((x)=>console.log(x))

export {auth, db, fbStorage}