import React, { useEffect } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import Login from "./login";
import Register from "./register";
import { multiStateContext } from "../context/contextApi";
import { Link, useNavigate } from "react-router-dom";

const PageNavbar = () => {
  const {
    showSignIn,
    showRegister,
    handleCloseSignIn,
    handleShowSignIn,
    handleCloseRegister,
    handleShowRegister,
    getUserData,
    user,
    setUser,
    setSearch
  } = React.useContext(multiStateContext);

  useEffect(() => {
    getUserData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser("");
    navigate("/");
  };
  return (
    <>
      <div className="nav-fixed">
        <Navbar
          className="m-0 p-0"
          style={{
            border: "1px solid var(--primary-color)",
            backgroundColor: "var(--primary-color)"
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-grow-1">
            <Navbar.Brand as={Link} to="/" className="text-white">
              <div className="d-flex">
                <img
                  src="/SFFLogo.png"
                  width="60"
                  height="60"
                  className="d-inline-block align-top ml-5 mr-3"
                  alt="SFFLogo"
                />

                <h2 className="mt-2 text-light"> Student Fast Find</h2>
              </div>
            </Navbar.Brand>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                style={{ width: "500px", borderRadius: "10px 0px 0px 10px " }}
                onChange={(e) => setSearch(e.target.value)}
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
              <div className="d-flex mousehover">
                <p className="m-2 text-light">Hi {user.username}!</p>

                <Link to="/sell">
                  <p className="m-2 text-light">Sell</p>
                </Link>
                <p className="m-2 text-light">
                  <Link to="/account" className="text-light">
                    Account
                  </Link>
                </p>
                <p className="m-2 text-light" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            ) : (
              <div
                className="
            text-white d-flex justify-content-between mousehover"
              >
                <p
                  onClick={handleShowSignIn}
                  className=" mr-2 mb-0 text-light"
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </p>
                <p className=" mr-2 mb-0 text-light">or </p>
                <p
                  className=" mr-2 mb-0 text-light"
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
              color: "var(--primary-color)"
            }}
          >
            Sign In
          </Modal.Title>
        </Modal.Header>
        <Login />
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "var(--primary-color)"
            }}
          >
            Register
          </Modal.Title>
        </Modal.Header>
        <Register />
      </Modal>
    </>
  );
};

export default PageNavbar;
