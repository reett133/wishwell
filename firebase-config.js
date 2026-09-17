// ============================================================
// PASTE YOUR OWN FIREBASE PROJECT CONFIG HERE.
// You'll get this from: Firebase Console -> Project settings ->
// General tab -> "Your apps" -> the web app -> SDK setup and
// configuration -> Config. See README.md for the full walkthrough.
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyCiwppMuKqFux8gIBXhTonyMjQ-fv9-gI4",
  authDomain: "wishwell-riri.firebaseapp.com",
  projectId: "wishwell-riri",
  storageBucket: "wishwell-riri.firebasestorage.app",
  messagingSenderId: "779122226506",
  appId: "1:779122226506:web:f8b210bef261251ab0bdb3"
};

// The email used for Reet's login. Firebase Auth needs an email shape,
// but it never has to receive real mail - see README.md step 3.
const REET_EMAIL = "reet@wishwell.app";

// Fixed document path for the one wishlist this app manages.
const WISHLIST_ID = "reet";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
