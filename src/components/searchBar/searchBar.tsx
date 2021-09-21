import React, { useState } from 'react';
import './searchBar.scss';

export function SearchBar(props: SearchBarProps){
  const [serchStr, setSerchStr] = useState('');

  return(
    <div className="searchBar">
      <label className="searchBar__wrapper">
        <div className="searchBar__icon"></div>
        <input onChange={makeSearchStr} placeholder="Search (enter tags seperated with whitespace)" className="searchBar__input" />
      </label>
      <button onClick={setQuery} type="submit" className="searchBar__btn">Search</button>
    </div>
  );

  function makeSearchStr(event:React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    let searchStr = '';
    searchStr = value.split(' ').join('#');
    setSerchStr(searchStr);
  }

  function setQuery() {
    props.setQuery(serchStr);
  }
}

export interface SearchBarProps {
  setQuery: Function,
  query: string
}