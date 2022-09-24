import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../create-post/inputForm.css"

const InputForm = () => {
    

    return (
        <div className="form-container">
            <div className="left-input-content">
                <Form>
                    <Form.Group className="create-group1">
                        
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
                        <Form.Control className="form-input" type="title" placeholder="Navn på firmaet"></Form.Control>
                        
                        <h3 className="form-titel-text">Placering</h3>
                        <Form.Control className="form-input" type="title" placeholder="f.eks. København"></Form.Control>

                        <h3 className="form-titel-text">Kontaktperson</h3>
                        <Form.Control className="form-input" type="title" placeholder="Navn på kontaktperson"></Form.Control>

                        <h3 className="form-titel-text">Email</h3>
                        <Form.Control className="form-input" type="email" placeholder="Indtast Email"></Form.Control>

                        <h3 className="form-titel-text">Telefon</h3>
                        <Form.Control className="form-input" type="number" placeholder="+45"></Form.Control>

                    </Form.Group>
                    <Button className="preview-button" size="lg">Preview opslag</Button>
                    <Button className="form-submit-button" type="submit" size="lg">Opret stilling</Button>
                
                </Form>
            </div>
            <div className="right-input-content">
                
                        prut
            </div>
        </div>
    );
}

export default InputForm; 