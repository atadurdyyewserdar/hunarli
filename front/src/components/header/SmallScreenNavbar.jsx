import React from "react";
import { Link } from "react-router-dom";

const SmallScreenNavbar = ({ isAuth, logout }) => {
  return (
    <ul
      className={
        "flex-col w-full top-[50px] justify-center flex fixed md:hidden z-[98] left-0 pl-0 bg-white p-12 pt-0"
      }
    >
      <li className="p-1 mt-3 mx-3">
        <a
          href="#"
          className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
        >
          Ishler
        </a>
      </li>
      <li className="p-1 mt-3 mx-3">
        <a
          href="#"
          className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
        >
          Habarlas
        </a>
      </li>
      <li className="p-1 mt-3 mx-3">
        <a
          href="#"
          className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
        >
          Biz barada
        </a>
      </li>
      {!isAuth && (
        <li className="p-1 mt-3 mx-3">
          <Link
            to="/login"
            className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
          >
            Login
          </Link>
        </li>
      )}
      {!isAuth && (
        <li className="p-1 mt-3 mx-3">
          <Link
            to="/signup"
            className="font-semibold no-underline hover:bg-[#001131] px-5 py-2 bg-[#001131e0] text-white rounded-lg"
          >
            Sign Up
          </Link>
        </li>
      )}

      {isAuth && (
        <li className="p-1 mt-3 mx-3">
          <Link
            to="/"
            className="font-semibold no-underline hover:bg-[#001131] px-5 py-2 bg-[#001131e0] text-white rounded-lg"
            onClick={logout}
          >
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};

export default SmallScreenNavbar;
