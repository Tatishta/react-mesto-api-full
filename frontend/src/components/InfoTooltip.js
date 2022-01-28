import React from 'react';

function InfoTooltip(props) {
  return(
    <div
    className={`popup popup_function_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}></button>
        <div className="popup__form">
          <img
            src={props.image}
            className="info-tooltip__image"
            alt="Картинка для привлечения внимания" />
          <p className="info-tooltip__text">{props.tooltip}</p>
        </div>
    </div>
  );
}

export default InfoTooltip;
