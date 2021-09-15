import { NavLink } from "react-router-dom";
import "./header.scss";

export default function Header() {
  
  return(
    <ul className="header">
      <li><NavLink className="header__item" to="/about">Search notes</NavLink></li>
      <li><NavLink className="header__item" to="/posts">Add new note</NavLink></li>
    </ul>
  );
}