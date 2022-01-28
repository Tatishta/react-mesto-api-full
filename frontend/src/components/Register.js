import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function onRegister (e) {
    e.preventDefault();
    const {email, password} = state;
    props.onRegister(email, password)
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        onSubmit={onRegister}>
        <label className="auth__label">
          <input
            className="auth__input"
            placeholder="Email"
            type="email"
            name="email"
            minLength="6"
            maxLength="30"
            value={state.email}
            onChange={handleChange}
            required
            />
          <span className="auth__error"></span>
        </label>
        <label className="auth__label">
          <input
            className="auth__input"
            placeholder="Пароль"
            type="text"
            name="password"
            value={state.password}
            onChange={handleChange}
            minLength="2"
            maxLength="20"
            required
          />
          <span className="auth__error"></span>
        </label>
        <button
          className="auth__submit"
          type="submit">Зарегистрироваться</button>
      </form>
      <div className="auth__login">
        <p className="auth__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;
