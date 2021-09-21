import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NoteProps } from "../../note/note";
import { NoteDetail } from "../../noteDetail/noteDetail";
import useFetching from "../../hooky/useFetching";
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";

export function NoteDetailPage () {
  const param = useParams<{id:string}>();
  const getNote = async () => {
    const note = await ServerService.getNoteById(param.id);
    setNote(note);
  }
  const [getNoteFromServer, isLoading, err] = useFetching(getNote);
  const [note, setNote] = useState<NoteProps>();


  useEffect(() => {
    getNoteFromServer();
  }, [])

  return(
  <div className="page noteDetailPage">
    {isLoading ?
    <Loader></Loader> :
    <div className="noteDetailPage_wrapper">
      {(note !== undefined) ? 
        <NoteDetail {...note}></NoteDetail> :
        <h3>Заметка не найдена</h3>
      }
    </div>
    }
  </div>)
}