import React from "react";
import { useNavigate } from "react-router-dom";

function Login({handleLogin}) {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setState({
      email:'',
      password:'',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.email || !state.password) {
      return;
    }

    handleLogin(state.email, state.password)
      .then(reset)
      .then(() => navigate("/"))
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form"
        onSubmit={handleSubmit}>
        <label className="auth__label">
          <input
            className="auth__input"
            placeholder="Email"
            type="email"
            name="email"
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
            required
          />
          <span className="auth__error"></span>
        </label>
        <button
          className="auth__submit auth__submit_type_login"
          type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;
