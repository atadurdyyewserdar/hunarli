import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../redux/authSlice";
import LargeScreenNavbar from "./LargeScreenNavbar";
import SmallScreenNavbar from "./SmallScreenNavbar";
import './header.css'

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { profilePictureUrl } = useSelector((state) => state.auth.user) || "";
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await dispatch(logout());
  };

  return (
    <>
      <header className="flex mx-auto w-full justify-center max-w-screen-xl">
        <div className="w-full flex justify-between items-center bg-[#ffff] p-3">
          <h1 className="font-extrabold text-[30px]">
            <Link className="logo" to="/">Hünärli.com</Link>
          </h1>
          <LargeScreenNavbar
            isAuth={isAuth}
            logout={logoutUser}
            imgUrl={profilePictureUrl}
          />
          <SmallScreenNavbar isAuth={isAuth} logout={logoutUser}/>
        </div>
      </header>
    </>
  );
};

export default Header;
