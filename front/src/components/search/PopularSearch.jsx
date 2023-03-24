import React from "react";
import { getImageUrl } from "../../hooks/utils";

const PopularSearch = () => {
  return (
    <div className="sm:mx-auto sm:my-auto sm:mt-7 m-2 mt-7 ">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-[20px]">Popular searchs</h1>
        <img
          className="h-6"
          src={getImageUrl("../assets/icons/star.png")}
          alt=""
        />
      </div>
      <ul className="flex pt-3 gap-5 flex-wrap">
        <li className="border-2 border-[#001131e0] rounded-md p-1 pl-2 pr-2">
          <a href="" className="">
            Software Developer
          </a>
        </li>
        <li className="border-2 border-[#001131e0] rounded-md p-1 pl-2 pr-2">
          <a href="" className="">
            Maneger
          </a>
        </li>
        <li className="border-2 border-[#001131e0] rounded-md p-1 pl-2 pr-2">
          <a href="" className="">
            Backend Engineer
          </a>
        </li>
        <li className="border-2 border-[#001131e0] rounded-md p-1 pl-2 pr-2">
          <a href="" className="">
            Python Developer
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PopularSearch;
