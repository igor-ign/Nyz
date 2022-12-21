import "./Home.css";

import { useNavigate } from "react-router-dom";

import { Header } from "../../components";

import { useGlobalUser } from "../../context";

import { useEffect } from "react";

export function Home() {
  const [globalUser] = useGlobalUser();
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser();
  }, []);

  function getLoggedUser() {
    if (globalUser === null) {
      navigate("/");
    }
  }
  return (
    <div className="home__container">
      <Header />
    </div>
  );
}
