import { useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../components";
import { useUser } from "../../hooks/api/useUser.hook";
import "./Login.css";

export function Login() {
  const [params, setParams] = useState({});

  const { login } = useUser();

  function handleInputChange(e) {
    const { id, value } = e.target;

    const newParams = { ...params, [id]: value };

    setParams(newParams);
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!params.email || !params.password) {
      //TODO : error toast if any field is null
    } else {
      try {
        await login(params);
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
          <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </div>
  );
}
