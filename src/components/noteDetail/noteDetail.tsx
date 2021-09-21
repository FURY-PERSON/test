import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NoteProps } from "../note/note";
import useFetching from "../hooky/useFetching";
import ServerService from "../serverService/serverService";
import Loader from "../UI/loader/loader";
import "./noteDetail.scss";


export function NoteDetail(props:NoteProps) {
  const save = async () => { await saveChanges()};
  const [isEditMode, setIsEditMode] = useState(false);
  const [noteDetail, setNoteDetail] = useState<NoteProps>(props);
  const [saveNote, isLoading, err] = useFetching(save);

  const saveChanges = async () => {
    await ServerService.updateNote(noteDetail);
    setIsEditMode(false);
  }

  const onTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const tagsSrt = defineTagsStr(value);
    setNoteDetail({...noteDetail, title: value, titleTags: tagsSrt});
  }

  const onDescriptionChange = (event:React.ChangeEvent<any>) => {
    const value = event.target.value;
    const tagsSrt = defineTagsStr(value);
    setNoteDetail({...noteDetail, description: value, descriptionTags: tagsSrt});
  }

  return(
    <>
      {isLoading ?
      <Loader></Loader> :
        (!isEditMode) ? 
          <div className="noteDetail">
            <NavLink to={"/notes"} className="noteDetail__closeBtn" >&#10060;</NavLink>
            <button className="noteDetail__edit" onClick={() => setIsEditMode(true)}>edit</button>
            <p className="noteDetail__title">{MakeMarckedHtml(noteDetail.title)}</p>
            <p className="noteDetail__description">{MakeMarckedHtml(noteDetail.description)}</p>
            <span className="noteDetail__date">{noteDetail.date}</span>
            <span className="noteDetail__tags">{noteDetail.titleTags + " " + noteDetail.descriptionTags}</span>
          </div> :

          <div className="noteDetail">
            <NavLink to={"/notes"} className="noteDetail__closeBtn">&#10060;</NavLink>
            <button className="noteDetail__edit" onClick={() => saveNote()}>apply</button>
            <input className="noteDetail__title" value={noteDetail.title} onChange={onTitleChange}></input>
            <textarea className="noteDetail__description textArea" value={noteDetail.description} onChange={onDescriptionChange}></textarea>
            <span className="noteDetail__date">{noteDetail.date}</span>
            <span className="noteDetail__tags">{noteDetail.titleTags + " " + noteDetail.descriptionTags}</span>
          </div>
      }
    </>
  );

  function defineTagsStr(text: string) {
    let tagsStr = '';
    for(let i=0; i<text.length; i++) {
      if(text[i] === '#') {
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

  function MakeMarckedHtml(text:string) {
    const textWithIutHash = deleteHashSymbolFromText(text);
    const tagsArr = (props.titleTags + props.descriptionTags).split('#');
    let textArr = textWithIutHash.split(" ");
    return (
    <p>
      {textArr.map((textt, i) => {
        return tagsArr.includes(textArr[i]) ? <span className="marckSpan">{textArr[i]+ ' '}</span> : textArr[i] + ' ';
      })}
    </p>); 
  }

  function deleteHashSymbolFromText(text:string) {
    let newText = "";
    for(let i=0; i<text.length;i++) {
      if(text[i] !== '#') {
        newText += text[i];
      }
    }
    return newText;
  }

}