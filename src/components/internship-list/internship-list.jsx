import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import {Form} from "react-bootstrap";
import {internshipListStore} from "./internship-list-store";
import FilterOptions from "./FilterOptions";


const locations = [
    {location: "Danmark"},
    {location: "Sverige"},
    {location: "Norge"},
    {location: "Remote"}
]

const socialBenefits = [
    {social: "Fredagsbar"},
    {social: "Frokostordning"}
]

/*const listInternships = internshipListStore.internships.map((d) =>
        <Card key={d.id} className="mb-3" onClick={() => this._placeholderFunction()} style={{ cursor: "pointer" }}>
        <Card.Title>{d.hasApplied ? "ANSØGT • ": null}{d.title}</Card.Title>
        <Card.Text>{d.description}</Card.Text>
        <p>Startdato: {d.startDate} • Lokation: {d.location} • Afløning: {d.compensation}</p>
        </Card>
)*/




const listInternships = internshipListStore.internships.map((d) =>
    <Card key={d.id} className="mb-3" onClick={() => this._placeholderFunction()} style={{ cursor: "pointer" }}>
        <Card.Title>{d.hasApplied ? "ANSØGT • ": null}{d.title}</Card.Title>
        <Card.Text>{d.description}</Card.Text>
        <p>Startdato: {d.startDate} • Lokation: {d.location} • Afløning: {d.compensation}</p>
    </Card>
)

export const InternshipList = () => {

    const [location, setLocation] = useState([])
    const [socialBenefit, setSocialBenefits] = useState([])

    const [filteredInternships, setFilteredInternships] = useState([])

    const liste = filteredInternships.map((d, index) => (
        <Card key={d.id} className="mb-3" onClick={() => this._placeholderFunction()} style={{ cursor: "pointer" }}>
            <Card.Title>{d.hasApplied ? "ANSØGT • ": null}{d.title}</Card.Title>
            <Card.Text>{d.description}</Card.Text>
            <p>Startdato: {d.startDate} • Lokation: {d.location} • Afløning: {d.compensation}</p>
        </Card>
    ))

    const handleLocationChange = e => {
        if (e.target.checked) {
            setLocation([...location, e.target.value])
        } else {
            setLocation(location.filter(id => id !== e.target.value))
        }
    }

    useEffect(() => {
        if (location.length === 0) {
            setFilteredInternships(internshipListStore.internships)
        } else {
            setFilteredInternships(
                internshipListStore.internships.filter(internship =>
                    location.some(location => [internship.location].flat().includes(location))
                )
            )
        }
    }, [location])






    return(
        <div>
            <Container className="cont">
                <Col className="overskrift d-flex justify-content-center">
                    <Col className="col-3"/>
                    <h3>Aktive praktikopslag</h3>
                </Col>
                <Col className="indhold">
                    <Row className="indhold-row">
                        <Col className="filterstuff col-3">
                            <h4 className="">Filtrér søgning:</h4>

                            <Form>
                                <h6>Lokation</h6>
                                {locations.map(location => (
                                    <React.Fragment key={location.location}>
                                        <Form.Check
                                            onChange={handleLocationChange}
                                            type="checkbox"
                                            label={location.location}
                                            value={location.location}
                                        />
                                    </React.Fragment>
                                ))}
                            </Form>

                            <Form>
                                <h6>Social</h6>
                                {socialBenefits.map(benefit => (
                                    <React.Fragment key={benefit.social}>
                                        <Form.Check
                                            onChange={handleLocationChange}
                                            type="checkbox"
                                            label={benefit.social}
                                            value={benefit.social}
                                        />
                                    </React.Fragment>
                                ))}
                            </Form>

                            <br/>
                            <FilterOptions/>

                        </Col>
                        <Col className="col-1"/>
                        <Col className="opslag col-7">
                            <Row className="">
                                {liste.length ? liste :
                                    <p className="d-flex justify-content-center">Ingen praktikopslag matcher dine søgekriterier</p>
                                }
                            </Row>
                        </Col>
                        <Col className="col-1"/>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}

export default InternshipList;