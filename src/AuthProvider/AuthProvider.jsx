import React, { createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config'

const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // sign up
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // fb sign in
    const fbSignIn = () => {
        return signInWithPopup(auth, facebookProvider);
    };

    // log out
    const logOut = () => {
        return signOut(auth);
    };

    // reset / forget password
    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // get user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        fbSignIn,
        logOut,
        resetPass,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;