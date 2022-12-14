import { useState } from "react";
import { useUser } from "../../hooks/api/useUser.hook";
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useUser();

  function handleInputChange(e) {
    const inputId = e.target.id;
    const eventValue = e.target.value;

    inputId === "email" ? setEmail(eventValue) : setPassword(eventValue);
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      //TODO : error toast if any field is null
    } else {
      try {
        const params = { email: email, password: password };
        const response = await login(params);
      } catch {
        //TODO: error toast if invalid credentials
      }
    }
  }

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleLogin}>
        <h1 className="form__title">Sign in</h1>

        <div className="form__inputs">
          <span className="form__label">
            <h3 className="input__title">E-mail</h3>
            <input
              type="text"
              placeholder="Ex: roger@hotmail.com"
              id="email"
              onChange={handleInputChange}
              className="form__input"
            />
          </span>

          <span className="form__label">
            <h3 className="input__title password">Password</h3>
            <input
              type="password"
              placeholder="Type your password here"
              id="password"
              onChange={handleInputChange}
              className="form__input"
            />
          </span>
        </div>

        <button className="form__button">Login</button>
        {/* TODO: Add link to the register page*/}
      </form>
    </div>
  );
}
