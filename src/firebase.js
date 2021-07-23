
import firebase from 'firebase';
  import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA22s-uiBzzm6AgbP961Albs32o_xSX13s",
  authDomain: "ecomm-39dbf.firebaseapp.com",
  projectId: "ecomm-39dbf",
  storageBucket: "ecomm-39dbf.appspot.com",
  messagingSenderId: "460633402585",
  appId: "1:460633402585:web:f7d389dc20b404beaae2c8",
  measurementId: "G-WEH5HDHHKR"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const dat=firebase.database();
export {auth,db,storage,dat};
