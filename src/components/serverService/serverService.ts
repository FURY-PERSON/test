import { NoteProps } from "../note/note";
import Store from "./stote";


async function addNewNote(note:NoteProps) {
  /*   const noteStr = JSON.stringify(note); */
    const isSuccess = await Store.addNote(note) as boolean;
    console.log(111111)
    return isSuccess;
}

async function getNotes() {
  const notes = await Store.getNotes();
  return notes;
}

async function getNoteById(id:string) {
  const note = await Store.getNoteById(id);
  return note;
}

async function updateNote(note:NoteProps) {
/*   const noteStr = JSON.stringify(note); */
  const isSuccess = await Store.updateNote(note);
  return note
}

async function deleteNoteById(id:string) {
  const isSuccess = await Store.deleteNoteById(id);
  return isSuccess;
}

async function getNotesByTags(tags:string) {
  const notes = await getNotes();
  console.log('hhh')
  notes.filter((note) => note.tags.includes(tags));
  console.log('hhh', notes)
  return notes;
}

async function createStore() {
  const isSuccess = Store.createDB();
  return isSuccess;
}

const ServerService = {
  createStore,
  getNotes,
  getNoteById,
  updateNote,
  deleteNoteById,
  addNewNote,
  getNotesByTags
}

export default ServerService;