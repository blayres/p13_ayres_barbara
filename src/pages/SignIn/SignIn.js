import "./SignIn.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../api/User";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signIn = await loginUser(username, password);
    if (!signIn) {
      alert("Credenciais inválidas");
    } else {
      console.log(rememberMe);
      dispatch(
        login({
          ...signIn.body,
          rememberMe,
        })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: signIn.body.token,
        })
      );

      navigate("/user");
    }
  };

  return (
    <div className="page-signin">
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} />
          <h1>Sign In</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onChange={(e) => setRememberMe(e.target.value)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;
