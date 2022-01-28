import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return(
    <PopupWithForm
    name="edit-avatar"
    title="Обновить аватар"
    button="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}>
      <input
        type="url"
        className="popup__input"
        placeholder="https://somewebsite.com/someimage.jpg"
        name="avatar"
        id="avatar-input"
        ref={avatarRef}
        required/>
        <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
