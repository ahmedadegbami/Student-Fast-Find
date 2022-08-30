import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { multiStateContext } from "../context/contextApi";
import React, { useEffect } from "react";
import ErrorText from "./errorText";

const Register = () => {
  const { handleShowSignIn, handleCloseRegister } =
    React.useContext(multiStateContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/users/register", {
        username,
        email,
        password,
        avatar
      })
      .then((res) => {
        handleCloseRegister();
        handleShowSignIn();
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("see", err.response.data.message);
          setError("User already exists");
        }
      });
  };

  return (
    <div className="container-fluid p-0">
      <div>
        <div className=" mx-auto">
          <Card className="p-5 shadow-lg">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="user avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  style={{ backgroundColor: "orange", borderColor: "orange" }}
                  type="submit"
                  size="lg"
                  className="btn btn-block "
                >
                  Sign Up
                </Button>
              </div>
            </Form>
            <small className="mousehover">
              <p
                className="m-2 text-center "
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseRegister();
                  handleShowSignIn();
                }}
              >
                Already have an account?
              </p>
            </small>
            <ErrorText error={error} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
