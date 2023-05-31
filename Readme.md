<!-- prettier-ignore-start -->
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

3. In your firebase app, create a Web App and copy `firebaseConfig` object to `config/firebaseConfig.ts`.

4. Install firebase library:

- For expo apps: `npx expo install firebase`

- For web apps (react js): `yarn add firebase`

5. Check usage details for each hook in the sequence:

- [`useFirebase`](#the-useFirebase-hook)
- [`useAuth`](#the-useAuth-hook)
- [`useCollection`](#the-useCollection-hook)
- [`useDocument`](#the-useDocument-hook)

### The `useFirebase` hook

This hook initializes firebase services for your client runtime. 

In your application entry point initialize firebase with `useFirebase` hook, e.g. `App.tsx` for a react js project:

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

## Complex Example

Want a more detailed example of usage? Check out this repository: https://github.com/andresjesse/cra-firebase-experiment

# Development

This section regards to hooks development and can be useful if you want to fork, extend or contribute to this project.

Here are some notes:
- Console outputs were disabled in testing environment, you can re-enable it in `.env.test` (useful when writting tests).

<!-- prettier-ignore-end -->
