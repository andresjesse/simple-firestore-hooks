# Simple Firestore Hooks

This is not a production-ready library, I use it as a didactic project! But feel free to copy/use/improve those hooks for your projects.

The [hooks](hooks/) folder contains hooks that abstract some Firestore/Auth features and provide a nice way to integrate those services to react apps.

There are already libs that does a good job for that, such as [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) and [reactfire](https://github.com/FirebaseExtended/reactfire), so why build a new one?

- No data mutations (just read/query hooks);
- No semantic CRUD's;
- (almost) no types for Document collections;
- And... Why not?

## Usage

1. Copy [hooks](hooks/) and [config](config/) folders to your project;

2. Create a firebase app (I'll not cover that) and add Firestore + Auth services (also enable login with email/password and add a user to start testing): https://firebase.google.com/

3. In your application entry point initialize firebase with `useFirebase` hook, e.g. `App.tsx` for a react js project:

```js
import firebaseConfig from "@/config/firebaseConfig";
import useFirebase from "@/hooks/useFirebase";
import Router from "@/pages/Router";

function App() {
  const firebaseApp = useFirebase(firebaseConfig);

  if (firebaseApp == null) return <div>Loading...</div>;

  return <Router />;
}

export default App;
```

4. About the `useAuth` hook:

```js
// You can extract the following properties:
const { loading, user, login, logout } = useAuth();

// loading is a boolean state that can be used for returning Loading screen placeholders:
if (loading) return <div>Loading...</div>;

// user is an object that contains user profile if logged in or null otherwise:
console.log(user);

// login is an async function that wraps signInWithEmailAndPassword from firebase auth service:
await login("user@email.com", "123456");

// logout is an async function that wraps firebase auth logout function:
await logout();
```

## Complex Example

Want a more detailed example of usage? Check out this repository: https://github.com/andresjesse/cra-firebase-experiment
