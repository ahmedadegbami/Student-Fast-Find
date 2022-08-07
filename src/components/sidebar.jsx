import React from "react";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import "../App.css";

const Sidebar = () => {
  return (
    <div className=" fixed ">
      <h4> ALL CATEGORIES</h4>
      <ListGroup as="ul" style={{ width: "200px", borderRadius: "0px" }}>
        <ListGroup.Item as="li">Bicylces</ListGroup.Item>
        <ListGroup.Item as="li">Books</ListGroup.Item>
        <ListGroup.Item as="li">Computers</ListGroup.Item>
        <ListGroup.Item as="li">Electronics</ListGroup.Item>
        <ListGroup.Item as="li">Fashion</ListGroup.Item>
        <ListGroup.Item as="li">Games</ListGroup.Item>
        <ListGroup.Item as="li">Health & Beauty</ListGroup.Item>
        <ListGroup.Item as="li">Home & Kitchen</ListGroup.Item>
        <ListGroup.Item as="li">Jewelry & Accessories</ListGroup.Item>
        <ListGroup.Item as="li">Luggage & Bags</ListGroup.Item>
        <ListGroup.Item as="li" active>
          Pet Supplies
        </ListGroup.Item>
        <ListGroup.Item as="li">Sports & Outdoors </ListGroup.Item>
        <ListGroup.Item as="li">Tickets</ListGroup.Item>
        <ListGroup.Item as="li">Watches</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
