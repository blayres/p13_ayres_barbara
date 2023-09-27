import "./User.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { profileUser, updateUser } from "../../api/User";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login } from "../../features/userSlice";

function User() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user && user.token) {
      console.log("Token:", user.token);
    } else {
      console.log("Token não encontrado no estado Redux.");
    }
  }, [user]);

  useEffect(() => {
    if (user && user.token) {
      async function getUserProfile() {
        const userProfile = await profileUser();
        if (userProfile && userProfile.body) {
          dispatch(
            login({
              ...userProfile.body,
              token: user.token,
            })
          );
        }
      }

      getUserProfile();
    }
  }, [user, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProfile = await updateUser(firstName, lastName);
    if (!updateProfile) {
      alert("Oups, ocorreu um erro.");
    } else {
      alert("Perfil atualizado com sucesso.");
      const updatedUser = { ...user, firstName, lastName };
      dispatch(login(updatedUser));
    }
  };

  function openForm() {
    document.getElementById("form").style.display = "block";
  }

  function closeForm() {
    document.getElementById("form").style.display = "none";
  }

  return (
    <div className="page-user">
      <Header />

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user?.firstName} {user?.lastName}
          </h1>
          <button id="btn" className="edit-button" onClick={openForm}>
            Edit Name
          </button>
          <form
            className="form"
            id="form"
            style={{ display: "none" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="labels">
              <div className="input-wrapper">
                <label htmlFor="firstName"></label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Tony"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName"></label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Stark"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="buttons">
              <button
                type="submit"
                className="save-in-button"
                onClick={closeForm}
              >
                Save
              </button>
              <button
                type="button"
                className="cancel-in-button"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default User;
