import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const prodConfig = {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};

const devConfig = {
    apiKey: process.env.REACT_APP_DEV_API_KEY,
    authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
    projectId: process.env.REACT_APP_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    user = userid => this.db.ref(`users/${userid}`); // define current user path for db

    /*
        Auth methods
    */

    createUserByMail = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInByMail = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
    signOut = () =>
        this.auth.signOut();
    
    resetPassword = email =>
        this.auth.sendPasswordResetEmail(email);
    
    updatePassword = password =>
        this.auth.currentUser.updatePassword(password);

    createUser = (username, email, userid) =>
        this.user(userid).set({ username, email, picture: null });
}

export default Firebase;