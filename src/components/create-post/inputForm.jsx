import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import "../create-post/inputForm.css";
import {useState} from "react";


import placeholderImg from "../../res/images/CameraImage.svg";



const InputForm = () => {


    const defaultObject = () => ({
        company: "",
        country: "",
        description: "",
        location: "",
        position: "",
        startdate: "",
        type: ""
    });
    const [createdPost, setCreatedPost] = useState([defaultObject]);


    // eslint-disable-next-line no-unused-vars
    const [fileImage, setFileImage] = useState();
    const [previewImage, setPreviewImage] = useState(placeholderImg);

    const saveFile = (e) => {
        setFileImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleChangePost = (e) => {
        setCreatedPost({
            ...createdPost,
            [e.target.name]: e.target.value,
        });
    };

    const setDefaultState = () => {
        setCreatedPost(defaultObject);
    }

    const submitPost = (e) => {
        //e.preventDefault();
        const postObject = {
            company: createdPost.company,
            country: createdPost.country,
            description: createdPost.description,
            location: createdPost.location,
            position: createdPost.position,
            startdate: createdPost.startdate,
            type: createdPost.type
        };

        const formData = new FormData();
        formData.append("company", createdPost.company);
        formData.append("country", createdPost.country)
        formData.append("description", createdPost.description)
        formData.append("location", createdPost.location)
        formData.append("position", createdPost.position)
        formData.append("startdate", createdPost.startdate);
        formData.append("type", createdPost.type)

        if (
            !(
                postObject.company === "" &&
                postObject.description === "" &&
                postObject.type === ""
            )
        ) {
            fetch(`https://api.praktikportal.diplomportal.dk/api/post`, {
                method: "POST",
                action: "/",
                body: formData
            }).then(() => {
                setDefaultState();
                console.log("post created");
            });
        } else {
            //needs changing
            alert.show("info missing")
        }
    };

    

    return (
    
        <Form className="form-container">
            <div className="form-content">
                <div className="left-input-content">
                    <Form.Group>
                        <h3 className="form-titel-text">Jobtitel</h3>
                        <Form.Control className="form-input" type="title" placeholder="Titel på stillingen" disabled></Form.Control>
                        
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
                        <Form.Control className="form-description" as="textarea" rows={8} placeholder="Tilføj beskrivelse af stilling" onChange={handleChangePost}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <h3 className="form-titel-text">Upload billede</h3>
                        <img className="form-banner-image" src={previewImage} alt="bannerImg"></img>
                        <Form.Control className="form-banner-input" 
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={saveFile} />
                    </Form.Group>
                </div>
            </div>
            <div className="form-button-div">
                <Button className="preview-button" size="lg" disabled>Preview opslag</Button>
                <Button className="form-submit-button" type="submit" size="lg" onClick={submitPost}>Opret stilling</Button>  
            </div>
        </Form>
        
    );
}

export default InputForm; 