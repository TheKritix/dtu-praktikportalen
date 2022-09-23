import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../create-post/inputForm.css"

const InputForm = () => {
    

    return (
        <div className="form-container">
            <Form>
                <Form.Group className="create-group1">
                    <Form.Label className="form-titel-text">Jobtitel</Form.Label>
                    <Form.Control className="form-input" type="title" placeholder="Titel på stillingen"></Form.Control>
                    
                    <Form.Label className="form-titel-text">Stillingstype</Form.Label>
                    <Form.Select className="form-input" placeholder="vælg stillingens type">
                        <option>Elev</option>
                        <option>Praktik</option>
                        <option>Fuldtid</option>
                        <option>Deltid</option>
                    </Form.Select>

                    <Form.Label className="form-titel-text">Firmanavn</Form.Label>
                    <Form.Control className="form-input" type="title" placeholder="Navn på firmaet"></Form.Control>
                    
                    <Form.Label className="form-titel-text">Placering</Form.Label>
                    <Form.Control className="form-input" type="title" placeholder="f.eks. København"></Form.Control>

                    <Form.Label className="form-titel-text">Kontaktperson</Form.Label>
                    <Form.Control className="form-input" type="title" placeholder="Navn på kontaktperson"></Form.Control>

                    <Form.Label className="form-titel-text">Email</Form.Label>
                    <Form.Control className="form-input" type="email" placeholder="Indtast Email"></Form.Control>

                    <Form.Label className="form-titel-text">Telefon</Form.Label>
                    <Form.Control className="form-input" type="number" placeholder="+45"></Form.Control>

                </Form.Group>
                <Button className="preview-button" size="lg">Preview opslag</Button>
                <Button className="form-submit-button" type="submit" size="lg">Opret stilling</Button>
            
            </Form>
        </div>
    );
}

export default InputForm; 