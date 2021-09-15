export function Note() {
  return(
  <div className="note">
    <div className="note__importance"></div>
    <h2 className="note__title"></h2>
    <p className="note__description"></p>
    <span className="note__date"></span>
    <span className="note__tags"></span>
  </div>)
}

export interface NoteProps {
  title: string,
  description: string,
  date: string,
  importance: number,
  tags: string
}