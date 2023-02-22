import React from "react";
import "./authcomponent.css";

function getImageUrl(name) {
  return new URL(`../../assets/icons/${name}.png`, import.meta.url).href;
}

const WronUsernameOrPassword = ({ error_message, hidden }) => {
  return (
    <div className="error__credentials">
      <span className="error__message">{error_message}</span>
      <img onClick={hidden} src={getImageUrl("close")} alt="" />
    </div>
  );
};

export default WronUsernameOrPassword;
