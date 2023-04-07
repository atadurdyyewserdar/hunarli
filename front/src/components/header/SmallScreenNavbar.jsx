import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SmallScreenNavbar = ({ isAuth, logout }) => {
  return (
    <Menu as="div" className="relative inline-block text-left md:hidden">
      <div>
        <Menu.Button className="rounded-sm inline-flex w-full justify-center gap-x-1.5 bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <Bars3Icon className="h-7 text-[#001131e0]" />
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
            {isAuth && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/search"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-md"
                      )}
                    >
                      Işler
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/myprofile"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-md"
                      )}
                    >
                      Hasabym
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-md"
                      )}
                      onClick={logout}
                    >
                      Hasapdan çyk
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
            {!isAuth && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/search"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-md"
                      )}
                    >
                      Işler
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-md"
                      )}
                      onClick={logout}
                    >
                      Gir
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/signup"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-md"
                      )}
                      onClick={logout}
                    >
                      Hasap aç
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    // <ul
    //   className={
    //     "flex-col w-full top-[50px] justify-center flex fixed md:hidden z-[98] left-0 pl-0 bg-white p-12 pt-0"
    //   }
    // >
    //   <li className="p-1 mt-3 mx-3">
    //     <a
    //       href="#"
    //       className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
    //     >
    //       Ishler
    //     </a>
    //   </li>
    //   <li className="p-1 mt-3 mx-3">
    //     <a
    //       href="#"
    //       className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
    //     >
    //       Habarlas
    //     </a>
    //   </li>
    //   <li className="p-1 mt-3 mx-3">
    //     <a
    //       href="#"
    //       className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
    //     >
    //       Biz barada
    //     </a>
    //   </li>
    //   {!isAuth && (
    //     <li className="p-1 mt-3 mx-3">
    //       <Link
    //         to="/login"
    //         className="font-semibold no-underline text-[#6b6b6b] hover:text-[#001131e0]"
    //       >
    //         Login
    //       </Link>
    //     </li>
    //   )}
    //   {!isAuth && (
    //     <li className="p-1 mt-3 mx-3">
    //       <Link
    //         to="/signup"
    //         className="font-semibold no-underline hover:bg-[#001131] px-5 py-2 bg-[#001131e0] text-white rounded-lg"
    //       >
    //         Sign Up
    //       </Link>
    //     </li>
    //   )}

    //   {isAuth && (
    //     <li className="p-1 mt-3 mx-3">
    //       <Link
    //         to="/"
    //         className="font-semibold no-underline hover:bg-[#001131] px-5 py-2 bg-[#001131e0] text-white rounded-lg"
    //         onClick={logout}
    //       >
    //         Logout
    //       </Link>
    //     </li>
    //   )}
    // </ul>
  );
};

export default SmallScreenNavbar;
