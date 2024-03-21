# Simple-Firestore-Hooks with Expo

This example app uses `simple-firestore-hooks` with Expo and Expo. Expo Router is applied for navigation.

## Before execute

1. Create a firestore project in your account, enable Auth with email and password and add the following user:

- email: user@example.com, password: 123456

2. In your firebase project, enable the Web SDK, and copy your credentials to `config/firebaseConfig.ts`

## Want to study this code? where to start?

1. Check `app/index.tsx` for `useAuth` example of usage for login.

2. Check `components/HeaderRight.tsx` for `useAuth` example of usage for logout.

3. Check `app/home/index.tsx` for `useCollection` example.

4. Check `app/home/[id]/index.tsx` for `useDocument` example.

## Additional reference for firebase and expo

https://docs.expo.dev/guides/using-firebase/
