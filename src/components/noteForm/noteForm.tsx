import React, { useState } from 'react';
import { NoteProps } from '../note/note';
import { hashCode } from '../../tool/hashFunction';
import { getDate } from '../../tool/getDate';
import ServerService from '../serverService/serverService';
import Loader from '../UI/loader/loader';
import useFetching from "../hooky/useFetching";
import "./noteForm.scss";

export default function NoteForm() {
  const addNewNote = () => {
    const noteToStore:NoteProps = makeNoteForStore();
    ServerService.addNewNote(noteToStore);
  };
  const [addNoteToServer, isLoading, err] = useFetching(addNewNote);
  const [note, setNote] = useState<NoteProps>({
    date: '',
    description:'',
    title:'',
    titleTags: '',
    descriptionTags: '',
    id:''
  });


  const onTitleChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const tagsSrt = defineTags(value);
    setNote({...note, title: value, titleTags: tagsSrt});
  }

  const onDescriptionChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const tagsSrt = defineTags(value);
    setNote({...note, description: value, descriptionTags: tagsSrt});
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
        <div className="noteForm__tagsInput">{note.titleTags + note.descriptionTags}</div>
        <button className="noteForm__saveBtn" onClick={(ev) => addNote(ev)}>Save</button>
      </div>
      }   
    </form>
  );


  async function addNote(event:React.FormEvent) {
    event.preventDefault();
    if(note.title.length !== 0) {
      await addNoteToServer();
      if(err) {
        resetForm();
      } else {
        resetForm();
      }
    } else {
      resetForm();
      alert("Заголовок не может быть пустым");
    }
  }

  function resetForm() {
    setNote({
      date:String(Date.now()),
      description:'',
      title:'',
      titleTags: '',
      descriptionTags: '',
      id:''
    });
  }

  function defineTags(text: string) {
    let tagsStr = '';
    for(let i=0; i<text.length; i++) {
      if(text[i] === '#' && (text[i-1] === ' ' || i-1<0)) {
        while(text[i] !== ' ' && i < text.length) {
          tagsStr += text[i];
          i++;
        }
      }
    }
    if(tagsStr.length === 1)
      return ''
    return tagsStr;
  }

  function makeNoteForStore() {
    const newNote:NoteProps = {
      ...note,
      date: getDate(),
      id: String(hashCode(note.title + Date.now()))
    }
    return newNote;
  }
}