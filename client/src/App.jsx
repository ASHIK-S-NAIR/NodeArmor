import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/style-desktop.css";
import "./styles/style-tablet.css";
import "./styles/style-mobile.css";

import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
