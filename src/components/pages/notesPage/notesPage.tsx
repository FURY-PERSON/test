import { useEffect, useState } from "react";
import useFetching from "../../hooky/useFetching"
import { Note, NoteProps } from "../../note/note";
import { SearchBar, SearchBarProps } from "../../searchBar/searchBar";
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";

export function NotesPage() {
  const [query, setQuery] = useState('');
  const [getNotesFromServer, isLoading, err] = useFetching(()=>ServerService.getNotesByTags(query));
  const [notes, setNotes] = useState<Array<NoteProps>>([]);

  useEffect(() => {
    setNotes(getNotesFromServer());
  }, [query]);

  const searchBarProps: SearchBarProps = {
    query,
    setQuery
  }

  return(
  <div className="notesPage">
    {isLoading ?
      <Loader></Loader> :
      <>
        <SearchBar {...searchBarProps}></SearchBar>
        <div className="notesPage__wrapper">
          { (notes.length === 0) ?
            <h2>Список заметок пуст</h2> :
            notes.map((note)=>Note(note))}
        </div>
      </>}
  </div>)
}