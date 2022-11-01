import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Typist from "react-typist-component";
import { useEffect } from "react";
import authService from "../../services/auth-service";

const Login = (props) => {
  const [validated, setValidated] = useState(false);
  const { show, handleClose } = props;
  const [loginMode, setLoginMode] = useState("signIn");
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeLoginMode = () => {
    setLoginMode(loginMode === "signIn" ? "signUp" : "signIn");
    setCount(1);
  };

  useEffect(() => {
    setLoginMode("signIn");
    setCount(0);
  }, [show]);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setLoading(false);
    } else {
      authService
        .employerSignup(username, email, password, companyName, name)
        .then(
          () => {
            authService.employerLogin(username, password).then(
              () => {
                navigate("/profile");
                window.location.reload();
              },
              (error) => {
                console.log(error.response);
              }
            );
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
            setLoading(false);
          }
        );
    }
    setValidated(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setLoading(false);
    } else {
      authService.employerLogin(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    }

    setValidated(true);
  };

  if (loginMode === "signIn" && count === 0) {
    return (
      <div className="employee-login-container">
        <Modal className="employee-login" show={show} onHide={handleClose}>
          <div className="employee-login-content">
            <Modal.Header closeButton>
              <Modal.Title className="employee-login-title">
                <Typist
                  typingDelay={100}
                  restartKey={0}
                  cursor={<span className="cursor">|</span>}
                >
                  Employer Sign In
                </Typist>
              </Modal.Title>
            </Modal.Header>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeLoginMode}>
                Sign Up
              </span>
            </div>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formUsername"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="Enter username"
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Username!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Password!
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Sign In</span>
                  </Button>
                </div>
                {message && (
                  <Form.Group className="form-group mt-3">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </Form.Group>
                )}
              </Form>
              <p className="forgot-password text-right mt-2">
                Forgot <a href="/">password?</a>
              </p>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }

  if (loginMode === "signIn" && count === 1) {
    return (
      <div className="employee-login-container">
        <Modal className="employee-login" show={show} onHide={handleClose}>
          <div className="employee-login-content">
            <Modal.Header closeButton>
              <Modal.Title className="employee-login-title">
                <Typist
                  typingDelay={100}
                  restartKey={1}
                  cursor={<span className="cursor">|</span>}
                >
                  <Typist.Paste>Employer Sign Up</Typist.Paste>
                  <Typist.Backspace count={2} />
                  <Typist.Delay ms={500} />
                  In
                </Typist>
              </Modal.Title>
            </Modal.Header>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeLoginMode}>
                Sign Up
              </span>
            </div>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formUsername"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="Enter username"
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Username!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Password!
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Sign In</span>
                  </Button>
                </div>
                {message && (
                  <Form.Group className="form-group mt-3">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </Form.Group>
                )}
              </Form>
              <p className="forgot-password text-right mt-2">
                Forgot <a href="/">password?</a>
              </p>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
  if (loginMode === "signUp") {
    return (
      <div className="employee-login-container">
        <Modal className="employee-login" show={show} onHide={handleClose}>
          <div className="employee-login-content">
            <Modal.Header closeButton>
              <Modal.Title className="employee-login-title">
                <Typist
                  typingDelay={100}
                  restartKey={2}
                  cursor={<span className="cursor">|</span>}
                >
                  <Typist.Paste>Employer Sign In</Typist.Paste>
                  <Typist.Backspace count={2} />
                  <Typist.Delay ms={500} />
                  Up
                </Typist>
              </Modal.Title>
            </Modal.Header>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeLoginMode}>
                Sign In
              </span>
            </div>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleSignup}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formUsername"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="Enter username"
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Username!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3" controlId="formName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={onChangeCompanyName}
                    placeholder="Enter company name"
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Company Name!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3" controlId="formName">
                  <Form.Label>Employer Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    placeholder="Enter employer name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Employer Name!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Email!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Specify Password!
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Sign Up</span>
                  </Button>
                </div>
                {message && (
                  <Form.Group className="form-group mt-3">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </Form.Group>
                )}
              </Form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
};

export default Login;
