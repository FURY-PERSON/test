import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as PostsActionCreator from "../store/action-createros/postsActionCreator"

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(PostsActionCreator, dispatch);
}