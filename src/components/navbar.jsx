import React, { useEffect } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import Login from "./login";
import Register from "./register";
import { multiStateContext } from "../context/useStates";
import axios from "axios";

const PageNavbar = () => {
  const {
    showSignIn,
    showRegister,
    handleCloseSignIn,
    handleShowSignIn,
    handleCloseRegister,
    handleShowRegister,
    getUserData,
    user
  } = React.useContext(multiStateContext);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="nav-fixed">
        <Navbar
          className="m-0 p-0"
          style={{
            border: "1px solid orange",
            backgroundColor: "orange"
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-grow-1">
            <Navbar.Brand href="#home">
              <div className="d-flex">
                <img
                  src="SFFLogo.png"
                  width="60"
                  height="60"
                  className="d-inline-block align-top ml-5 mr-3"
                  alt="React Bootstrap logo"
                />
                <h2 className="mt-2 text-light"> Student Fast Find</h2>
              </div>
            </Navbar.Brand>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                style={{ width: "500px", borderRadius: "10px 0px 0px 10px " }}
              />
              <Button
                variant="outline-light"
                className="float-right"
                style={{
                  borderRadius: "0px 10px 10px 0px "
                }}
              >
                <BiSearch />
              </Button>
            </Form>

            {user ? (
              <div className="d-flex">
                <p className="m-2 text-light">Sell</p>
                <p className="m-2 text-light">Account</p>
                <p className="m-2 text-light">Hi {user.username}!</p>
              </div>
            ) : (
              <div
                className="
            text-white d-flex justify-content-between"
              >
                <p
                  onClick={handleShowSignIn}
                  className=" mr-2 mb-0"
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </p>
                <p className=" mr-2 mb-0">or </p>
                <p
                  className=" mr-2 mb-0"
                  onClick={handleShowRegister}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </p>
              </div>
            )}
          </div>
        </Navbar>
      </div>

      <Modal
        show={showSignIn}
        onHide={handleCloseSignIn}
        style={{
          marginTop: "100px"
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "orange"
            }}
          >
            Sign In
          </Modal.Title>
        </Modal.Header>
        <Login />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignIn}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "orange"
            }}
          >
            Register
          </Modal.Title>
        </Modal.Header>
        <Register />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PageNavbar;
