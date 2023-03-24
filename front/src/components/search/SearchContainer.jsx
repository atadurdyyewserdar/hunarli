import React, { useState } from "react";
import { getImageUrl } from "../../hooks/utils";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/solid";

const SearchContainer = (props) => {
  const [title, setTitle] = useState(props.title || "");
  const [location, setLocation] = useState(props.location || "all");
  const { isLoading } = props;

  const onChangeHandler = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const onClickHandler = () => {
    props.onClick(title, location);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-11">
      <div className=" bg-[#f0f0f0] md:min-w-[330px] flex items-center rounded-sm sm:my-auto sm:mx-auto m-2 box-border h-12 border border-gray-400 w-full md:flex-1">
        <input
          type="text"
          className="rounded-lg bg-[#f0f0f0] pl-5 h-full w-full focus:outline-none"
          placeholder="Hunar ady..."
          value={title}
          onChange={(e) => onChangeHandler(e, setTitle)}
        />
        <BriefcaseIcon className="h-6 pr-2 pl-2" />
      </div>
      <div className="md:min-w-[330px] bg-[#f0f0f0] flex items-center h-12 rounded-sm sm:my-auto sm:mx-auto m-2 border border-gray-400 box-border w-full md:flex-1">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-lg bg-[#f0f0f0] text-[18px] pl-5 h-full w-full focus:outline-none"
        >
          <option value="all">All</option>
          <option value="Ashgabat">Ashgabat</option>
          <option value="Mary">Mary</option>
          <option value="Anew">Anew</option>
          <option value="Turkmenbashy">Turkmenbashy</option>
          <option value="Dashoguz">Dashoguz</option>
          <option value="Nebitdag">Nebitdag</option>
          <option value="Turkmenabat">Turkmenabat</option>
        </select>
        <MapPinIcon className="h-6 pr-2 pl-2" />
      </div>
      <button
        onClick={onClickHandler}
        className="md:min-w-[330px] flex items-center justify-center sm:my-auto sm:mx-auto m-2 box-border rounded-sm h-12 bg-[#001131e0] text-white w-full md:flex-1"
      >
        {isLoading ? (
          <img
            className={`h-4 pr-2 pl-2 animate-spin`}
            src={getImageUrl("../assets/icons/rotate.png")}
            alt=""
          />
        ) : (
          <h1>Search</h1>
        )}
      </button>
    </div>
  );
};

export default SearchContainer;
