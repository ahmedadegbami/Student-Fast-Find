import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BiNoEntry } from "react-icons/bi";

const Main = () => {
  return (
    <div className="">
      <h4
        style={{
          borderRadius: "10px",
          padding: "10px",
          width: "18rem",
          backgroundColor: "orange",
          color: "white"
        }}
      >
        Pet Supplies
      </h4>
      <Row className="w-100 ">
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Img
              className="w-100 img-fluid"
              variant="top"
              src="https://placekitten.com/640/360"
            />
            <Card.Title>Card Title</Card.Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
