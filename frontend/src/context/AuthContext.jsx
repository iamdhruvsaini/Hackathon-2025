import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import Loading from "@/components/Loading";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/Password Sign-Up
  const emailSignup = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email sign-up error:", error);
      throw error;
    }
  };

  // Email/Password Sign-In
  const emailSignIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email sign-in error:", error);
      throw error;
    }
  };

  // Google Sign-In
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL, uid } = user;
        // Store only what you need
        setCurrentUser({
          uid,
          email,
          username: displayName,
          photo: photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Value provided to consuming components
  const value = {
    emailSignup,
    emailSignIn,
    googleSignIn,
    logout,
    currentUser,
    loading,
  };

  // If still loading, you can render a spinner or fallback
  if (loading) {
    return <Loading></Loading>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
