import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetching from "../../hooky/useFetching";
import { NoteProps } from "../../note/note";
import { NoteDetail } from "../../noteDetail/noteDetail";
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";

export function NoteDetailPage () {
  const param = useParams<{id:string}>();
  const [getNotesFromServer, isLoading, err] = useFetching(() => ServerService.getNoteById(param.id));
  const [note, setNote] = useState<NoteProps>();
  useEffect(() => {
    setNote(getNotesFromServer());
  }, [])

  return(
  <div className="noteDetailPage">
    {isLoading ?
    <Loader></Loader> :
    <div className="noteDetailPage_wrapper">
      {(note !== undefined) ? 
        <NoteDetail {...note}></NoteDetail> :
        <h3>Не существует</h3>
      }
    </div>
    }
  </div>)
}