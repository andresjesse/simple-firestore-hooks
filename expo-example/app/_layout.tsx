import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import Loading from "../components/Loading";
import firebaseConfig from "../firebase/config/firebaseConfig";
import {
  FirebaseContextProvider,
  useFirebaseContext,
} from "../firebase/context/FirebaseContextProvider";
import useAuth from "../firebase/hooks/useAuth";

function FirebaseWrapper() {
  const router = useRouter();
  const { app } = useFirebaseContext();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (!app) return <Loading />;

  return <Slot />;
}

export default function _layout() {
  return (
    <FirebaseContextProvider firebaseConfig={firebaseConfig}>
      <FirebaseWrapper />
    </FirebaseContextProvider>
  );
}
