import "./index.css";

import { Routes, Route } from "react-router-dom";

import { Login, Register, Home, Search, Profile } from "./pages";

import { WEBSITE_PATHS } from "./constants";

function AppRoutes() {
  return (
    <div className="app-routes">
      <Routes>
        <Route path={WEBSITE_PATHS.LOGIN} element={<Login />} />
        <Route path={WEBSITE_PATHS.REGISTER} element={<Register />} />
        <Route path={WEBSITE_PATHS.HOME} element={<Home />} />
        <Route path={WEBSITE_PATHS.SEARCH} element={<Search />} />
        <Route path={WEBSITE_PATHS.PROFILE} element={<Profile />} />
      </Routes>
    </div>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
