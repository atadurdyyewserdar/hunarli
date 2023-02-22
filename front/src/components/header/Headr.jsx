import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../redux/authSlice";
import "./header.css";

const Headr = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await dispatch(logout());
  };

  const test = async () => {
    const instance = axios.create({
      withCredentials: true,
    });
    const resp = await instance
      .get("http://localhost:8080/test")
      .catch((err) => {
        console.log(err.response.data.message);
      });
    console.log(resp.data);
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="search">
          <input className="search-field" type="text" placeholder="Gozleg" />
          <span className="helper-span"></span>
          <button className="btn-search"></button>
        </div>
        <div className="buttons">
          {isAuth === true ? (
            <>
              <button className="btn-nav" onClick={logoutUser}>
                Cykys
              </button>
              <button className="btn-nav" onClick={test}>
                Test
              </button>
            </>
          ) : (
            <>
              <button className="btn-nav" onClick={() => navigate("/signup")}>
                Agza bol
              </button>
              <button className="btn-nav" onClick={() => navigate("/login")}>
                Giris
              </button>
              <button className="btn-nav" onClick={test}>
                Test
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headr;
