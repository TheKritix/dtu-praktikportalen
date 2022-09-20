import React, { useState } from "react";
import "./profile.css";

const Profile = () => {

  const [title, setTitle] = useState("Profilindstillinger");

  return (
    <div>
      <div className="profileTitle">
        <p className="title">{title}</p>
      </div>
      <div className="profile">
        <div className="profileMenu"></div>
        <div className="profileMain"></div>
      </div>
    </div>
  );
};

export default Profile;
