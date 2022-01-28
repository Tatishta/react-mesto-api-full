import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        className="popup__input"
        id="name-input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleNameChange}
        />
        <span className="popup__error name-input-error"></span>
      <input
        type="text"
        className="popup__input"
        name="description"
        id="job-input"
        placeholder="Описание профиля"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleDescriptionChange}
        />
        <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
