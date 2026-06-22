"use client";
import { createContext, useEffect, useState } from "react";
import { axiosPublic } from "@/lib/axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // কে লগইন আছে সেটা সবসময় খেয়াল রাখে
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    if (currentUser?.email) {
      // login করা আছে → কার্ড নাও আর রেখে দাও
      const res = await axiosPublic.post("/jwt", { email: currentUser.email });
      localStorage.setItem("access-token", res.data.token);
    } else {
      // logout → কার্ড মুছে দাও
      localStorage.removeItem("access-token");
    }
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  const authInfo = { user, loading, createUser, signIn, googleSignIn, updateUserProfile, logOut };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
}