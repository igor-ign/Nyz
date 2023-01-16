import "./Search.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SEARCH from "../../assets/search__icon.svg";

import { Header, ProfileLoader } from "../../components";

import { useUser } from "../../hooks";

import { useGlobalUser } from "../../context";

import {
  NO_PROFILES,
  SEARCH_ERROR,
  TOAST_DEFAULT_DURATION,
  WEBSITE_PATHS,
} from "../../constants";

export function Search() {
  const [name, setName] = useState("");
  const [profiles, setProfiles] = useState();
  const [globalUser] = useGlobalUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!globalUser.id) {
      navigate(WEBSITE_PATHS.LOGIN);
    }
  }, []);

  const { getUsers } = useUser();

  async function getProfiles() {
    try {
      const { content } = await getUsers(name);
      setProfiles(content);
    } catch (e) {
      const errorMessage = e;

      toast.error(errorMessage || SEARCH_ERROR);
    }
  }

  function getPageContent() {
    return profiles ? (
      <ProfileLoader profiles={profiles} />
    ) : (
      <div className="no__profiles">{NO_PROFILES}</div>
    );
  }

  function handleInputChange(e) {
    const { value } = e.target;
    setName(value);
  }

  return (
    <div className="search__container">
      <ToastContainer autoClose={TOAST_DEFAULT_DURATION} />
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
        <main className="search__result">{getPageContent()}</main>
      </div>
    </div>
  );
}
