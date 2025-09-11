import { Col, Container, Row } from "react-bootstrap";

function FooterMovieVerse() {
  return (
    <Container fluid className="bg-black text-white py-3 mt-5">
      <Row>
        <Col className="text-center">
          <p className="mb-0">© 2025 MovieVerse. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default FooterMovieVerse;
