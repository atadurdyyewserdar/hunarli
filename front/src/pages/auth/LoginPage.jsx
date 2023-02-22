import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import WronUsernameOrPassword from "../../components/auth/WrongUsernameOrPassword";
import { useAuth } from "../../hooks/useAuth";
import { login, resetError } from "../../redux/authSlice";
import "./auth.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth } = useAuth();
  const { error, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleLoginClick = async () => {
    await dispatch(login({ username, password, navigate }));
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
            <h2>Giris</h2>
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
              placeholder="Ulanyjy ady yada email"
              onChange={onChangeUsername}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Parol"
              onChange={onChangePassword}
            />
          </div>
          <div className="auth__action-buttons">
            <button onClick={handleLoginClick} className="auth__button">
              Gir
            </button>
          </div>
          <div className="auth__action-links">
            Hasabynyz yokmy?
            <span> </span>
            <a href="/signup">Hasap ac</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
