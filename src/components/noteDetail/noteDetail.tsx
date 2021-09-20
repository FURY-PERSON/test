import { useState } from "react";
import { NavLink } from "react-router-dom";
import useFetching from "../hooky/useFetching";
import { NoteProps } from "../note/note";
import ServerService from "../serverService/serverService";
import Loader from "../UI/loader/loader";
import "./noteDetail.scss";


export function NoteDetail(props:NoteProps) {
  const save = async  () => {
    await saveChanges();
  }
  const [isEditMode, setIsEditMode] = useState(false);
  const [noteDetail, setNoteDetail] = useState<NoteProps>(props);
  const [saveNote, isLoading, err] = useFetching(save);

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
            <NavLink to={"/notes"} className="noteDetail__closeBtn" >&#10060;</NavLink>
            <button className="noteDetail__edit" onClick={() => setIsEditMode(true)}>edit</button>
            <h1 className="noteDetail__title">{noteDetail.title}</h1>
            <p className="noteDetail__description">{noteDetail.description}</p>
            <span className="noteDetail__date">{noteDetail.date}</span>
            <span className="noteDetail__tags">{noteDetail.tags}</span>
          </div> :

          <div className="noteDetail">
            <NavLink to={"/notes"} className="noteDetail__closeBtn" >&#10060;</NavLink>
            <button className="noteDetail__edit" onClick={() => saveNote()}>apply</button>
            <input className="noteDetail__title" value={noteDetail.title} onChange={onTitleChange}></input>
            <input className="noteDetail__description" value={noteDetail.description} onChange={onDescriptionChange}></input>
            <span className="noteDetail__date">{noteDetail.date}</span>
            <input className="noteDetail__tags" value={noteDetail.tags} onChange={onTagsChange}></input>
          </div>
      }
    </>
  );

}