import { Redirect, Route, Switch, useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AddNewNotePage } from "./components/pages/addNewNotePage/addNewNotePage";
import { NoteDetailPage } from "./components/pages/noteDetailPage/noteDetailPage";
import { NotesPage } from "./components/pages/notesPage/notesPage";
import { NotFoundPage } from "./components/pages/notFoundPage/notFoundPage";

export default function AppRouter() {
  let location =  useLocation();

  return(
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={200} classNames="page" unmountOnExit>
        <Switch location={location}>
          <Route path={`/addNewNote`}>
            <AddNewNotePage></AddNewNotePage>
          </Route>
          <Route exact path="/notes">
            <NotesPage></NotesPage>
          </Route>
          <Route exact path="/posts/:id">
            <NoteDetailPage></NoteDetailPage>
          </Route>
          <Route path="/notfound">
            <NotFoundPage></NotFoundPage>
          </Route>
          <Route exact path="/">
            <Redirect to='/addNewNote'></Redirect>
          </Route>
          <Redirect to='/notfound'></Redirect>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}