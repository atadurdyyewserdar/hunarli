import React from "react";

const NotificationBar = ({ error }) => {
  return <div className="w-full border border-red-700 text-red-700 p-2 m-1">{error}</div>;
};

export default NotificationBar;
