import React from 'react';
import "./loader.scss";

export default function Loader() {
  
  return(
    <div className="loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}