import React from "react";
import { multiStateContext } from "../context/contextApi";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Form,
  Button
} from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

const Account = () => {
  const { user, setUser } = React.useContext(multiStateContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios
      .put(
        `http://localhost:3001/users/me`,
        {
          username: user.username,
          email: user.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        setUser(res.data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col className="d-flex justify-content-center">
            <Card
              className="shadow-lg"
              style={{
                width: "60%",
                height: "100%"
              }}
            >
              <Card.Header className="d-flex justify-content-between">
                <h5>Account Information</h5>
                <AiFillEdit size={25} onClick={handleShow} />
              </Card.Header>
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editProfile}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                value={user.username}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Account;
