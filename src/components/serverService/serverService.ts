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

const ServerService = {
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById
}

export default ServerService;