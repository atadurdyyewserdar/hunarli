import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LargeScreenNavbar = ({ isAuth, logout, imgUrl }) => {
  return (
    <ul
      className={
        "top-[60px] w-full md:flex hidden items-center md:z-auto z-[98] md:p-0 md:w-auto left-0 pl-0 bg-white p-12"
      }
    >
      <li className="p-1 mx-3">
        <Link
          to="/search"
          className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
        >
          Ishler
        </Link>
      </li>
      {!isAuth && (
        <li className="p-1 mx-3">
          <Link
            to="/login"
            className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
          >
            Login
          </Link>
        </li>
      )}
      {!isAuth && (
        <li className="p-1 mx-3">
          <Link
            to="/signup"
            className="font-semibold no-underline hover:bg-[#001131] px-5 py-2 bg-[#001131e0] text-white rounded-lg"
          >
            Sign Up
          </Link>
        </li>
      )}

      {isAuth && (
        <li className="p-1 mx-3">
          {/* <Link
            to="/"
            className="font-semibold no-underline hover:bg-[#001131] px-5 py-2 bg-[#001131e0] text-white rounded-lg"
            onClick={logout}
          >
            Logout
          </Link> */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="rounded-[50%] inline-flex w-full justify-center gap-x-1.5 bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <img
                  className="h-8 rounded-[50%]"
                  src={imgUrl ? imgUrl : null}
                  alt=""
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/myprofile"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        My profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      )}
    </ul>
  );
};

export default LargeScreenNavbar;
