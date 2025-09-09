import { Col, Container, Row } from "react-bootstrap";

function Plans() {
  return (
    <Container
      fluid
      className="bg-dark w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col xs={12} sm={4}>
          <h1 className="text-white text-center">Standard con pubblicità</h1>
        </Col>
        <Col xs={12} sm={4}>
          <h1 className="text-white text-center">Standard</h1>
        </Col>
        <Col xs={12} sm={4}>
          <h1 className="text-white text-center">Premium</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Plans;
