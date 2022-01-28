import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return(
    <PopupWithForm
      name="remove-card"
      title="Вы уверены?"
      button="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      />
  )
}

export default DeletePopup;
