import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";
import { getUser } from "../../api/user";

const UserBoard = () => {
  const { currentTab, userId } = useParams();
  const [tabActive, setTabActive] = useState(currentTab);
  const [name, setName] = useState("");

  const { user, token } = isAuthenticated;

  const preload = async (userId, token) => {
    try {
      const data = await getUser({userId, token});
      if (data.error) {
        return console.log(data.error);
      } else {
        return setName(data.firstName);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    setTabActive(currentTab);
    preload(userId, token);
  }, [currentTab, token, userId]);

  return (
    <section className="userBoard">
      <nav className="userBoard-nav">
        <div className="userBoard-nav-wrap special-wrap">
          <Link to="/">
            <h2 className="userBoard-nav-logo">Node Armor</h2>
          </Link>
          <div className="userBoard-toggle-sec">
            <div className="userBoard-toggle-icon">
              <h2 className="userBoard-toggle-icon-alphabet">{name.charAt(0).toUpperCase()}</h2>
            </div>
            <h3 className="userBoard-toggle-firstName">{name}</h3>
            <div className="userBoard-toggle-arrow-sec"></div>
          </div>
        </div>
      </nav>
      <div className="userBoard-body">
        <div className="userBoard-body-wrap special-wrap">
          <div className="userBoard-body-left"></div>
          <div className="userBoard-body-right"></div>
        </div>
      </div>
    </section>
  );
};

export default UserBoard;
