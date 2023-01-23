import "./Register.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FormInput } from "../../components";

import { useUser } from "../../hooks/api/useUser.hook";

import { useGlobalUser } from "../../context";

import {
  REGISTER_ERROR,
  WEBSITE_PATHS,
  TOAST_DEFAULT_DURATION,
} from "../../constants";

export function Register() {
  const [, setGlobalUser] = useGlobalUser();
  const [params, setParams] = useState({});

  const { register } = useUser();

  const navigate = useNavigate();

  function handleInputChange(e) {
    const { id, value } = e.target;

    const newParams = { ...params, [id]: value };

    setParams(newParams);
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const newUser = await register(params);
      setGlobalUser(newUser);
      navigate(WEBSITE_PATHS.HOME);
    } catch {
      toast.error(REGISTER_ERROR);
    }
  }

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleRegister}>
        <h1 className="form__title">Sign up</h1>

        <div className="form__inputs">
          <FormInput
            inputTitle="Name"
            inputType="text"
            placeholder="Ex: Robert Washington"
            id="name"
            handleChange={handleInputChange}
          />

          <FormInput
            inputTitle="E-mail"
            inputType="text"
            placeholder="Ex: robert@hotmail.com"
            id="email"
            handleChange={handleInputChange}
          />

          <FormInput
            inputTitle="Profile picture"
            inputType="text"
            placeholder="Copy the image link here"
            id="picture"
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

        <button className="form__button">Register</button>
      </form>
    </div>
  );
}
