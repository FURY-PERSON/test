import React from 'react';
import SwitchProps from "./switcherProps";
import "./switcher.scss";

export default function Switcher(props:SwitchProps) {
  document.body.style.setProperty('--switchColor',props.switchColor||'#b3afaf');
  document.body.style.setProperty('--activeColor',props.activeColor||'#c4ffa8');
  const sliderClasses = props.value ? ['switch__slider', 'sliderActive'] : ['switch__slider'];
  const btnClasses = props.value ? ['switch__btn', 'btnActive'] : ['switch__btn'];

  return(
    <div className="switch">
      <div className="switch__desc">{props.children || ''}</div>
      <div className={sliderClasses.join(" ")}>
        <div className={btnClasses.join(" ")} onClick={toggleSwitcher}></div>
      </div>
    </div>
  );

  function toggleSwitcher(event:React.MouseEvent){
    (event.target as HTMLElement).classList.toggle('btnActive');
    (event.target as HTMLElement).parentElement?.classList.toggle('sliderActive');

    props.onChange();
  }
}