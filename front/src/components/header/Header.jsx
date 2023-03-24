import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getImageUrl } from "../../hooks/utils";
import { logout } from "../../redux/authSlice";
import LargeScreenNavbar from "./LargeScreenNavbar";
import SmallScreenNavbar from "./SmallScreenNavbar";

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
      <header className="flex mx-auto w-full justify-center max-w-screen-xl ">
        <div className="w-full flex justify-between items-center bg-[#ffff] p-3">
          <h1 className="font-extrabold text-[30px]">
            <Link>VACANCY</Link>
          </h1>
          {open ? (
            <img
              className="md:hidden h-5 z-[99] cursor-pointer"
              src={getImageUrl("../assets/icons/close.png")}
              alt=""
              onClick={() => setOpen(!open)}
            />
          ) : null}
          {!open ? (
            <img
              className="md:hidden h-5 z-[99] cursor-pointer"
              src={getImageUrl("../assets/icons/menu.png")}
              alt=""
              onClick={() => setOpen(!open)}
            />
          ) : null}
          <LargeScreenNavbar
            isAuth={isAuth}
            logout={logoutUser}
            imgUrl={profilePictureUrl}
          />
          {open && <SmallScreenNavbar isAuth={isAuth} logout={logoutUser} />}
        </div>
      </header>
    </>
  );
};

export default Header;
