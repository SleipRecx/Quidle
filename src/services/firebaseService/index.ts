import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import "firebase/compat/storage";

const config_string: string | any = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

const firebaseConfig = JSON.parse(config_string);
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error("Firebase initialization error", error.stack);
  }
}

firebase.auth().languageCode = "no";
const db = firebase.firestore();
const fire = firebase.firestore;
const storage = firebase.storage();
const auth = firebase.auth();
const functions = firebase.functions();

const currentUser = auth.currentUser;

class FirebaseService {
  db;

  constructor(db: any) {
    this.db = db;
  }

  add(path: string, object: any) {
    return this.db
      .collection(path)
      .add(object)
      .catch((error: any) => {
        console.error(
          `Couldn't add firebase document: ${object} to collection: ${path}`,
          error
        );
      });
  }

  set(path: string, object: any, settings: any) {
    return this.db
      .doc(path)
      .set(object, settings)
      .catch((error: any) => {
        console.error(
          `Couldn't set firebase document: ${path} with data: ${object}`,
          error
        );
      });
  }
  update(path: string, object: any) {
    return this.db
      .doc(path)
      .update(object)
      .catch((error: any) =>
        console.error(
          `Couldn't update firebase document: ${path} with data: ${object}`,
          error
        )
      );
  }
  getCollection<T>(path: string): Promise<T[]> {
    return this.db
      .collection(path)
      .get()
      .then((collection: any) => {
        //TODO: Do generic processing of collection before resolving promise
        return collection.docs.map(
          (document: any) =>
            ({
              ...document.data(),
              id: document.id,
            } as T)
        ) as T[];
      })
      .catch((error: any) =>
        console.error(`Couldn't get firebase collection: ${path}`, error)
      ) as Promise<T[]>;
  }

  getQueriedCollection<T>(path: string, query: any, limit = -1): Promise<T[]> {
    let reference;
    if (query[0].constructor === Array) {
      if (query.length === 3) {
        reference = db
          .collection(path)
          .where(query[0][0], query[0][1], query[0][2])
          .where(query[1][0], query[1][1], query[1][2])
          .where(query[2][0], query[2][1], query[2][2]);
      } else if (query.length === 2) {
        reference = db
          .collection(path)
          .where(query[0][0], query[0][1], query[0][2])
          .where(query[1][0], query[1][1], query[1][2]);
      } else if (query.length === 3) {
        reference = db
          .collection(path)
          .where(query[0][0], query[0][1], query[0][2])
          .where(query[1][0], query[1][1], query[1][2])
          .where(query[2][0], query[2][1], query[2][2]);
      }
    } else {
      reference = this.db.collection(path).where(query[0], query[1], query[2]);
    }

    if (limit > -1) reference = reference.limit(limit);

    return reference.get().then((collection: any) => {
      return collection.docs.map((document: any) => {
        return { ...document.data(), id: document.id } as T;
      }) as T[];
    }) as Promise<T[]>;
  }
  getDocument<T>(path: string): Promise<T> {
    return this.db
      .doc(path)
      .get()
      .then((document: any) => {
        if (!document.exists)
          return Promise.reject(`Document on path: ${path} doesn't exist`);
        return { id: document.id, ...document.data() } as T;
      })
      .catch((error: any) =>
        console.error(`Couldn't get firebase collection: ${path}`, error)
      ) as Promise<T>;
  }

  multiGet<T>(paths: string[]): Promise<T[]> {
    const promises = paths.map((path) => this.getDocument<T>(path));

    return Promise.all(promises).then((documents) => {
      if (!documents) return [];
      return documents;
    }) as Promise<T[]>;
  }

  createPaths(pathToCollection: string, paths: string[]) {
    return paths.map((path) => `${pathToCollection}/${path}`);
  }

  makeDictionaryOfDocuments<T>(documents: any) {
    if (!documents || documents.length <= 0) return {};

    let dictionary = {};
    for (const document of documents) {
      if (!document?.id) return {}; //if one documents lacks id, return empty dictionary
      dictionary = { ...dictionary, [document.id]: document as T };
    }
    return dictionary;
  }
}

const _firebaseService = new FirebaseService(db);

export { db, auth, storage, currentUser, functions, _firebaseService, fire };
