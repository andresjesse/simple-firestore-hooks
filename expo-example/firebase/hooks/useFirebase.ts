import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { useEffect } from "react";

import firebaseConfig from "../config/firebaseConfig";
import useFirebaseStore from "../store/useFirebaseStore";

const getReactNativePersistence = (firebaseAuth as any)
  .getReactNativePersistence;

const useFirebase = () => {
  const { setApp, setAuth, app, auth } = useFirebaseStore();

  useEffect(() => {
    if (!app && getApps().length === 0) {
      const app = initializeApp(firebaseConfig);
      setApp(app);

      const auth = firebaseAuth.initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
      setAuth(auth);
    }
  }, []);

  return {
    app,
    auth,
  };
};

export default useFirebase;
