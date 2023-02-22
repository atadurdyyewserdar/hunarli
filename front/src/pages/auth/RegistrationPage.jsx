import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import WronUsernameOrPassword from "../../components/auth/WrongUsernameOrPassword";
import { useAuth } from "../../hooks/useAuth";
import { register, resetError } from "../../redux/authSlice";
import "./auth.css";

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isAuth } = useAuth();
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const registerUser = async () => {
    await dispatch(
      register({ firstName, lastName, username, password, email, navigate })
    );
  };

  const onClicErrorClose = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="auth__section">
      <div className="auth__container">
        <div className="auth__container-box">
          <div className="auth-title">
            <h2>Taze ulanyjy</h2>
          </div>
          {error && (
            <WronUsernameOrPassword
              error_message={error}
              hidden={onClicErrorClose}
            />
          )}
          <div className="auth-input-forms">
            <input
              className="auth-input"
              type="text"
              placeholder="Adynyz"
              onChange={(e) => onChangeInput(e, setFirstName)}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Familyanyz"
              onChange={(e) => onChangeInput(e, setLastName)}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Ulanyjy ady"
              onChange={(e) => onChangeInput(e, setUsername)}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Email"
              onChange={(e) => onChangeInput(e, setEmail)}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Parol"
              onChange={(e) => onChangeInput(e, setPassword)}
            />
          </div>
          <div className="auth__action-buttons">
            <button onClick={registerUser} className="auth__button">
              Hasap ac
            </button>
          </div>
          <div className="auth__action-links">
            Hasabynyz barmy?
            <span> </span>
            <a href="/login">Hasabynyza girin</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
