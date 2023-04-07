import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  BriefcaseIcon,
  ArrowPathIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

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
          Iş orunlarynyň gözlegi
        </h1>
        <p className="mb-3">
          “Hunarli” bilen Siz öziňize laýyk gelýän iş ornunlaryny, öňde barýan
          kärhanalary we tejribleli işçileri tapyp bilersiňiz
        </p>
      </div>
      <div className="flex flex-wrap max-w-3xl">
        <div className="bg-[#001131e0] flex items-center rounded-sm md:ml-0 m-3 box-border h-12 border border-[#001131] w-full md:flex-1">
          <BriefcaseIcon className="text-white h-8 pr-2 pl-2" />
          <input
            type="text"
            className="rounded-l-lg pl-5 h-full w-full focus:outline-none"
            placeholder="Hünär ady..."
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
            name="location"
          >
            <option value="all">Ählisi</option>
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
          className="flex items-center justify-center rounded-sm md:m-3 m-3 h-12 bg-[#001131e0] text-white w-full flex-1 md:flex-1"
        >
          {rotate ? (
            <ArrowPathIcon className="h-6 w-6 font-bold text-white animate-spin" />
          ) : (
            <>Gözlet</>
          )}
        </button>
      </div>
    </>
  );
};

export default HomeSearchContainer;
