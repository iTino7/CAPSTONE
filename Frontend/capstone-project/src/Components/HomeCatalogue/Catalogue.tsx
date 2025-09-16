import { Col, Container, Row } from "react-bootstrap";
import CarouselInfinite from "./CarouselInfinite";

function Catalogue() {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#121212" }}>
        <Row>
          <Col>
            <CarouselInfinite filterFetch="movie" filterCategory="movie" />
            <CarouselInfinite filterFetch="serie" filterCategory="series" />
            <CarouselInfinite filterFetch="moviePopular" filterCategory="movie" />
            <CarouselInfinite filterFetch="seriePopular" filterCategory="series" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Catalogue;
