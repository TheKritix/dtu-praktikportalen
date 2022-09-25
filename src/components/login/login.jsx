import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./login.css";

const Login = (props) => {
  const { show, handleClose } = props;
  const [loginMode, setLoginMode] = useState('signIn');

  const changeLoginMode = () => {
    setLoginMode(loginMode === "signIn" ? "signUp" : "signIn");
  };

  if (loginMode === "signIn") {
    return (
      <div className="employee-login-container">
        <Modal className="employee-login" show={show} onHide={handleClose}>
          <div className="employee-login-content">
            <Modal.Header closeButton>
              <Modal.Title className="employee-login-title">
                Employer Login
              </Modal.Title>
            </Modal.Header>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeLoginMode}>
                Sign Up
              </span>
            </div>
            <Modal.Body>
              <Form>
                <Form.Group className="form-group mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form>
              <div className="sign-in">
              <Link to="/profile" className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary">
                Sign In
              </Button>
                </Link>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <a href="/">password?</a>
              </p>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="employee-login-container">
      <Modal className="employee-login" show={show} onHide={handleClose}>
        <div className="employee-login-content">
          <Modal.Header closeButton>
            <Modal.Title className="employee-login-title">
              Employer Sign Up
            </Modal.Title>
            
          </Modal.Header>
          <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeLoginMode}>
                Sign In
              </span>
            </div>
          <Modal.Body>
            <Form>
              <Form.Group className="form-group mb-3" controlId="formName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="form-group mb-3" controlId="formName">
                <Form.Label>Employer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employer name"
                  autoFocus
                />
                </Form.Group>
                <Form.Group className="form-group mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    autoFocus
                  />
                </Form.Group>
              <Form.Group className="form-group mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
            <div className="sign-up">
                <Link to="/profile" className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary">
                Register
              </Button>
                </Link>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
