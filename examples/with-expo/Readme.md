# Simple-Firestore-Hooks with Expo

This example app uses `simple-firestore-hooks` with Expo and Expo. Expo Router is applied for navigation.

## Before execute

1. Create a firestore project in your account, enable Auth with email and password and add the following user:

- email: user@example.com, password: 123456

2. In your firebase project, enable the Web SDK, and copy your credentials to `config/firebaseConfig.ts`

## Want to study this code? where to start?

1. Check `app/_layout.tsx` for `useFirebase` example of usage. This project is using expo-router SplashScreen for initial loading.

2. Check `app/index.tsx` for `useAuth` example of usage for login.

## Additional reference for firebase and expo

https://docs.expo.dev/guides/using-firebase/
