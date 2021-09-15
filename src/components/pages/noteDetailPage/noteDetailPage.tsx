import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetching from "../../hooky/useFetching";
import { NoteProps } from "../../note/note";
import ServerService from "../../serverService/serverService";
import Loader from "../../UI/loader/loader";

export function NoteDetailPage () {
  const param = useParams<{id:string}>();
  const [getNotesFromServer, isLoadingGet, errGet] = useFetching(() => ServerService.getNoteById(param.id));
  const [patchNoteInServer, isLoadingPatch, errPatch] = useFetching(() => ServerService.updateNoteById(param.id));
  const [note, setNote] = useState<NoteProps>();
  useEffect(() => {
    setNote(getNotesFromServer());
  }, [])

  return(
  <div className="noteDetailPage">
    {isLoadingGet ?
    <Loader></Loader> :
    <div className="noteDetailPage_wrapper">
      //TODO заметку детально с инпутами
    </div>
    }
  </div>)
}