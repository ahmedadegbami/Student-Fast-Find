import { Col, Row, Container } from "react-bootstrap";
import Main from "./main";
import Sidebar from "./sidebar";
import PageNavbar from "./navbar";
import React, { useEffect } from "react";
import { multiStateContext } from "../context/useStates";

const Home = () => {
  const {
    showSignIn,
    showRegister,
    handleCloseSignIn,
    handleShowSignIn,
    handleCloseRegister,
    handleShowRegister
  } = React.useContext(multiStateContext);

  return (
    <Container
      fluid
      style={{
        marginTop: "80px"
      }}
    >
      <Row>
        <Col className="p-0">
          <PageNavbar />
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Main />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
