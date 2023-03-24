import React, { useState } from "react";
import { getImageUrl } from "../../hooks/utils";
import "./homecomponents.css";

const RadioButtonBox = ({
  item,
  radioName,
  onChangeRadio,
  currentSelected,
}) => {
  const onChangeB = (e) => {
    onChangeRadio(e.target.value);
  };
  return (
    <li className={`${item.icon && 'flex items-center'}`}>
      <input
        className="m-1"
        type="radio"
        id="date"
        name={radioName}
        defaultChecked={currentSelected === item.value}
        value={item.value}
        onChange={(e) => onChangeB(e)}
      />
      <label className="ml-2 text-black" htmlFor="date">
        {item.title}&nbsp;
      </label>
      {item.icon && (
          <>
            <img
              className="h-5"
              src={getImageUrl(item.icon)}
              alt=""
            />
          </>
        )}
    </li>
  );
};

export default RadioButtonBox;
