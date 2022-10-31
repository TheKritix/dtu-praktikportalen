import React, { useState, useRef } from "react";

import "./profileSettings.css";
import "./profileImagePopup.css";
import "@fontsource/poppins";
import Form from "react-bootstrap/Form";

// Source: https://www.npmjs.com/package/react-image-crop
// Source: https://www.npmjs.com/package/reactjs-popup
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { returnCrop } from "./returnCrop";

// Profil billede source: https://www.reddit.com/r/DANMAG/comments/2cevxx/vores_allesammens_kronprins_frederik/
import imageTest from "./profileTestImage.jpg";
import addImage from "../../res/images/add-image.png";

// Textbox Source: https://react-bootstrap.github.io/forms/form-control/

const ProfileSettings = () => {
  const inputRef = useRef(null);
  const [crop, setCrop] = useState();

  const [uploadBackdropImage, setUploadBackdropImage] = useState();
  const [finishedCrop, setFinishedCrop] = useState();

  const imgRef = useRef(null);
  const finishedImageRef = useRef(null);

  const [backdropUploadState, setBackdropUploadState] = useState(false);

  // Test Variables START

  const [image, setImage] = useState(imageTest);

  // --- Test Variables --- END

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChangeBackdrop = (e) => {
    if (!e.target.files[0]) {
      return;
    } else {
      const imgObject = new Image();

      imgObject.src = URL.createObjectURL(e.target.files[0]);

      imgObject.onload = () => {
        setCrop(
          makeAspectCrop(
            {
              unit: "%",
              width: 50,
            },
            5 / 1,
            imgObject.width,
            imgObject.height
          )
        );
      };
      setUploadBackdropImage(imgObject.src);
      setBackdropUploadState(true);
    }
  };

  const ClearPopup = () => {
    setBackdropUploadState(false);
  };

  const CompleteCrop = () => {
    setImage(
      returnCrop(imgRef.current, finishedImageRef.current, finishedCrop)
    );
  };

  return (
    <div>
      <div className="profileBackdrop" onClick={handleClick}>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChangeBackdrop}
        />
        {image && (
          <img
            src={image}
            alt="profileBackDropImage"
            className="backDropImage"
          />
        )}
        <img className="backDropImageAdd" alt="addImage icon" src={addImage} />
      </div>
      <div className="profilePicture">
        <img src={image} className="image" alt="profilbillede" />
        <img className="profileImageAdd" alt="addImage icon" src={addImage} />
      </div>
      <p className="name">{"PLACEHOLDER NAME"}</p>
      <p className="description">Student</p>

      <div className="namebox-container">
        <p className="textbox-name">Navn</p>
        <Form.Control className="name-textbox" placeholder="Navn" />
      </div>
      <div className="cv-container">
        <p className="textbox-cv">Resumé</p>
        <Form.Control className="cv-textbox" type="file" />
      </div>

      <div className="description-container">
        <p className="textbox-description">Beskrivelse</p>
        <Form.Control
          as="textArea"
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
          open={backdropUploadState}
          position="right center"
          onClose={ClearPopup}
        >
          <div className="popupContainer">
            <div className="popupImage">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setFinishedCrop(c)}
                aspect={5 / 1}
              >
                <img ref={imgRef} src={uploadBackdropImage} alt="nah" />
              </ReactCrop>
            </div>
            <button className="popupButton" onClick={ClearPopup}>
              Gem
            </button>

            <button className="popupButton" onClick={CompleteCrop}>
              Se
            </button>
            {finishedCrop && (
              <canvas
                ref={finishedImageRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: finishedCrop.width,
                  height: finishedCrop.height,
                }}
              />
            )}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ProfileSettings;
