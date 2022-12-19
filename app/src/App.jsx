import "./index.css";

import { Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import { WEBSITE_PATHS } from "./constants";

function AppRoutes() {
  return (
    <div className="app-routes">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={WEBSITE_PATHS.REGISTER} element={<Register />} />
        <Route path={WEBSITE_PATHS.HOME} element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
