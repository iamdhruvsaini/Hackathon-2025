const { createContext, useContext } = require("react");
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const emailSignup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const emailSignIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    emailSignup,
    emailSignIn,
    googleSignIn,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
