import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const PostModel = ({ handleClose, show, updateUi }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
    poster: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios

      .get("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setProduct({ ...product, poster: res.data._id });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(product);
    await axios
      .post("http://localhost:3001/products", product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        updateUi(res.data.product);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "28rem" }} onSubmit={postProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={product.title}
                onChange={(event) =>
                  setProduct({ ...product, title: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={product.description}
                onChange={(event) =>
                  setProduct({
                    ...product,
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
                value={product.price}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    price: event.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={product.location}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    location: event.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                value={product.image}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    image: event.target.value
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostModel;
