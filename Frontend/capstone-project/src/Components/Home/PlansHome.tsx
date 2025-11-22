import { Col, Container, Row } from "react-bootstrap";
import BackgroundSubscription from "../BackgroundSubscription";

function PlansHome() {
  return (
    <Container fluid className="bg-black pt-4 pt-md-5 pb-4 pb-md-5" style={{ minHeight: "auto" }}>
      <Row>
        <Col>
          <h1 
            className="d-flex justify-content-center text-white text-center title mb-4 mb-md-5 px-3" 
            style={{
              maxWidth: "100%",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            }}
          >
            Choose your plan
          </h1>
          <BackgroundSubscription textColorCustom="text-white" />
        </Col>
      </Row>
    </Container>
  );
}

export default PlansHome;
