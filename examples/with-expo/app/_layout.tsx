// This is the app entry point, check Root layout for more details: https://expo.github.io/router/docs/guides/root-layout

import {
  SplashScreen, // Import `SplashScreen` from `expo-router` instead of `expo-splash-screen`
  Slot, // This example uses a basic Layout component, but you can use any Layout.
} from "expo-router";
import useFirebase from "../hooks/useFirebase";
import firebaseConfig from "../config/firebaseConfig";

export default function Layout() {
  // Initialize firebase
  const firebaseApp = useFirebase(firebaseConfig);

  if (!firebaseApp) {
    // The native splash screen will stay visible for as long as there
    // are `<SplashScreen />` components mounted. This component can be nested.

    return <SplashScreen />;
  }

  // Render the children routes now that all the assets are loaded.
  return <Slot />;
}
