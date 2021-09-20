import { useHistory } from "react-router";
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
      <h2 className="note__title">{noteProps.title}</h2>
      <p className="note__description">{noteProps.description}</p>
      <span className="note__tags">{noteProps.tags}</span>
      <span className="note__date">{noteProps.date}</span>
    </div>
    <div className="note__deleteBtn" onClick={onDeleteBtnClick}>&#128465;</div>
  </div>)
}

export interface NoteProps {
  title: string,
  description: string,
  date: string,
  tags: string,
  id:string
}