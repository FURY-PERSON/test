import { NoteProps } from "../note/note";

async function fetchNotes() {
/*   const notes:Array<NoteProps> = await fetch("./store.json").then(response => response.json());
  return notes; */
}

async function fetchNoteById(id:string) {
/*   const notes = await fetchNotes();
  const findedNote = notes.find((note)=>note.id === id);
  return findedNote; */
}

async function patchNoteById(id:string) {

}

async function deleteNoteById(id:string) {

}

async function addNewNote(noteStr:string) {

}

const StoreService = {
  fetchNotes,
  fetchNoteById,
  patchNoteById,
  deleteNoteById,
  addNewNote
}

export default StoreService;