import axios from "axios";
import { set } from "date-fns";
import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const EditModel = ({ singleId, deleteUI }) => {
  const [show, setShow] = useState(false);
  const [fileError, setFileError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [myProduct, setMyProduct] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    condition: "",
    image: null
  });

  let formData = new FormData();
  formData.append("title", myProduct.title);
  formData.append("price", myProduct.price);
  formData.append("location", myProduct.location);
  formData.append("description", myProduct.description);
  formData.append("condition", myProduct.condition);
  formData.append("image", myProduct.image);

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setFileError(false);
      setMyProduct({ ...myProduct, image: e.target.files[0] });
    } else {
      setFileError(true);
      return;
    }
  };

  let formIsValid = true;
  if (
    myProduct.title &&
    myProduct.price &&
    myProduct.location &&
    myProduct.description &&
    myProduct.image !== null
  ) {
    formIsValid = true;
  }

  // const onSetMyProduct = (e) => {
  //   setMyProduct({ ...myProduct, [e.target.name]: e.target.value });
  // };

  const getProductsDetails = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(`http://localhost:3001/products/${singleId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setMyProduct({
          title: res.data.title,
          price: res.data.price,
          condition: res.data.condition,
          location: res.data.location,
          image: res.data.image,
          description: res.data.description
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductsDetails();
  }, [singleId]);

  const editProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios
      .put(`http://localhost:3001/products/${singleId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        window.location.reload();
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = async () => {
    const token = localStorage.getItem("token");
    await axios
      .delete(`http://localhost:3001/products/${singleId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        deleteUI(singleId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AiFillEdit size={25} onClick={handleShow} />
      <AiFillDelete
        size={25}
        onClick={deleteProduct}
        style={{
          color: "red"
        }}
      />
      {show && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={editProduct}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={myProduct.title}
                    onChange={(e) => {
                      setMyProduct({ ...myProduct, title: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={myProduct.description}
                    onChange={(event) =>
                      setMyProduct({
                        ...myProduct,
                        description: event.target.value
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    value={myProduct.price}
                    onChange={(event) =>
                      setMyProduct({
                        ...myProduct,
                        price: event.target.value
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="New or Used"
                    value={myProduct.condition}
                    onChange={(event) =>
                      setMyProduct({
                        ...myProduct,
                        condition: event.target.value
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={myProduct.location}
                    onChange={(event) =>
                      setMyProduct({
                        ...myProduct,
                        location: event.target.value
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(event) =>
                      setMyProduct({
                        ...myProduct,
                        image: event.target.files[0]
                      })
                    }
                  />
                </Form.Group>
                {fileError && (
                  <p style={{ color: "red" }}>
                    File size should be less than 1MB
                  </p>
                )}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>{" "}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>{" "}
          </Modal>
        </>
      )}
    </>
  );
};

export default EditModel;