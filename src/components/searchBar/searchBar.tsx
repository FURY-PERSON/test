import React, { useState } from 'react';
import './searchBar.scss';

export function SearchBar(props: SearchBarProps){
  const [serchStr, setSerchStr] = useState('');

  return(
    <div className="searchBar">
      <label className="searchBar__wrapper">
        <div className="searchBar__icon"></div>
        <input onChange={(e)=>setSerchStr(e.target.value)} placeholder="Search" className="searchBar__input" />
      </label>
      <button onClick={setQuery} type="submit" className="searchBar__btn">Search</button>
    </div>
  );

  function setQuery() {
    props.setQuery(serchStr);
  }
}

export interface SearchBarProps {
  setQuery: Function,
  query: string
}