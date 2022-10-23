import React from "react";
import "./profileSettings.css";
import "@fontsource/poppins";
import Form from "react-bootstrap/Form";

// Profil billede source: https://www.reddit.com/r/DANMAG/comments/2cevxx/vores_allesammens_kronprins_frederik/
import image from "./profileTestImage.jpg";
import addImage from "../../res/images/add-image.png";

// Textbox Source: https://react-bootstrap.github.io/forms/form-control/


const ProfileSettings = () => {
  //const [name, setName] = useState("PLACEHOLDER NAME");
  return (
    <div>
      <div className="profileBackdrop" onClick={true /* Do something */}>
        {image && <img src={image} alt="profileBackDropImage" className="backDropImage"/>}
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
    </div>
  );
};

export default ProfileSettings;
