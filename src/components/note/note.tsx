import { useHistory } from "react-router";
import { deleteHashSymbols } from "../../tool/deleteHashSymbol";
import ServerService from "../serverService/serverService";
import "./note.scss";

export function Note(noteProps:NoteProps) {
  const router = useHistory();

  const onNoteClick = () => {
    router.push(`/notes/${noteProps.id}`);
  }

  const onDeleteBtnClick = async () => {
    await ServerService.deleteNoteById(noteProps.id);
    router.push("/notes");
  }

  return(
  <div className="note">
    <div className="note__wrapper" onClick={onNoteClick}>
      <h2 className="note__title">{deleteHashSymbols(noteProps.title)}</h2>
      <p className="note__description">{deleteHashSymbols(noteProps.description)}</p>
      <span className="note__tags">{noteProps.titleTags + " " + noteProps.descriptionTags}</span>
      <span className="note__date">{noteProps.date}</span>
    </div>
    <div className="note__deleteBtn" onClick={onDeleteBtnClick}>&#128465;</div>
  </div>)
}

export interface NoteProps {
  title: string,
  description: string,
  date: string,
  titleTags: string,
  descriptionTags: string,
  id:string
}
