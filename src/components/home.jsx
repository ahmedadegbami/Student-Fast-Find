import { Col, Row } from "react-bootstrap";
import Main from "./main";
import Sidebar from "./sidebar";

const home = () => {
  return (
    <div>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Main />
        </Col>
      </Row>
    </div>
  );
};

export default home;
