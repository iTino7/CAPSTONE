import { Col, Container, Row } from "react-bootstrap";

function AdvHome() {
  const titleAdv = (text: string) => {
    const title = text;
    return title;
  };

  return (
    <Container
      fluid
      className="py-5 d-flex flex-column position-relative w-100"
      style={{
        background:
          "linear-gradient(180deg,rgba(0, 0, 0, 1) 26%, rgba(111, 10, 10, 1) 67%, rgba(156, 14, 14, 1) 87%, rgba(255, 0, 0, 1) 100%)",
      }}
    >
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <h1
            className="text-white pt-5 mt-2 title scrollText w-50 block text-center"
            style={{ marginBottom: "50px" }}
          >
            {titleAdv("Stories and series, anytime, anywhere.")}
          </h1>
          <div className="text-center backgroundImageAdv w-75 mx-auto mb-3"></div>
          <h1 className="text-white w-25 text-center block">
            {titleAdv("One click, endless stories.")}
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvHome;
