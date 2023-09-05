import "./Header.css";
import logo from "../../assets/argentBankLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    if (user && location.pathname === "/signin") {
      navigate("/user");
    }

    if (!user && location.pathname === "/user") {
      navigate("/signin");
    }
  }, [user, location, navigate]);

  const dispatch = useDispatch();

  function logoutSubmit() {
    console.log("logout");
    dispatch(logout());
    navigate("/");
  }

  return (
    <nav className="main-nav">
      <div className="main-nav-logo">
        <Link to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
      </div>
      {!user && (
        <div>
          <Link to="/signin">
            <div className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              <p>Sign In</p>
            </div>
          </Link>
        </div>
      )}
      {user && (
        <div>
          <a href="#" onClick={logoutSubmit}>
            <div className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              Log out
            </div>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Header;
