import { Col, Row, Container } from "react-bootstrap";
import Main from "./main";
import Sidebar from "./sidebar";

const Home = () => {
  return (
    <Container
      fluid
      style={{
        marginTop: "80px"
      }}
    >
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Main />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
