import { useEffect, useState } from "react";
import useFetching from "../../hooky/useFetching"
import { Note, NoteProps } from "../../note/note";
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";

export function NotesPage() {
  const [getNotesFromServer, isLoading, err] = useFetching(ServerService.getNotes);
  const [notes, setNotes] = useState<Array<NoteProps>>([]);

  useEffect(() => {
    setNotes(getNotesFromServer());
  }, []);

  return(
  <div className="notesPage">
    {isLoading ?
      <Loader></Loader> :
      <div className="notesPage__wrapper">
        { (notes.length === 0) ?
          <h2>Список заметок пуст</h2> :
          notes.map((note)=>Note(note))}
      </div>}
  </div>)
}