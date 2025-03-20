'use client';

import { DocumentData, doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '@/firebase';

interface AuthContextType {
  currentUser: User | null;
  userDataObject: DocumentData | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  setUserDataObject: React.Dispatch<React.SetStateAction<DocumentData | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataObject, setUserDataObject] = useState<DocumentData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string): Promise<void> => {
    console.log('I AM SIGNING UP');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserDataObject(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const fetchUserData = async (user: User): Promise<void> => {
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDataObject(docSnap.data());
      } else {
        console.log('No user data found in Firestore.');
        setUserDataObject(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserDataObject(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);
        if (user) {
          await fetchUserData(user);
        } else {
          setUserDataObject(null);
        }
      } catch (error) {
        console.error('Error during auth state change:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDataObject,
    setUserDataObject,
    signup,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
