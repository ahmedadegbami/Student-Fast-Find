import React from "react";
import { multiStateContext } from "../context/contextApi";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Form,
  Button,
  Image
} from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { parseISO, format } from "date-fns";

const Account = () => {
  const { user, setUser } = React.useContext(multiStateContext);
  const [show, setShow] = useState(false);
  const [fileError, setFileError] = useState(false);

  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("email", user.email);
  formData.append("avatar", user.avatar);

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      // const url = URL.createObjectURL(e.target.files[0]);
      // console.log("url", url);
      setUser({ ...user, avatar: e.target.files[0] });
      setFileError(false);
    } else {
      setFileError(true);
      return;
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update user inform and image immediately without refreshing the page
  const updateUser = (res) => {
    setUser({ ...user, res });
  };

  const editProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios
      .put(`http://localhost:3001/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        updateUser(res.data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSetMyUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
                <h5>My Profile</h5>
                <AiFillEdit size={25} onClick={handleShow} />
              </Card.Header>
              <Card.Body className="d-flex">
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={150}
                  height={150}
                  roundedCircle
                />
                <div className="mt-1 mx-4">
                  <Card.Text>
                    <strong>Username:</strong> {user.username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email: </strong> {user.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location: </strong>
                    {user.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Member since: </strong>{" "}
                    {user.createdAt && format(parseISO(user.createdAt), "PPP")}
                  </Card.Text>
                </div>
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
                value={user.username}
                name="username"
                onChange={onSetMyUser}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                name="email"
                onChange={onSetMyUser}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={onFileChange} />
            </Form.Group>
            {fileError && (
              <p className="text-danger">File size must be less than 1MB</p>
            )}
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Account;
