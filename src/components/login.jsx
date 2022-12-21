import { Form, Button, Card, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { multiStateContext } from "../context/contextApi";
import React from "react";
import ErrorText from "./errorText";

const Login = () => {
  const {
    handleCloseSignIn,

    handleShowRegister
  } = React.useContext(multiStateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/login", {
        email,
        password
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        setIsLoading(false);
        window.location.reload();
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div>
          <div className="mx-auto">
            <Card className="p-5 shadow-lg">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                </Form.Group>

                <Button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    borderColor: "var(--primary-color)"
                  }}
                  type="submit"
                  className="btn btn-block "
                >
                  Login
                </Button>

                <small className="mousehover">
                  <p
                    className="m-1 text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShowRegister();
                      handleCloseSignIn();
                    }}
                  >
                    Don't have an account? <br></br>
                  </p>
                  <p className="m-1 text-center">Forget password?</p>
                </small>
                <ErrorText error={error} />
              </Form>
              {isLoading && (
                <Spinner
                  animation="border"
                  variant="warning"
                  className="align-self-center"
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
