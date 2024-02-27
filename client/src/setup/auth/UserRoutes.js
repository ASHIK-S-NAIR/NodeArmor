import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../api/auth/index";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    return navigate("/");
  }

  return children;
};

export default UserRoutes;
