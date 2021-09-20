import { useHistory } from "react-router";
import "./note.scss";

export function Note(noteProps:NoteProps) {
  const router = useHistory();

  const onNoteClick = () => {
    router.push(`/notes/${noteProps.id}`);
  }

  return(
  <div className="note" onClick={onNoteClick}>
    <div className="note__importance">{noteProps.importance}</div>
    <h2 className="note__title">{noteProps.title}</h2>
    <p className="note__description">{noteProps.description}</p>
    <span className="note__tags">{noteProps.tags}</span>
    <span className="note__date">{noteProps.date}</span>
  </div>)
}

export interface NoteProps {
  title: string,
  description: string,
  date: string,
  importance: number,
  tags: string,
  id:string
}