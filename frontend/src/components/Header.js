import React from 'react';
import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип с названием приложения Место"
      />
        {props.loggedIn ? (
          <nav className="header__navigation">
            <p className="header__link">{props.login}</p>
            <button onClick={props.signOut} className="header__link header__link_type_gray ">Выйти</button>
          </nav>) :
          (window.location.pathname === "/sign-up" ? <NavLink className="header__link" to="/sign-in">Войти</NavLink>
           : <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>)}
    </header>
  );
}

export default Header;
