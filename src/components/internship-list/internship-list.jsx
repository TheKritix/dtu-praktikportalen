import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import {Form} from "react-bootstrap";
import {internshipListStore} from "./internship-list-store";


const listInternships = internshipListStore.internships.map((d) =>
        <Card key={d.id} className="mb-3" onClick={() => this._placeholderFunction()} style={{ cursor: "pointer" }}>
        <Card.Title>{d.hasApplied ? "ANSØGT • ": null}{d.title}</Card.Title>
        <Card.Text>{d.description}</Card.Text>
        <p>Startdato: {d.startDate} • Lokation: {d.location} • Afløning: {d.compensation}</p>
        </Card>
)

export const InternshipList = () => {
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
                                <h6>Social</h6>
                                <Form.Check
                                    type="checkbox"
                                    name="fredagsbar"
                                    id="filter_fredagsbar"
                                    label={"Fredagsbar"}
                                />
                                <Form.Check
                                    type="checkbox"
                                    name="frokostordning"
                                    id="filter_frokostordning"
                                    label={"Frokostordning"}
                                />
                                <Form.Check
                                    type="checkbox"
                                    name="rundstykker"
                                    id="filter_rundstykker"
                                    label={"Grøndlandske rundstykker"}
                                />
                                <br/>
                                <h6>Lokation</h6>
                                <Form.Check
                                    type="checkbox"
                                    name="danmark"
                                    id="filter_danmark"
                                    label={"Danmark"}
                                />
                                <Form.Check
                                    type="checkbox"
                                    name="sverige"
                                    id="filter_sverige"
                                    label={"Sverige"}
                                />
                                <Form.Check
                                    type="checkbox"
                                    name="norge"
                                    id="filter_norge"
                                    label={"Norge"}
                                />
                                <Form.Check
                                    type="checkbox"
                                    name="remote"
                                    id="filter_remote"
                                    label={"Remote"}
                                />
                                <br/>
                                <h6>Lønniveau</h6>
                                <Form.Check
                                    type="radio"
                                    name="løn"
                                    id="filter_ingen_løn"
                                    label={"Frivillig"}
                                />
                                <Form.Check
                                    type="radio"
                                    name="løn"
                                    id="filter_lille_løn"
                                    label={"10 kr. pr. år"}
                                />
                                <Form.Check
                                    type="radio"
                                    name="løn"
                                    id="filter_ceo_løn"
                                    label={"CEO-løn"}
                                />
                            </Form>
                            <br/>

                        </Col>
                        <Col className="col-1"/>
                        <Col className="opslag col-7">
                            <Row className="">
                                {listInternships.length ? listInternships :
                                    <p className="d-flex justify-content-center">There are no internships</p>
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