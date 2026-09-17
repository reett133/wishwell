// ============================================================
// PASTE YOUR OWN FIREBASE PROJECT CONFIG HERE.
// You'll get this from: Firebase Console -> Project settings ->
// General tab -> "Your apps" -> the web app -> SDK setup and
// configuration -> Config. See README.md for the full walkthrough.
// ============================================================
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

// The email used for Reet's login. Firebase Auth needs an email shape,
// but it never has to receive real mail - see README.md step 3.
const REET_EMAIL = "reet@wishwell.app";

// Fixed document path for the one wishlist this app manages.
const WISHLIST_ID = "reet";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
