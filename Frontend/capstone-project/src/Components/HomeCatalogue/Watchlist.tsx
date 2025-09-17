import { Col, Container, Row } from "react-bootstrap";

function Watchlist() {
  return (
    <Container fluid className="min-vh-100">
      <Row>
        <Col xs={12} sm={6} md={4} lg={3} className="mt-4">
          <h1 className="text-white fw-light">My Watchlist</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Watchlist;
