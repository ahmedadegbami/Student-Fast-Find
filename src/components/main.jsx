import React from "react";
import { Row } from "react-bootstrap";
import { multiStateContext } from "../context/contextApi";
import { mapProduct } from "./mapProduct";

const Main = () => {
  const { products, selectedCategory, searchResult, search } =
    React.useContext(multiStateContext);
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
        {selectedCategory}
      </h4>
      <Row className="w-100 ">
        {mapProduct(search ? searchResult : products)}
      </Row>
    </div>
  );
};

export default Main;
