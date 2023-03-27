import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getImageUrl } from "../../hooks/utils";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

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
        <div className="bg-[#f0f0f0] flex items-center rounded-lg md:ml-0 m-3 box-border h-12 border border-gray-400 w-full md:flex-1">
          <input
            type="text"
            className="rounded-lg bg-[#f0f0f0] pl-5 h-full w-full focus:outline-none"
            placeholder="Hunar ady..."
            value={title}
            onChange={onChangeHandler}
          />
          <img
            className="h-6 pr-2 pl-2"
            src={getImageUrl("../assets/icons/job-search.png")}
            alt=""
          />
        </div>
        <div className="bg-[#f0f0f0] flex items-center md:m-3 m-3 h-12 border-[1px] rounded-lg border-gray-400 box-border w-full md:flex-1">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg bg-[#f0f0f0] text-[16px] pl-5 h-full w-full focus:outline-none"
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
          <img
            className="h-6 pr-2 pl-2"
            src={getImageUrl("../assets/icons/job-location.png")}
            alt=""
          />
        </div>
        <button
          onClick={onClickHandler}
          className="flex items-center justify-center rounded-lg md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full flex-1 md:flex-1"
        >
          {rotate ? (
            <ArrowPathIcon className="h-6 w-6 font-bold text-white animate-spin" />
          ) : (
            <>
              <img
                className="h-6 pr-2 pl-2"
                src={getImageUrl("../assets/icons/smile.png")}
                alt=""
              />
              Search
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default HomeSearchContainer;
