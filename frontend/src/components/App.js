import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import { Routes, Route, useNavigate } from "react-router-dom";
import { newApi } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip'
import success from '../images/success.svg';
import error from '../images/error.svg';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState("");
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [tooltipImage, setTooltipImage] = React.useState("");
  const [tooltipText, setTooltipText] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

  React.useEffect(() => {
      auth.checkToken().then((res) => {
      if (res) {
        setUserEmail(res.user.email);
        setLoggedIn(true);
        navigate("/");
        Promise.all([
          newApi.getInitialCards().then((cardResult) => setCards(cardResult.cards)),
          newApi.getMyInfo().then((res) => {
            setCurrentUser({
              name: res.user.name,
              about: res.user.about,
              avatar: res.user.avatar,
              _id: res.user._id
            });
          })])
      }})
      .catch((err) => {
        console.log(err);
      })
    }, [navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);
    newApi.stateLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    newApi.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlace(name, link) {
    newApi.addCard(name, link)
    .then((newCard) => {
      setCards([newCard.card, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
}

  function handleUpdateUser(name, about) {
    newApi.editUserInfo(name, about)
    .then((res) => {
      setCurrentUser({
        name: res.user.name,
        about: res.user.about,
        avatar: res.user.avatar,
        _id: res.user._id
      });
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(avatar) {
    newApi.getNewAvatar(avatar)
    .then((res) => {
      setCurrentUser({
        name: res.user.name,
        about: res.user.about,
        avatar: res.user.avatar,
        _id: res.user._id
      });
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    selectCard(card);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    selectCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleOpenInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleRegister (email, password) {
    auth.register(email, password)
      .then(() => {
        setTooltipImage(success);
        setTooltipText("Вы успешно зарегистрировались!");
        handleOpenInfoTooltip();
        navigate("/sign-in");})
      .catch(() => {
        setTooltipImage(error);
        setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        handleOpenInfoTooltip();
      })
  };

  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setTooltipImage(error);
        setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        handleOpenInfoTooltip();
      })
  };

  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__container">
            <Header
              login={userEmail}
              loggedIn={loggedIn}
              signOut={signOut}/>
            <Routes>
              <Route path="/" element={
              <ProtectedRoute redirectTo="/sign-in" loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  />
                </ProtectedRoute>} />
              <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
              <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>} />
            </Routes>
            <Footer />
            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups} />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser} />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace} />
            <DeletePopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
              card={selectedCard} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar} />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              image={tooltipImage}
              tooltip={tooltipText}/>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
