import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import { FormInput } from "../../components";

import { useUser } from "../../hooks/api/useUser.hook";

import { useGlobalUser } from "../../context";

import { LOGIN_ERROR, WEBSITE_PATHS } from "../../constants";

export function Login() {
  const [, setGlobalUser] = useGlobalUser();
  const [params, setParams] = useState({});

  const { login } = useUser();

  const navigate = useNavigate();

  function handleInputChange(e) {
    const { id, value } = e.target;

    const newParams = { ...params, [id]: value };

    setParams(newParams);
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await login(params);
      setGlobalUser(user);
      navigate(WEBSITE_PATHS.HOME);
    } catch (e) {
      console.error(e);
      toast.error(LOGIN_ERROR);
    }
  }

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleLogin}>
        <h1 className="form__title">Sign in</h1>

        <div className="form__inputs">
          <FormInput
            inputTitle="E-mail"
            inputType="text"
            placeholder="Ex: henry@hotmail.com"
            id="email"
            handleChange={handleInputChange}
          />

          <FormInput
            inputTitle="Password"
            inputType="password"
            placeholder="Type your password here"
            id="password"
            handleChange={handleInputChange}
          />
        </div>

        <button className="form__button">Login</button>
        <p className="redirect">
          Don't have an account?
          <Link to={WEBSITE_PATHS.REGISTER}>Register</Link>
        </p>
      </form>
    </div>
  );
}
