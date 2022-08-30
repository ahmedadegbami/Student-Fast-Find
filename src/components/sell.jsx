import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import MyProducts from "./myProducts";

const Sell = () => {
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
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Row className="justify-content-center">
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
      </Row>

      <MyProducts />
    </Container>
  );
};

export default Sell;
