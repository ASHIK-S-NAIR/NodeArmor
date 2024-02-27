import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/style-desktop.css";
import "./styles/style-tablet.css";
import "./styles/style-mobile.css";

import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserBoard from "./pages/UserBoard";
import UserRoutes from "./setup/auth/UserRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/userBoard/:currentTab/:userId"
        element={
          <UserRoutes>
            <UserBoard />
          </UserRoutes>
        }
      />
    </Routes>
  );
};

export default App;
