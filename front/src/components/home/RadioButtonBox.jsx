import React from "react";
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
        {item.title}
      </label>
    </li>
  );
};

export default RadioButtonBox;
