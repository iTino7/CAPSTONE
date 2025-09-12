import { Col, Container, Row } from "react-bootstrap";
import CarouselInfinite from "./CarouselInfinite";

function Catalogue() {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#121212" }}>
        <Row>
          <Col>
            <CarouselInfinite filterFetch="movie" />
            <CarouselInfinite filterFetch="serie" />
            <CarouselInfinite filterFetch="moviePopular" />
            <CarouselInfinite filterFetch="seriePopular" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Catalogue;
