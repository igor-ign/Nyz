import "./index.css";

import { Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";

function AppRoutes() {
  return (
    <div className="app-routes">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
