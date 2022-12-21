import "./Header.css";

import { useState } from "react";

import { PostModal } from "../PostModal/PostModal";

import { useGlobalUser } from "../../context";

import { MENU_STATES } from "../../constants";

import NYZ_LOGO from "../../assets/nyz__logo.svg";
import HAMBURGER from "../../assets/hamburger__icon.svg";
import CLOSE_MENU from "../../assets/close__menu.svg";

export function Header() {
  const [menuImage, setMenuImage] = useState(HAMBURGER);
  const [menu, setMenu] = useState(MENU_STATES.CLOSED);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [globalUser] = useGlobalUser();

  function handleOpenMenu() {
    const isMenuClosed = menu === MENU_STATES.CLOSED;
    const isMenuOpen = menu === MENU_STATES.OPEN;

    if (isMenuClosed) {
      setMenu(MENU_STATES.OPEN);
      setMenuImage(CLOSE_MENU);
    }

    if (isMenuOpen) {
      setMenu(MENU_STATES.CLOSED);
      setMenuImage(HAMBURGER);
    }
  }

  function handleOpenPostModal() {
    setIsPostModalOpen(true);
  }

  function handleClosePostModal() {
    setIsPostModalOpen(false);
  }

  return (
    <div className="header__container">
      <PostModal
        isOpen={isPostModalOpen}
        handleClose={handleClosePostModal}
        user={globalUser}
      />

      <div className="header__content">
        <img src={NYZ_LOGO} alt="Nyz logo" />

        <nav className={`nav ${menu}`}>
          <ul className="menu__container" type="none">
            <li className="menu__item">Home</li>
            <li className="menu__item" onClick={handleOpenPostModal}>
              Add Post
            </li>
            <li className="menu__item">Search</li>
            <li className="menu__item">Profile</li>
            <li className="menu__item">Logout</li>
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
