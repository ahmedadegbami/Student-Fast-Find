import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { FaCloudUploadAlt } from "react-icons/fa";

import EditModel from "./editModel";
import PostModel from "./postModel";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUi = (res) => {
    setMyProducts([...myProducts, res]);
  };
  const deleteUI = async (singleId) => {
    //console.log(myProducts.filter((product) => product._id !== singleId));
    setMyProducts(myProducts.filter((product) => product._id !== singleId));
  };

  const myProduct = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:3001/users/me/products", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setMyProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    myProduct();
  }, []);

  return (
    <div>
      <Container style={{ marginTop: "80px", marginBottom: "80px" }}>
        <div className="d-flex">
          <h4
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "18rem",
              backgroundColor: "orange",
              color: "white"
            }}
          >
            My Products
          </h4>
          <h4
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "10rem",
              backgroundColor: "grey",
              color: "white"
            }}
            className="ml-auto"
            onClick={handleShow}
          >
            <FaCloudUploadAlt /> New
          </h4>
        </div>

        <Row className="justify-content-center">
          {myProducts
            .slice(0)
            .reverse()
            .map((product, index) => {
              return (
                <Col md={4} className="mb-5" key={index}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{product.title}</h5>
                        <EditModel singleId={product._id} deleteUI={deleteUI} />
                      </div>
                      <p className="card-text">${product.price}</p>
                      <div className="d-flex justify-content-between">
                        <p className="card-text">{product.location}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
        {show && (
          <PostModel
            show={show}
            handleClose={handleClose}
            updateUi={updateUi}
          />
        )}
      </Container>
    </div>
  );
};

export default MyProducts;
