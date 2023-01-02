import "./Search.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import SEARCH from "../../assets/search__icon.svg";

import { Header, ProfileLoader } from "../../components";

import { useUser } from "../../hooks";

import { NO_PROFILES, SEARCH_ERROR } from "../../constants";

export function Search() {
  const [name, setName] = useState("");
  const [profiles, setProfiles] = useState();

  const { getUsers } = useUser();

  async function getProfiles() {
    try {
      const users = await getUsers(name);
      setProfiles(users.content);
    } catch (e) {
      const errorMessage = e;

      toast.error(errorMessage || SEARCH_ERROR);
    }
  }

  function handleInputChange(e) {
    const { value } = e.target;
    setName(value);
  }
  return (
    <div className="search__container">
      <ToastContainer autoClose={8000} />
      <Header />

      <div className="search__content">
        <div className="search__bar">
          <button className="search__button" onClick={getProfiles}>
            <img src={SEARCH} alt="Search" className="search__image" />
          </button>
          <input
            type="text"
            placeholder="Search profiles"
            className="search__input"
            onChange={handleInputChange}
          />
        </div>
        <main className="search__result">
          {profiles && <ProfileLoader profiles={profiles} />}
          {!profiles && <div className="no__profiles">{NO_PROFILES}</div>}
        </main>
      </div>
    </div>
  );
}
