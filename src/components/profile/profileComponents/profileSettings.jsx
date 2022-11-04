import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profileSettings.css";
import "./profileImagePopup.css";
import authService from "../../../services/auth-service";
import employerService from "../../../services/employer-service";
// Source: https://www.npmjs.com/package/react-image-crop
// Source: https://www.npmjs.com/package/reactjs-popup
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { returnCrop } from "./returnCrop";

// Profil billede source: https://www.reddit.com/r/DANMAG/comments/2cevxx/vores_allesammens_kronprins_frederik/
import addImage from "../../../res/images/add-image.png";

// Setting views for the two types of users.

import EmployerSettings from "./settings/employerSettings";
import StudentSettings from "./settings/studentSettings";

// Textbox Source: https://react-bootstrap.github.io/forms/form-control/

const ProfileSettings = () => {
  const user = authService.getCurrentUser();

  const navigate = useNavigate();

  const [userType, setUserType] = useState();

  /* Image Handling */
  const inputRefBackdrop = useRef(null);
  const inputRefProfile = useRef(null);

  const [uploadBackdropImage, setUploadBackdropImage] = useState();
  const [finishedCrop, setFinishedCrop] = useState();
  const [crop, setCrop] = useState();

  const imgRef = useRef(null);
  const finishedImageRef = useRef(null);

  const [uploadState, setUploadState] = useState({
    boolean: false,
    type: "",
  });

  const [backdropImage, setBackdropImage] = useState();
  const [profileImage, setProfileImage] = useState();
  /* ------------------ */

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
    if (user && user.companyName) {
      setUserType("Employer");
    } else if (user) {
      setUserType("Student");
    }

    if (user.backdropImage) {
      setBackdropImage(user.backdropImage);
    }
    if (user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user, navigate]);

  const GetSettingsView = () => {
    let ViewComponent;

    switch (userType) {
      case "Student":
        ViewComponent = StudentSettings();
        break;
      case "Employer":
        ViewComponent = EmployerSettings();
        break;
      default:
        break;
    }

    return ViewComponent;
  };

  const handleClickBackdrop = () => {
    inputRefBackdrop.current.click();
  };

  const handleClickProfile = () => {
    inputRefProfile.current.click();
  };

  const handleFileChangeImage = (e, type) => {
    if (!e.target.files[0]) {
      return;
    } else {
      const imgObject = new Image();

      imgObject.src = URL.createObjectURL(e.target.files[0]);

      imgObject.onload = () => {
        if (type === "backdrop") {
          setCrop(
            makeAspectCrop(
              {
                unit: "%",
                width: 30,
              },
              5 / 1,
              imgObject.width,
              imgObject.height
            )
          );
        } else if (type === "profile") {
          setCrop(
            makeAspectCrop(
              {
                unit: "%",
                width: 50,
              },
              1 / 1,
              imgObject.width,
              imgObject.height
            )
          );
        }
      };
      setUploadBackdropImage(imgObject.src);
      setUploadState({ boolean: true, type: `${type}` });
    }
  };

  const ClearPopup = () => {
    setUploadState({ boolean: false, type: "" });
  };

  const CompleteCrop = () => {
    const image = returnCrop(
      imgRef.current,
      finishedImageRef.current,
      finishedCrop
    );

    if (uploadState.type === "backdrop") {
      setBackdropImage(image);
      user.backdropImage = image;
      employerService.updateBackdropImage(user);
    } else {
      setProfileImage(image);
      user.profileImage = image;
      employerService.updateProfileImage(user);
    }
    employerService.getEmployer(user);
    ClearPopup();
  };


  return (
    <div>
      <div className="profileBackdrop" onClick={handleClickBackdrop}>
        <input
          style={{ display: "none" }}
          ref={inputRefBackdrop}
          type="file"
          onChange={(event) => handleFileChangeImage(event, "backdrop")}
        />
        {backdropImage && (
          <img
            src={backdropImage}
            alt="profileBackDropImage"
            className="backDropImage"
          />
        )}
        <img className="backDropImageAdd" alt="addImage icon" src={addImage} />
      </div>
      <div className="profilePicture" onClick={handleClickProfile}>
        <input
          style={{ display: "none" }}
          ref={inputRefProfile}
          type="file"
          onChange={(event) => handleFileChangeImage(event, "profile")}
        />
        <img src={profileImage} className="image" alt="profilbillede" />
        <img className="profileImageAdd" alt="addImage icon" src={addImage} />
      </div>

      <GetSettingsView />

      {/* Det her er til popup når man skal uploade et billede. */}
      {uploadBackdropImage && (
        <Popup
          open={uploadState.boolean}
          position="right center"
          onClose={ClearPopup}
        >
          <div className="popupContainer">
            <div className="popupImage">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setFinishedCrop(c)}
                aspect={uploadState.type === "profile" ? 1 / 1 : 5 / 1}
              >
                <img ref={imgRef} src={uploadBackdropImage} alt="nah" />
              </ReactCrop>
            </div>
            <button className="popupButton" onClick={CompleteCrop}>
              Gem
            </button>

            <button className="popupButton" onClick={ClearPopup}>
              Afbryd
            </button>
            {finishedCrop && <canvas hidden ref={finishedImageRef} />}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ProfileSettings;
