import React, { useState } from 'react';
import "./addCardForm.scss";
import { NoteProps } from '../note/note';

export default function NoteForm() {

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
    setNote({...note});
  }

  return(
    <form className="noteForm" onSubmit={addNote}>
      <div className="noteForm__wrapper">
        <input className="noteForm__titleInput" placeholder="Title" onChange={onTitleChange} 
               value={note.title}  type="text"  required />
        <textarea className="noteForm__descriptionInput" placeholder="Description" onChange={onDescriptionChange} 
               value={note.description}  />
        <input className="noteForm__tagsInput" placeholder="Tags" onChange={onTagsChange} 
               value={note.tags} type="text" />
      </div>      
    </form>
  );


  function addNote(event:React.FormEvent) {
    event.preventDefault();
    resetForm();
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