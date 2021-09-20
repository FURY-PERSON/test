import React, { useState } from 'react';
import "./noteForm.scss";
import { NoteProps } from '../note/note';
import ServerService from '../serverService/serverService';
import useFetching from "../hooky/useFetching";
import Loader from '../UI/loader/loader';

export default function NoteForm() {
  const addNewNote = () => {ServerService.addNewNote(note)};
  const [addNoteToServer, isLoading, err] = useFetching(addNewNote);
  const [note, setNote] = useState<NoteProps>({
    date:String(Date.now()),
    description:'',
    title:'',
    importance:0,
    tags:'',
    id:''
  });

  const onTitleChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setNote({...note, title: value});
  }

  const onDescriptionChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setNote({...note, description: value});
  }

  const onTagsChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setNote({...note, tags:value});
  }

  return(
    <form className="noteForm" onSubmit={addNote}>
      {isLoading ?
      <Loader></Loader> :
      <div className="noteForm__wrapper">
        <input className="noteForm__titleInput" placeholder="Title" onChange={onTitleChange} 
               value={note.title}  type="text"  required />
        <textarea className="noteForm__descriptionInput" placeholder="Description" onChange={onDescriptionChange} 
               value={note.description}  />
        <input className="noteForm__tagsInput" placeholder="Tags" onChange={onTagsChange} 
               value={note.tags} type="text" />
        <button className="noteForm__saveBtn" onClick={(ev) => addNote(ev)}>Save</button>
      </div>
      }   
    </form>
  );


  async function addNote(event:React.FormEvent) {
    event.preventDefault();
    await addNoteToServer();
    if(err) {
      resetForm();
    } else {
      resetForm();
    }
  }

  function resetForm() {
    setNote({
      date:String(Date.now()),
      description:'',
      title:'',
      importance:0,
      tags:'',
      id:''
    });
  }
}