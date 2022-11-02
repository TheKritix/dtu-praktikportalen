import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profileSettings.css";
import "./profileImagePopup.css";
import Form from "react-bootstrap/Form";
import authService from "../../../services/auth-service";
// Source: https://www.npmjs.com/package/react-image-crop
// Source: https://www.npmjs.com/package/reactjs-popup
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { returnCrop } from "./returnCrop";

// Profil billede source: https://www.reddit.com/r/DANMAG/comments/2cevxx/vores_allesammens_kronprins_frederik/
import imageTest from "./profileTestImage.jpg";
import addImage from "../../../res/images/add-image.png";

// Textbox Source: https://react-bootstrap.github.io/forms/form-control/

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const inputRefBackdrop = useRef(null);
  const inputRefProfile = useRef(null);
  const [crop, setCrop] = useState();

  const [uploadBackdropImage, setUploadBackdropImage] = useState();
  const [finishedCrop, setFinishedCrop] = useState();

  const imgRef = useRef(null);
  const finishedImageRef = useRef(null);

  const [uploadState, setUploadState] = useState({
    boolean: false,
    type: "",
  });

  const [backdropImage, setBackdropImage] = useState(imageTest);
  const [profileImage, setProfileImage] = useState(imageTest);

  const [pdfCVAvailable, setPdfCvAvailable] = useState({
    present: false,
    file: "",
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user.username);
      console.log(user.username);
    } else {
      setCurrentUser("");
      navigate("/");
    }
  }, [navigate]);

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
    if (uploadState.type === "backdrop") {
      setBackdropImage(
        returnCrop(imgRef.current, finishedImageRef.current, finishedCrop)
      );
    } else {
      setProfileImage(
        returnCrop(imgRef.current, finishedImageRef.current, finishedCrop)
      );
    }
    ClearPopup();
  };

  const handleCVUpload = () => {
    setPdfCvAvailable({
      present: true,
      file: "",
    });
    console.log(pdfCVAvailable);
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
      <p className="name">{currentUser}</p>
      <p className="description">Student</p>

      <div className="namebox-container">
        <p className="textbox-name">Navn</p>
        <Form.Control className="name-textbox" placeholder="Navn" />
      </div>
      {!pdfCVAvailable.present && (
        <div className="cv-container">
          <p className="textbox-cv">Resumé</p>
          <Form.Control
            className="cv-textbox"
            type="file"
            onChange={handleCVUpload}
          />
        </div>
      )}

      <div className="description-container">
        <p className="textbox-description">Beskrivelse</p>
        <Form.Control
          as="textarea"
          rows={5}
          className="description-textbox"
          placeholder="Beskrivelse"
        />
      </div>

      <div className="saveButton">
        <button className="save">Gem</button>
      </div>

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
