import React from "react";
import { getImageUrl } from "../../hooks/utils";
import CheckBox from "../home/CheckBox";
import RadioButtonBox from "../home/RadioButtonBox";

const MobileViewFilters = ({
  categoryFilters,
  dateFilters,
  sortFilter,
  initialSearchParams,
  onChangeRadio,
  onChangeCheckBox,
  searchParams,
  setFOpen,
}) => {
  return (
    <div className="sm:hidden fixed z-[99] pt-11 bottom-0 h-full w-full bg-[#001131]">
      <div className="rounded-md p-3 w-full h-fit">
        <div className="mb-1">
          {/* <div className="flex items-center gap-3 p-3 pb-2 rounded-md">
            <img
              className="h-6"
              src={getImageUrl("../assets/icons/sort.png")}
              alt=""
            />
            <h1 className="text-white">Sort</h1>
          </div> */}
          <div>
            <div>
              <ul className="p-3 pt-0 ml-8 rounded-b-md ">
                {sortFilter.map((c, index) => (
                  <RadioButtonBox
                    key={index}
                    item={c}
                    radioName={"date"}
                    currentSelected={initialSearchParams.dateS || "all"}
                    // onChangeRadio={onChangeRadio}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md md:p-0 p-3 w-full h-fit ">
        <div className="mb-1">
          <div className="flex items-center gap-3 p-3 pb-2 rounded-md">
            <img
              className="h-6"
              src={getImageUrl("../assets/icons/category.png")}
              alt=""
            />
            <h1 className="text-white">Categories</h1>
          </div>
          <div>
            <ul className="p-3 pt-0 pb-0 ml-8 rounded-b-md ">
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
        <div>
          <div className="flex items-center gap-3 p-3 pb-1 pt-2 rounded-md mb-1 ">
            <img
              className="h-6"
              src={getImageUrl("../assets/icons/calendar.png")}
              alt=""
            />
            <h1 className="text-white">Date posted</h1>
          </div>
          <div>
            <div>
              <ul className="p-3 pt-0 ml-8 rounded-b-md ">
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
      <div className="m-4 text-center">
        <button
          onClick={() => setFOpen(false)}
          className="bg-white p-4 w-full font-semibold text-xl rounded-md text-[#001131] border-2 border-[#001131]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MobileViewFilters;
