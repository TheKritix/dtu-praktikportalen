import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import "../create-post/inputForm.css";
import {useState} from "react";
import placeholderImg from "../../res/images/CameraImage.svg";
import { uploadPost } from '../../services/PostService'; 



const InputForm = () => {


    const defaultObject = () => ({
        title: "",
        type: "",
        company: "",
        location: "",
        startdate: "",
        description: "",
        contact: "",
        applyToEmail: "",
        website: "",    
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
        e.preventDefault();
        //temporary
        if(window.confirm("Upload post?")) {
            uploadPost(createdPost);
        }
        console.log(createdPost);
        setDefaultState();
    };


    return (
    
        <Form className="form-container">
            <div className="form-content">
                <div className="left-input-content">
                    <Form.Group>
                        <h3 className="form-titel-text">Jobtitel</h3>
                        <Form.Control 
                            className="form-input" 
                            type="title" 
                            placeholder="Titel på stillingen"         
                            name="title" 
                            value={createdPost.title}
                            required
                            onChange={handleChangePost}>

                        </Form.Control>
                        
                        <h3 className="form-titel-text">Stillingstype</h3>
                        <Form.Select 
                            className="form-input" 
                            placeholder="vælg stillingens type"
                            name="type"
                            value={createdPost.type}
                            required
                            onChange={handleChangePost}>
                                <option value="">Vælg type</option>
                                <option value="elev">Elev</option>
                                <option value="praktik">Praktik</option>
                                <option value="fuldtid">Fuldtid</option>
                                <option value="deltid">Deltid</option>
                        </Form.Select>

                        <h3 className="form-titel-text">Firmanavn</h3>
                        <Form.Control 
                            className="form-input"
                            name="company" 
                            placeholder="Navn på firmaet"
                            value={createdPost.company}
                            required
                            onChange={handleChangePost}>
                        </Form.Control>
                        
                        <h3 className="form-titel-text">Placering</h3>
                        <Form.Control 
                            className="form-input"
                            name="location"   
                            placeholder="F.eks. København"
                            value={createdPost.location}
                            required
                            onChange={handleChangePost}>
                        </Form.Control>

                        <h3 className="form-titel-text">Startdato</h3>
                        <Form.Control 
                            className="form-input"
                            name="startdate"   
                            placeholder="F.eks. Februar 2023"
                            value={createdPost.startdate}
                            required
                            onChange={handleChangePost}>
                        </Form.Control>

                        <h3 className="form-titel-text">Beskrivelse</h3>
                        <Form.Control 
                            className="form-description"
                            name="description" 
                            as="textarea" 
                            rows={8} 
                            placeholder="Tilføj beskrivelse af stilling" 
                            value={createdPost.description}
                            required
                            onChange={handleChangePost}>
                        </Form.Control>

                    </Form.Group>
                                
                </div>
                <div className="right-input-content">
                    <Form.Group>
                        <h3 className="form-titel-text">Kontaktperson</h3>
                        <Form.Control 
                            className="form-input" 
                            type="text" 
                            placeholder="Navn på kontaktperson"
                            name="contact" 
                            value={createdPost.contact}
                            onChange={handleChangePost}>
                        </Form.Control>

                        <h3 className="form-titel-text">Ansøgning Email</h3>
                        <Form.Control 
                            className="form-input" 
                            type="email" 
                            placeholder="Indtast Email"
                            name="applyToEmail" 
                            value={createdPost.applyToEmail}
                            onChange={handleChangePost}>

                        </Form.Control>
                    
                        <h3 className="form-titel-text">Hjemmeside</h3>
                        <Form.Control 
                                className="form-input" 
                                type="text"
                                placeholder="Virksomhedens hjemmeside"
                                name="website"
                                value={createdPost.website}
                                onChange={handleChangePost}>

                        </Form.Control>
                        {/* <InputGroup>
                            <InputGroup.Text  className="form-input">+45</InputGroup.Text>
                            
                        </InputGroup> */}
                        
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