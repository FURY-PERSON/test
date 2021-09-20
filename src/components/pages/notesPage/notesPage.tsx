import { useEffect, useState } from "react";
import useFetching from "../../hooky/useFetching"
import { Note, NoteProps } from "../../note/note";
import { SearchBar, SearchBarProps } from "../../searchBar/searchBar";
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";
import "./notesPage.scss";

export function NotesPage() {
  const get = async  () => {
    const notes = await ServerService.getNotesByTags(query);
    setNotes(notes);
  }
  const [query, setQuery] = useState('');
  const [getNotesFromServer, isLoading, err] = useFetching(get);
  const [notes, setNotes] = useState<Array<NoteProps>>([]);

  useEffect(() => {
    getNotesFromServer();
  }, [query]);

  const searchBarProps: SearchBarProps = {
    query,
    setQuery
  }

  return(
  <div className="page notesPage">
    {isLoading ?
      <Loader></Loader> :
      <>
        <SearchBar {...searchBarProps}></SearchBar>
{        <div className="notesPage__wrapper">
          { (notes.length === 0) ?
            <h2>Список заметок пуст</h2> :
            notes.map((note) => Note(note))}
        </div>}
      </>}
  </div>)
}