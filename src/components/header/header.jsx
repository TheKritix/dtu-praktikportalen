import React from "react";
import "./header.css";
import dtulogo from "../../images/dtu-logo.png";

export const Header = () => {
  return (
    <div>
      <div>
        <img className="dtulogo" src={dtulogo} alt="DTU-Logo" />
      </div>
    </div>
  );
};

export default Header;
