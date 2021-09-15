import React from 'react';
import PhotoInputProps from './photoInputOptionInterface';
import "./photoInput.scss";


export default function PhotoInput(props:PhotoInputProps) {
  const styles={
    width: props.width,
    height: props.height,
    backgroundImage: `url(${props.value || `http://placehold.it/${props.width}x${props.height}`})`,
  };
  
  return(
    <input value={''} className="photoInput" onChange={changePhoto} type="file" style={styles}/>
  );

  function changePhoto(event:React.ChangeEvent) {
    const { files } = event.target as HTMLInputElement;
    
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = () => {
        props.onChange(reader.result);
      };

    }
  }
}