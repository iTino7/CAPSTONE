import { Col, Container, Row } from "react-bootstrap";
import BackgroundSubscription from "../BackgroundSubscription";

function PlansHome() {
  return (
    <Container fluid className="bg-black pt-5" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <h1 className="d-flex justify-content-center text-white text-center title" style={{maxWidth: "100%"}}>Choose your plan</h1>
          <BackgroundSubscription textColorCustom="text-white" />
        </Col>
      </Row>
    </Container>
  );
}

export default PlansHome;
