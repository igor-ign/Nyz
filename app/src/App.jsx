import "./index.css";

import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";

function AppRoutes() {
  return (
    <div className="app-routes">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
