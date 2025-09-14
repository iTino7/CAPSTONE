import { Col, Container, Row } from "react-bootstrap";

interface MovieandSerieProps {
  img: string;
}

function MovieandSerieBackground({ img }: MovieandSerieProps) {
  return (
    <Container
      fluid
      className="no-padding-container"
      style={{
        background: `
      linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(0deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%),
      url(https://image.tmdb.org/t/p/original${img})
    `,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",

        top: 0,
        left: 0,
      }}
    >
      <Row className="p-0 m-0">
        <Col className="p-0 m-0"></Col>
      </Row>
    </Container>
  );
}

export default MovieandSerieBackground;
