import { Card, Col } from "react-bootstrap";
import { parseISO, format } from "date-fns";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export const mapProduct = (products) => {
  return products.map((product) => (
    <Col key={product._id} md={3} className="mb-5">
      <Card style={{ backgroundColor: "var(--primary-color)" }}>
        <Link to={"/products/" + product._id}>
          <Card.Img
            variant="top"
            src={product.image}
            width={150}
            height={200}
          />
        </Link>
        <Card.Title
          className="d-flex justify-content-between
              mx-2 mt-2 mb-n1"
        >
          <h5
            style={{
              color: "var(--secondary-color)",
              fontSize: "1.2rem",
              fontWeight: "bold"
            }}
          >
            {product.title}
          </h5>
          <h5
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold"
            }}
          >
            {" "}
            ${product.price}
          </h5>
        </Card.Title>
        <hr />
        <Card.Title
          className="mx-2 "
          style={{
            fontSize: "14px"
          }}
        >
          <h6>
            Condition : {product.condition}
            {product.condition === "New" ? (
              <AiFillStar color="red" />
            ) : (
              <AiFillStar color="grey" />
            )}
          </h6>
          <p>Seller: {product.poster?.username} </p>
          Posted:{" "}
          {format(parseISO(product.createdAt), "MM/d/yyyy - HH:mm aaaa ")}
        </Card.Title>
      </Card>
    </Col>
  ));
};
