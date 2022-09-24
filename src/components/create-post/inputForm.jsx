import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import "../create-post/inputForm.css";
import {Fragment, useState} from "react";

import previewImg from "../../res/images/CameraImage.svg";



const InputForm = () => {

    const [previewBanner, setPreviewBanner] = useState(previewImg);
    

    return (
    
        <Form className="form-container">
            <div className="form-content">
                <div className="left-input-content">
                    <Form.Group>
                        <h3 className="form-titel-text">Jobtitel</h3>
                        <Form.Control className="form-input" type="title" placeholder="Titel på stillingen"></Form.Control>
                        
                        <h3 className="form-titel-text">Stillingstype</h3>
                        <Form.Select className="form-input" placeholder="vælg stillingens type">
                            <option value="">Vælg type</option>
                            <option value="elev">Elev</option>
                            <option value="praktik">Praktik</option>
                            <option value="fuldtid">Fuldtid</option>
                            <option value="deltid">Deltid</option>
                        </Form.Select>

                        <h3 className="form-titel-text">Firmanavn</h3>
                        <Form.Control className="form-input" type="text" placeholder="Navn på firmaet"></Form.Control>
                        
                        <h3 className="form-titel-text">Placering</h3>
                        <Form.Control className="form-input" type="text" placeholder="f.eks. København"></Form.Control>

                        <h3 className="form-titel-text">Kontaktperson</h3>
                        <Form.Control className="form-input" type="text" placeholder="Navn på kontaktperson"></Form.Control>

                        <h3 className="form-titel-text">Email</h3>
                        <Form.Control className="form-input" type="email" placeholder="Indtast Email"></Form.Control>
                    
                        <h3 className="form-titel-text">Telefon</h3>
                        <InputGroup>
                            <InputGroup.Text  className="form-input">+45</InputGroup.Text>
                            <Form.Control className="form-input" type="number"></Form.Control>
                        </InputGroup>
                
                        
                    </Form.Group>
                                
                </div>
                <div className="right-input-content">
                    <Form.Group>
                        <h3 className="form-titel-text">Beskrivelse</h3>
                        <Form.Control className="form-description" as="textarea" rows={8} placeholder="Tilføj beskrivelse af stilling"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <h3 className="form-titel-text">Upload billede</h3>
                        <img className="form-banner-image" src={previewBanner}></img>
                        <Form.Control className="form-banner-input" type="file" name="file"/>
                    </Form.Group>
                </div>
            </div>
            <div className="form-button-div">
                <Button className="preview-button" size="lg">Preview opslag</Button>
                <Button className="form-submit-button" type="submit" size="lg">Opret stilling</Button>  
            </div>
        </Form>
        
    );
}

export default InputForm; 