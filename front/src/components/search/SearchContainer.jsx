import React, { useState } from "react";
import {
  ArrowPathIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import "../../App.css";

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
      <div className=" bg-[#001131e0] md:min-w-[330px] flex items-center rounded-sm sm:my-auto sm:mx-auto m-2 box-border h-12 border border-[#001131e0] w-full md:flex-1">
        <BriefcaseIcon className="text-white h-6 pr-3 pl-3" />
        <input
          type="text"
          className="rounded-sm pl-5 h-full w-full focus:outline-none"
          placeholder="Hünär ady..."
          value={title}
          onChange={(e) => onChangeHandler(e, setTitle)}
        />
      </div>
      <div className="md:min-w-[330px] bg-[#001131e0] flex items-center h-12 rounded-sm sm:my-auto sm:mx-auto m-2 border border-[#001131e0] box-border w-full md:flex-1">
        <MapPinIcon className="text-white h-6 pr-3 pl-3" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-sm !bg-white pl-5 h-full w-full focus:outline-none"
        >
          <option className="bg-white" value="all">Ählisi</option>
          <option value="Ashgabat">Aşgabat</option>
          <option value="Mary">Mary</option>
          <option value="Anew">Änew</option>
          <option value="Turkmenbashy">Turkmenbaşy</option>
          <option value="Dashoguz">Daşoguz</option>
          <option value="Nebitdag">Nebitdag</option>
          <option value="Turkmenabat">Türkmenabat</option>
        </select>
      </div>
      <button
        onClick={onClickHandler}
        className="md:min-w-[330px] flex items-center justify-center sm:my-auto sm:mx-auto m-2 box-border rounded-sm h-12 bg-[#001131e0] text-white w-full md:flex-1"
      >
        {isLoading ? (
          <ArrowPathIcon className="h-5 w-5 text-white animate-spin" />
        ) : (
          <h1>Gözlet</h1>
        )}
      </button>
    </div>
  );
};

export default SearchContainer;
