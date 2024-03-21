<!-- prettier-ignore-start -->
# Simple Firestore Hooks

This is not a production-ready library, I use it as a didactic project! But feel free to copy/use/improve those hooks for your projects.

The [firebase](expo-example/firebase/) folder contains hooks that abstract some Firestore/Auth features and provide a nice way to integrate those services to React apps. 

There are already libs that does a good job for that, such as [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) and [reactfire](https://github.com/FirebaseExtended/reactfire), so why build a new one?

- No data mutations (just read/query hooks);
- No semantic CRUD's;
- (almost) no types for Document collections;
- And... Why not?

## Usage

This guide covers usage with Expo/React Native. If you want to use on web, the hooks probably will work without changes. The `useFirebase` hook (base for the other ones), otherwise, can require a little change to remove the AsyncStorage persistency. You can check a working web code in the branch [firebase-v9](https://github.com/andresjesse/simple-firestore-hooks/tree/firebase-v9), it uses an old version of this code and work(ed) well on React JS.

1. Copy [firebase](expo-example/firebase/) folder to your project;

2. Create a firebase app (I'll not cover that) and add Firestore + Auth services (also enable login with email/password and add a user to start testing): https://firebase.google.com/

3. In your firebase app, create a Web App and copy `firebaseConfig` object to `config/firebaseConfig.ts` (I let a sample file, `firebaseConfig.example.ts` that can be base for your config file).

4. Install dependencies:

- Firebase JS SDK: `npx expo install firebase`
- AsyncStorage: `npx expo install @react-native-async-storage/async-storage`
- Zustand: `npx expo install zustand`

5. Check usage details for the context and hooks in the sequence:

- [`useAuth`](#the-useAuth-hook)
- [`useCollection`](#the-useCollection-hook)
- [`useDocument`](#the-useDocument-hook)
- [`useFirebase`](#the-useFirebase-hook)

### The `useAuth` hook

This hook wraps basic functions from the firebase Auth service.

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

### The `useCollection` hook

This hook uses firestore database under the hood and provide, among other functions, access to Create, Read, Update and Delete helper functions.

```js
// useCollection is typescript friend, so you need to declare a type for your collection, e.g.:
type Book = {
  id?: string;
  title: string;
  pages: number;
};

// useCollection can be initialized with the following args:
useCollection<Book>(
  collectionName: string, // name of the firestore collection, e.g. "books"
  precache = true // the entire collection data should be loaded at initialization? default is true
)

// You can also use it for nested collections, e.g.: get chapters from a book with a given id:
useCollection<Chapter>(`books/${id}/chapters`);

// You can extract the following properties:
const { data, loading, create, remove, update, all, refreshData } = useCollection<Book>("books");

// data is an array of the collection type, e.g. Array<Book>. You can yse it as it is, e.g.:
data.map(book => <div>{book.title}</div>)

// loading is a boolean state that can be used for returning Loading screen placeholders:
if (loading) return <div>Loading...</div>;

// create is a helper function used to create a new document and add it the collection:
const generatedId = await create({
  title: "Book Title",
  pages: 204,
  // note that ID is auto-generated and returned after document creation!
});

// Tip: avoid precaching when you don't need data access (e.g. to get a "create" reference)
const { create } = useCollection<Book>("books", false);

// remove is a helper function used to delete a document from the collection:
await remove(book.id);

// update is a helper function used to update an existing document. The entire document is always overriden!!
await update(book.id, {
  ...book, // note that the "old" object can be sent as a base arg so you can do partial updates
  title: "Updated title:" + Math.random(), // a property and an updated value
});

// Tip: your screen may need to refresh after updating a document, you can force it to re-fetch collection data:
await refreshData();

// all is a helper function used to fetch the entire collection.
// It has the same effect as precaching, but you can call on-demand (useful when precaching is disabled):
const data = await all();
```

### The `useDocument` hook

This hook enables you to access and manage an specific document from a collection.

```js
// useDocument can be initialized with the following args:
useDocument<Book>(
  collectionName: string, // collection name, can be a nested collection
  id: string, // document id. You can also force an ID here to create manual id's.
  realtime: boolean = true // should this document be monitored in realtime? (it's nice, try it!). default is true.
)

// You can extract the following properties:
const { data, loading, upsert, refresh } = useDocument("books", bookId)

// data is an object of the collection type, e.g. Book. You can yse it as it is, e.g.:
console.log(data.title)

// loading is a boolean state that can be used for returning Loading screen placeholders:
if (loading) return <div>Loading...</div>;

// upsert is a mixed operation "update or insert". The arg document will be created if not exists, updated otherwise.
const documentId = await upsert({
  ...data,
  title: "Random title upsert " + Math.random(),
});

// refresh is a helper function to re-fetch document data. useful when realtime is disabled.
await refresh();

```

### The `useFirebase` hook

This hook is used internally by other hooks to manage firebase and auth instances using a zustand store. You don't need to use it.

## React JS Example (firebase V9)

Want a more detailed example of usage? Check out this repository (React JS): https://github.com/andresjesse/cra-firebase-experiment

This one can also be explored (full functional application): https://github.com/andresjesse/sd-mvp-social-care 

<!-- prettier-ignore-end -->
