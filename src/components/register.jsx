import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { multiStateContext } from "../context/contextApi";
import React, { useEffect } from "react";
import ErrorText from "./errorText";
import is from "date-fns/esm/locale/is/index.js";

const Register = () => {
  const { handleShowSignIn, handleCloseRegister } =
    React.useContext(multiStateContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    error: ""
  });

  const [fileError, setFileError] = useState(false);

  let formData = new FormData();
  formData.append("username", user.username);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("avatar", user.avatar);

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setFileError(false);
      setUser({ ...user, avatar: e.target.files[0] });
    } else {
      setFileError(true);
      return;
    }
  };

  const isFormValid = () => {
    if (user.username && user.email && user.password && user.avatar !== null) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/users/register", formData)
      .then((res) => {
        handleCloseRegister();
        handleShowSignIn();
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("see", err.response.data.message);
          setUser({ ...user, error: err.response.data.message });
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
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Profile Picture"
                  onChange={onFileChange}
                />
              </Form.Group>
              {fileError && (
                <p className="text-danger">File size should be less than 1MB</p>
              )}
              <div className="d-grid gap-2">
                <Button
                  style={{ backgroundColor: "orange", borderColor: "orange" }}
                  type="submit"
                  size="lg"
                  className="btn btn-block "
                  disabled={!isFormValid()}
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
            <ErrorText error={user.error} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
