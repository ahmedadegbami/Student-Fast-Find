import React, { useEffect } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { parseISO, format } from "date-fns";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { messageModal } from "./messageModal";
import { multiStateContext } from "../context/contextApi";

const Details = () => {
  const { user, handleShowSignIn } = React.useContext(multiStateContext);
  const [productDetails, setProductDetails] = React.useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const params = useParams().id;

  const getProductsDetails = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(`http://localhost:3001/products/${params}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductsDetails();
  }, []);

  console.log(productDetails.createdAt);

  return (
    <Container style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Row>
        <Col md={8}>
          <Card
            className="mt-3"
            style={{
              padding: "10px",
              border: "2px solid orange"
            }}
          >
            <Card.Body>
              <Image
                className="img-fluid mx-auto d-block"
                variant="top"
                src={productDetails.image}
                style={{
                  padding: "10px",
                  border: "1px solid orange",

                  height: "50%",
                  width: "60%"
                }}
              />
              <br />

              <Card.Title>{productDetails.title}</Card.Title>
              <Card.Text>
                {" "}
                <strong>Price:</strong> ${productDetails.price}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {productDetails.location}
              </Card.Text>
              <Card.Text>
                <strong>Posted</strong> on:{" "}
                {productDetails.createdAt
                  ? format(
                      parseISO(productDetails.createdAt),
                      "MMMM do yyyy  || HH:mm "
                    )
                  : "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mt-3"
            style={{
              padding: "10px",
              border: "2px solid orange"
            }}
          >
            <Card.Body>
              <Card.Text>
                <strong>Condition:</strong> {productDetails.condition}
                {productDetails.condition === "New" ? (
                  <AiFillStar color="red" />
                ) : (
                  <AiFillStar color="grey" />
                )}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {productDetails.description}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mt-3"
            style={{
              padding: "10px",
              border: "2px solid orange"
            }}
          >
            <Card.Body>
              <Card.Text>Write a message</Card.Text>
              <Button
                style={{
                  backgroundColor: "orange",
                  border: "none"
                }}
                onClick={handleShow}
              >
                Contact Seller
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Button
            style={{
              width: "100%",
              backgroundColor: "orange",
              border: "none"
            }}
            className="my-3"
            onClick={handleShow}
          >
            Write a message
          </Button>
          <Button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              color: "black",
              border: "1px solid black"
            }}
            className="mb-3"
          >
            Add to watchlist
          </Button>
          <Button
            variant="primary"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              color: "black",
              border: "1px solid black"
            }}
          >
            share ad
          </Button>
          <Card
            className="mt-3"
            style={{
              padding: "10px",
              border: "2px solid orange"
            }}
          >
            <Card.Body>
              <Card.Title>Contact Seller</Card.Title>
              <Card.Text>
                <strong>Seller:</strong> {productDetails?.poster?.username}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {productDetails?.location}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {messageModal(
        productDetails.title,
        show,
        handleClose,
        user,
        productDetails?.poster?.username,
        handleShowSignIn
      )}
    </Container>
  );
};

export default Details;
