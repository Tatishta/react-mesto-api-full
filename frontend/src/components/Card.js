import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__remove-button' : 'element__remove-button_hidden'}`
  );
  const isLiked = props.card.likes.includes(currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    props.handleClick(props.card);
  };

  function handleLikeClick() {
    props.handleLikeClick(props.card)
  };

  function handleDeleteClick() {
    props.handleDeleteClick(props.card)
  }

  return(
      <li className="element">
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}/>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}>
        </button>
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-and-counter">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </li>
  );
}

export default Card
