import { useEffect, useState } from "react";
import { Note, NoteProps } from "../../note/note";
import { SearchBar, SearchBarProps } from "../../searchBar/searchBar";
import useFetching from "../../hooky/useFetching"
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";
import "./notesPage.scss";

export function NotesPage() {
  const getNotes = async  () => {
    const notes = await ServerService.getNotesByTags(query);
    setNotes(notes);
  }
  const [query, setQuery] = useState('');
  const [getNotesFromServer, isLoading, err] = useFetching(getNotes);
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
            <h2>Ничего не найдено</h2> :
            notes.map((note) => <Note {...note} key={Date.now() + note.title}></Note>)}
        </div>}
      </>}
  </div>)
}