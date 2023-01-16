import "./Header.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { PostModal } from "../PostModal/PostModal";

import { useGlobalUser } from "../../context";

import {
  MENU_STATES,
  WEBSITE_PATHS,
  TOAST_DEFAULT_DURATION,
} from "../../constants";

import NYZ_LOGO from "../../assets/nyz__logo.svg";
import HAMBURGER from "../../assets/hamburger__icon.svg";
import CLOSE_MENU from "../../assets/close__menu.svg";

export function Header() {
  const [menuImage, setMenuImage] = useState(HAMBURGER);
  const [menu, setMenu] = useState(MENU_STATES.CLOSED);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [globalUser] = useGlobalUser();

  const navigate = useNavigate();

  function handleOpenMenu() {
    const isMenuClosed = menu === MENU_STATES.CLOSED;

    isMenuClosed ? setMenuImage(CLOSE_MENU) : setMenuImage(HAMBURGER);
    isMenuClosed ? setMenu(MENU_STATES.OPEN) : setMenu(MENU_STATES.CLOSED);
  }

  function handleOpenPostModal() {
    setIsPostModalOpen(true);
  }

  function handleClosePostModal() {
    setIsPostModalOpen(false);
  }

  function handleOpenSucessToast(message) {
    toast.success(message);
  }

  function handleOpenErrorToast(message) {
    toast.error(message);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate(WEBSITE_PATHS.LOGIN);
  }

  function handleNavigate(e) {
    const { id } = e.target;

    navigate(`${WEBSITE_PATHS[id]}`);
  }

  return (
    <div className="header__container">
      <ToastContainer autoClose={TOAST_DEFAULT_DURATION} />
      <PostModal
        isOpen={isPostModalOpen}
        handleClose={handleClosePostModal}
        user={globalUser}
        sucessToast={handleOpenSucessToast}
        errorToast={handleOpenErrorToast}
      />

      <div className="header__content">
        <img src={NYZ_LOGO} alt="Nyz logo" />

        <nav className={`nav ${menu}`}>
          <ul className="menu__container" type="none">
            <li className="menu__item" onClick={handleNavigate} id="HOME">
              Home
            </li>
            <li className="menu__item" onClick={handleOpenPostModal}>
              Add Post
            </li>
            <li className="menu__item" onClick={handleNavigate} id="SEARCH">
              Search
            </li>
            <li className="menu__item" onClick={handleNavigate} id="PROFILE">
              Profile
            </li>
            <li className="menu__item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>

        <img
          src={menuImage}
          alt="Hamburger menu icon"
          className="hamburger"
          onClick={handleOpenMenu}
        />
      </div>
    </div>
  );
}
