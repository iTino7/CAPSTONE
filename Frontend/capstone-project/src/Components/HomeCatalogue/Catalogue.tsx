import { Col, Container, Row } from "react-bootstrap";
import CarouselInfinite from "./CarouselInfinite";

function Catalogue() {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#121212" }}>
        <Row>
          <Col>
            <CarouselInfinite filterFetch="movie" />
            <CarouselInfinite filterFetch="tv" />
            <CarouselInfinite
              filterFetch="movie"
              popular="sort_by=popularity.desc&"
            />
            <CarouselInfinite
              filterFetch="tv"
              popular="sort_by=popularity.desc&"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Catalogue;
