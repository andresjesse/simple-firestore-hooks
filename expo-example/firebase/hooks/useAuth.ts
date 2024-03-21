import { useEffect, useState } from "react";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import useFirebase from "./useFirebase";

/**
 * Firebase authentication hook.
 * @returns Access to main auth service using email and password strategy, plus user object and loading state flag.
 */
export default function useAuth() {
  const { auth } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Wrapper for login users with loading state flag for conditional renders.
   * @param email An active user registered in your firebase project.
   * @param password User's password.
   */
  const login = async (email: string, password: string) => {
    if (!auth)
      throw new Error("Auth not initialized in FirebaseContextProvider!");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Wrapper for logout users.
   */
  const logout = async () => {
    if (!auth)
      throw new Error("Auth not initialized in FirebaseContextProvider!");

    await signOut(auth);
  };

  /**
   * Wrapper for creating new Users
   * @param email user email
   * @param password user password (min 6 chars)
   */
  const registerUser = async (email: string, password: string) => {
    if (!auth)
      throw new Error("Auth not initialized in FirebaseContextProvider!");

    await createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }
  }, [auth]);

  return { loading, user, login, logout, registerUser };
}
