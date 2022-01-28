import React from "react";

function ImagePopup(props) {


  return (
    <div className={`popup popup_function_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <button
        type="button"
        className="popup__close"
        onClick={props.onClose}>
      </button>
      <figure className="popup__figure">
        <img
        className="popup__image"
        src={props.card.link}
        alt={props.card.name}/>
      <figcaption className="popup__caption">{props.card.name}</figcaption></figure>
    </div>
  );
}

export default ImagePopup;
