import React from "react";
import "./homecomponents.css";

const CheckBox = ({ item, onChangeCheckBox, selectedCategories }) => {
  return (
    <li key={item.id}>
      <input
        className="m-1 ml-0"
        type="checkbox"
        id="category"
        value={item.value}
        onChange={(e) =>
          onChangeCheckBox(
            e.target.value,
            selectedCategories.split(",").includes(item.value)
          )
        }
        defaultChecked={selectedCategories.split(",").includes(item.value)}
      />
      <label className="ml-2 text-black" htmlFor="category">
        {item.title}
      </label>
    </li>
  );
};

export default CheckBox;
