import { Redirect, Route, Switch, useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AddNewNotePage } from "./components/pages/addNewNotePage/addNewNotePage";

export default function AppRouter() {
  let location =  useLocation();

  return(
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={200} classNames="page" unmountOnExit>
        <Switch location={location}>
          <Route path={`/addNewNote`}>
            <AddNewNotePage></AddNewNotePage>
          </Route>
{/*           <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/posts/:id">
            <CardDetails></CardDetails>
          </Route>
          <Route path="/notfound">
            <NotFound></NotFound>
          </Route>
{          <Route exact path="/">
            <Redirect to='/posts'></Redi>
          </Route>}
          <Redirect to='/notfound'></Redirect> */}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}