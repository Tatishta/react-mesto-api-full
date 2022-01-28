import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [newCardName, setNewCardName] = React.useState('');
  const [newCardLink, setNewCardLink] = React.useState('');

  React.useEffect(() => {
    setNewCardName('');
    setNewCardLink('');
  }, [props.isOpen]);

  function handleNewCardName(e) {
    setNewCardName(e.target.value);
  }

  function handleNewCardLink(e) {
    setNewCardLink(e.target.value)

  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(newCardName, newCardLink);
  }

  return(
    <PopupWithForm
      name="add-place"
      title="Новое место"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        className="popup__input"
        name="name"
        placeholder="Название"
        id="place-input"
        minLength="2"
        maxLength="30"
        value={newCardName}
        onChange={handleNewCardName}
        required/>
      <span className="popup__error place-input-error"></span>
      <input
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        name="link"
        id="link-input"
        value={newCardLink}
        onChange={handleNewCardLink}
        required/>
        <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
