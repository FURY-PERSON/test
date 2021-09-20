import { NoteProps } from "../note/note";

let dbReq: IDBOpenDBRequest;
let db: IDBDatabase;

/* async function fetchNotes() {

}

async function fetchNoteById(id:string) {

} */

/* async function patchNoteById(id:string) {

}

async function deleteNoteById(id:string) {

}

async function addNewNote(noteStr:string) {

}
 */


const createDB = () => {
  return new Promise((resolve, reject) => {
    dbReq = indexedDB.open('notesStore', 1);
    dbReq.onupgradeneeded = (event: Event) => {
      db = (<IDBRequest>event.target).result;
      db.createObjectStore('notes', { keyPath: 'id' });
      resolve(dbReq);
    };
    dbReq.onsuccess = (event: Event) => {
      db = (<IDBOpenDBRequest>event.target).result;
      resolve(dbReq);
    };
    dbReq.onerror = () => {
      reject();
    };
  });
}

const addNote = (newNote: NoteProps) => {
  return new Promise((res, rej) => {
    const tx = db.transaction(['notes'], 'readwrite');
    const store = tx.objectStore('notes');
    store.add(newNote);
    res(true);
  });
};

const updateNote = (note:NoteProps) => {
  return new Promise((res, rej) => {
    const tx = db.transaction(['notes'], 'readwrite');
    const store = tx.objectStore('notes');
    const req = store.openCursor(note.id);
  
    req.onsuccess = (event: Event) => {
      const cursor = (<IDBRequest>event.target).result;
      if (cursor.value.id === note.id) {
        cursor.update(note, note.id);
        res(true);
      }
    };
    req.onerror = () => rej(false);
  });
}


const getNotes = (): Promise<NoteProps[]> => {
  return new Promise((resolve) => {
      const tx = db.transaction(['notes'], 'readonly');
      const store = tx.objectStore('notes');
      const req = store.openCursor();
      const allNotes: NoteProps[] = [];

      req.onsuccess = (event: Event) => {
        if ((<IDBRequest>event.target).result) {
          const cursor = (<IDBRequest>event.target).result;
          allNotes.push(cursor.value);
          cursor.continue();
        }
      };

      tx.oncomplete = () => {
        resolve(allNotes);
      };
  });
}

const getNoteById = (id:string) => {
  return new Promise((res, rej) => {
    const tx = db.transaction(['notes'], 'readonly');
    const store = tx.objectStore('notes');
    const req = store.openCursor();
  
    req.onsuccess = (event: Event) => {
      if ((<IDBRequest>event.target).result) {
        const cursor = (<IDBRequest>event.target).result;
        if(cursor.value === id)
          res(cursor.value)
        cursor.continue();
      } else {
        rej();
      }
    };
  });
}

const deleteNoteById = (id:string) => {
  return new Promise((res, rej) => {
    const transaction = db.transaction("notes", "readwrite");
    const objectStore = transaction.objectStore("notes");
    const req = objectStore.delete(id);

    req.onsuccess = () => {
      res(true);
    };
    req.onerror = () => {
      rej(false);
    }
  });
}


const Store = {
  createDB,
  addNote,
  updateNote,
  getNotes,
  getNoteById,
  deleteNoteById
}

export default Store;