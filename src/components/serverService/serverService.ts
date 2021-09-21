import { NoteProps } from "../note/note";
import Store from "./stote";


async function addNewNote(note:NoteProps) {
  /*   const noteStr = JSON.stringify(note); */
    const isSuccess = await Store.addNote(note) as boolean;
    return isSuccess;
}

async function getNotes() {
  const notes = await Store.getNotes();
  return notes;
}

async function getNoteById(id:string) {
  const note = await Store.getNoteById(id) as NoteProps;
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
  const tagsArr = tags.split('#');
  const notesArr:Array<NoteWithMatchConter> = [];
  notes.forEach((note) => {
    let counter = 0;
    const noteTags = note.titleTags + note.descriptionTags;
    for(let i=0; i<tagsArr.length; i++) {
      if(noteTags.includes(tagsArr[i])) {
        counter++;
      }
    }
    if(counter !== 0)
      notesArr.push({note:note, amount:counter});
  })
  notesArr.sort((a, b) => a.amount - b.amount);
  const sortedNoteArr:Array<NoteProps> = []
  notesArr.forEach((note) => {
    sortedNoteArr.push(note.note);
  })
  return sortedNoteArr;
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

interface NoteWithMatchConter {
  note:NoteProps,
  amount: number
}