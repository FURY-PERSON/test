import React, { useEffect, useState } from "react";
import useFetching from "../hooky/useFetching";
import { NoteProps } from "../note/note";
import ServerService from "../serverService/serverService";
import Loader from "../UI/loader/loader";


export function NoteDetail(props:NoteProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [noteDetail, setNoteDetail] = useState<NoteProps>(props);
  const [saveNote, isLoading, err] = useFetching(() => saveChanges());

  const saveChanges = async () => {
    const isSuccess = await ServerService.updateNote(noteDetail);

    if(/* isSuccess */ true) {
      setIsEditMode(false);
    } else {
      alert(err);
    }
  }

  const onTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNoteDetail({...noteDetail, title: value});
  }

  const onDescriptionChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNoteDetail({...noteDetail, description: value});
  }

  const onImportanceChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setNoteDetail({...noteDetail, importance: value});
  }

  const onTagsChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNoteDetail({...noteDetail, tags: value});
  }

  return(
    <>
      {isLoading ?
      <Loader></Loader> :
        (!isEditMode) ? 
          <div className="noteDetail">
          <button className="noteDetail__edit" onClick={() => setIsEditMode(true)}>edit</button>
          <div className="noteDetail__importance">{noteDetail.importance}</div>
          <h1 className="noteDetail__title">{noteDetail.title}</h1>
          <p className="noteDetail__description">{noteDetail.description}</p>
          <span className="noteDetail__date">{noteDetail.date}</span>
          <span className="noteDetail__tags">{noteDetail.tags}</span>
        </div> :

        <div className="noteDetail">
          <button className="noteDetail__edit" onClick={() => saveNote()}>apply</button>
          <input className="noteDetail__importance" value={noteDetail.importance} onChange={onImportanceChange}></input>
          <input className="noteDetail__title" value={noteDetail.title} onChange={onTitleChange}></input>
          <input className="noteDetail__description" value={noteDetail.description} onChange={onDescriptionChange}></input>
          <span className="noteDetail__date"></span>
          <input className="noteDetail__tags" value={noteDetail.tags} onChange={onTagsChange}></input>
        </div>
      }
    </>
  );

}