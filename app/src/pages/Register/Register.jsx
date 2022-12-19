import { useState } from "react";
import { FormInput } from "../../components";
import { useUser } from "../../hooks/api/useUser.hook";
import "./Register.css";

export function Register() {
  const [params, setParams] = useState({});

  const { register } = useUser();

  function handleInputChange(e) {
    const { id, value } = e.target;

    const newParams = { ...params, [id]: value };

    setParams(newParams);
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!params.name || !params.email || !params.password) {
      // TODO: error toast
    } else {
      try {
        await register(params);
      } catch {
        // TODO: error toast
      }
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
