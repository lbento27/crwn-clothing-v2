import { initializeApp } from 'firebase/app';
/*eslint-disable*/
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'; /*eslint-enable*/

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC9O46IYMAUDJAnFAyzpu62jtO6Vf4YIhA',
  authDomain: 'crwn-clothing-v2-190d1.firebaseapp.com',
  projectId: 'crwn-clothing-v2-190d1',
  storageBucket: 'crwn-clothing-v2-190d1.appspot.com',
  messagingSenderId: '818311401882',
  appId: '1:818311401882:web:783ebb0c531dc67ecbaa23',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // eslint-disable-line

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//other method for sign in
//export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider);

export const db = getFirestore(); //create db

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid); //users collection, document-uid we get from the object we receive when click in login with google button
  //console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef); // we can check if a instance exist with the method .exist() and access the data
  //console.log(userSnapShot);

  //if user data does not exists
  //create/set the document with the data from userAuth in my collection
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //set document
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists
  return userDocRef;
  //return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}; //runs the callback every time the user signs in or out

//send our data to database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//retrieve data from database
/*{
  hats:{
    title:'Hats',
    items: [{},{}]
  }
}
*/
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  //querySnapshot.docs this gives us the documents but we want in the format above so:
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};
