import {
  FirebaseApp,
  FirebaseOptions,
  getApps,
  initializeApp,
} from "firebase/app";
import { Auth } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as firebaseAuth from "firebase/auth";

// --------------------------------------------- Create a private Context
interface FirebaseContextProps {
  app: FirebaseApp | null;
  setApp: (app: FirebaseApp | null) => void;
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
  firebaseConfig: FirebaseOptions | null;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

// --------------------------------------------- Create a public Context Provider

interface FirebaseContextProviderProps {
  firebaseConfig: FirebaseOptions;
  children: ReactNode;
}

export function FirebaseContextProvider({
  children,
  firebaseConfig,
}: FirebaseContextProviderProps) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig!);
    setApp(app);

    const auth = firebaseAuth.initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    setAuth(auth);
  }, []);

  const context: FirebaseContextProps = {
    app,
    setApp,
    auth,
    setAuth,
    firebaseConfig,
  };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
}

// --------------------------------------------- Create a public hook

// temporary typescript fix for firebase v10.x import
const getReactNativePersistence = (firebaseAuth as any)
  .getReactNativePersistence;

export function useFirebaseContext() {
  const context = useContext<FirebaseContextProps | undefined>(FirebaseContext);

  if (context === undefined) {
    throw new Error(
      "useFirebaseContext must be used in a child of FirebaseContextProvider!"
    );
  }

  return {
    app: context.app,
    auth: context.auth,
  };
}
