// Global store for firebase and auth instances

import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { create } from "zustand";

type FirebaseStoreProps = {
  app: FirebaseApp | null;
  auth: Auth | null;
  setApp: (app: FirebaseApp | null) => void;
  setAuth: (auth: Auth | null) => void;
};

const useFirebaseStore = create<FirebaseStoreProps>()((set) => ({
  app: null,
  auth: null,
  setApp: (app: FirebaseApp | null) => set(() => ({ app })),
  setAuth: (auth: Auth | null) => set(() => ({ auth })),
}));

export default useFirebaseStore;
