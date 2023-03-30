import React from "react";
import { useState } from "react";
import CheckBox from "../home/CheckBox";
import RadioButtonBox from "../home/RadioButtonBox";

const NormalViewFilters = ({
  categoryFilters,
  dateFilters,
  initialSearchParams,
  onChangeRadio,
  onChangeCheckBox,
  searchParams,
  fOpen,
}) => {
  return (
    <div
      className={`${!fOpen && 'hidden'} ${
        fOpen && "flex flex-col justify-center"
      } md:block md:max-w-[330px] w-full md:sticky top-5 h-fit`}
    >
      {/* <div className="rounded-md md:p-0 p-3 w-full h-fit bg-[#001131e0]">
        <div className="mb-1">
          <div className="flex items-center gap-3 p-3 pb-2 rounded-md">
            <img
              className="h-6"
              src={getImageUrl("../assets/icons/sort.png")}
              alt=""
            />
            <h1 className="text-white">Sort</h1>
          </div>
          <div>
            <div>
              <ul className="p-3 pt-0 ml-8 rounded-b-md ">
                {sortFilter.map((c, index) => (
                  <RadioButtonBox
                    key={index}
                    item={c}
                    radioName={"date"}
                    currentSelected={initialSearchParams.dateS || "all"}
                    onChangeRadio={onChangeRadio}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      <div className="md:p-0 p-3 w-full h-fit text-white">
        <div className="mb-3  rounded-sm">
          <div className="p-3 bg-[#001131e0] pb-2 border-b">
            <h1 className="font-semibold text-[17px]">Categories</h1>
          </div>
          <div className="pb-3">
            <ul className="p-3 pt-1 pb-2 rounded-b-sm">
              {categoryFilters.map((c, index) => (
                <CheckBox
                  key={index}
                  item={c}
                  onChangeCheckBox={onChangeCheckBox}
                  selectedCategories={
                    // initialSearchParams.categories || "all"
                    searchParams.get("categories") || "all"
                  }
                />
              ))}
            </ul>
          </div>
        </div>
        <div className=" rounded-sm">
          <div className="p-3 pb-2 pt-2 border-b bg-[#001131e0]">
            <h1 className="font-semibold text-[17px] ">Date posted</h1>
          </div>
          <div className="pb-3 pt-3  rounded-b-sm">
            <div>
              <ul className="p-3 pt-0 rounded-b-md ">
                {dateFilters.map((c, index) => (
                  <RadioButtonBox
                    key={index}
                    item={c}
                    radioName={"date"}
                    currentSelected={initialSearchParams.dateS || "all"}
                    onChangeRadio={onChangeRadio}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalViewFilters;
