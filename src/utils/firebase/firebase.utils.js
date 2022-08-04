import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCA1ICcAD_IVzR4JgxriEkRoBuX3_lEDo",
    authDomain: "crown-db-84121.firebaseapp.com",
    projectId: "crown-db-84121",
    storageBucket: "crown-db-84121.appspot.com",
    messagingSenderId: "432114030138",
    appId: "1:432114030138:web:de5ffc7044228b2f51c703"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch(error) {
        console.log('Error while creating user with Firestore', error);
      }
    }

    return userDocRef;
  }