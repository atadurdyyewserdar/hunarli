import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BriefcaseIcon, ArrowPathIcon, MapPinIcon } from "@heroicons/react/24/outline";

const HomeSearchContainer = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("all");
  const [rotate, setRotate] = useState(false);
  const onChangeHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const navigate = useNavigate();

  const onClickHandler = () => {
    setRotate(true);
    setTimeout(() => {
      if (!title.length) {
        navigate(`/search?location=${location}`);
        return;
      }
      navigate(`/search?title=${title}&location=${location}`);
    }, 500);
  };

  return (
    <>
      <div className="max-w-lg">
        <h1 className="text-[30px] font-bold md:ml-0 mt-5">
          Lorem ipsum dolor sit amet consectetur
        </h1>
        <p className="mb-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          repellat aut reprehenderit incidunt ullam ipsam iusto blanditiis
          architecto.
        </p>
      </div>
      <div className="flex flex-wrap max-w-3xl">
        <div className="bg-[#001131e0] flex items-center rounded-sm md:ml-0 m-3 box-border h-12 border border-[#001131] w-full md:flex-1">
          <BriefcaseIcon className="text-white h-8 pr-2 pl-2" />
          <input
            type="text"
            className="rounded-l-lg pl-5 h-full w-full focus:outline-none"
            placeholder="Hunar ady..."
            value={title}
            onChange={onChangeHandler}
          />
        </div>
        <div className="bg-[#001131e0] flex items-center md:m-3 m-3 h-12 border-[1px] rounded-sm border-[#001131] box-border w-full md:flex-1">
          <MapPinIcon className="text-white h-8 pr-2 pl-2" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-l-lg text-[16px] pl-5 h-full w-full focus:outline-none"
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
        </div>
        <button
          onClick={onClickHandler}
          className="flex items-center justify-center rounded-sm md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full flex-1 md:flex-1"
        >
          {rotate ? (
            <ArrowPathIcon className="h-6 w-6 font-bold text-white animate-spin" />
          ) : (
            <>Search</>
          )}
        </button>
      </div>
    </>
  );
};

export default HomeSearchContainer;
