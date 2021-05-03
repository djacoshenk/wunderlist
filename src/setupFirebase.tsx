import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAs4Aq9TxAOcH57ZNH6Cl80eLRZAWzefTM',
  authDomain: 'wunderlistme.firebaseapp.com',
  projectId: 'wunderlistme',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const provider = firebase.auth.EmailAuthProvider;

export const firestore = firebase.firestore();

export default firebase;
