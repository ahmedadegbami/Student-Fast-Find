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
          <Image
            className="img-fluid"
            variant="top"
            src={productDetails.image}
            style={{
              padding: "10px",
              border: "2px solid orange",
              height: "60%",
              width: "100%"
            }}
          />
          <Card
            className="mt-3"
            style={{
              padding: "10px",
              border: "2px solid orange"
            }}
          >
            <Card.Body>
              <Card.Title>{productDetails.title}</Card.Title>
              <Card.Text>
                {" "}
                Price: ${productDetails.price} negotiable
                <span>only pickup available</span>
              </Card.Text>
              <Card.Text>{productDetails.location}</Card.Text>
              <Card.Text>
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
                Condition: {productDetails.condition}
                {productDetails.condition === "New" ? (
                  <AiFillStar color="red" />
                ) : (
                  <AiFillStar color="grey" />
                )}
              </Card.Text>
              <Card.Text>Description: {productDetails.description}</Card.Text>
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
                <span>Seller:</span> {productDetails?.poster?.username}
              </Card.Text>
              <Card.Text>
                <span>Location:</span> {productDetails?.location}
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
