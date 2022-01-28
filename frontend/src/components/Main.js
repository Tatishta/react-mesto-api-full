import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__avatar-overlay"
            onClick={props.onEditAvatar}>
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="фотография автора профиля"/>
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleClick={props.onCardClick}
              handleLikeClick={props.onCardLike}
              handleDeleteClick={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
