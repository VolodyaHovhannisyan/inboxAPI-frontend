import { useEffect } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(true);
    }
    return () => {
      if (localStorage.getItem("user")) {
        setUser(true);
      }
    };
  }, [user]);

  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">HomePage</a>
      </div>
      <ul>
        {user ? (
          <>
            {JSON.parse(localStorage?.getItem("user"))?.user?.email && (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaUser />
                {<p>{JSON.parse(localStorage?.getItem("user"))?.user?.email}</p>}
              </li>
            )}
            <li>
              <button className="btn" onClick={onClick}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/users/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/users/register">
                <FaUserAlt /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
