import { NoteProps } from "../note/note";
import StoreService from "./stoteService";

async function getNotes() {
  const notes = await StoreService.fetchNotes();
  return notes;
}

async function getNoteById(id:string) {
  const note = await StoreService.fetchNoteById(id);
  return note;
}

async function updateNoteById(id:string) {
  const note = await StoreService.patchNoteById(id);
  return note
}

async function deleteNoteById(id:string) {
  const isSuccess = await StoreService.patchNoteById(id);
  return isSuccess;
}

async function addNewNote(note:NoteProps) {
  const noteStr = JSON.stringify(note);
  const isSuccess = await StoreService.addNewNote(noteStr);
  return isSuccess;
}

async function getNotesByTags(tags:string) {

}

const ServerService = {
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  addNewNote,
  getNotesByTags
}

export default ServerService;