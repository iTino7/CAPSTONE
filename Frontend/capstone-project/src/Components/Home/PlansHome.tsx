import { Col, Container, Row } from "react-bootstrap";
import ScrollReveal from "../ScrollReveal";
import BackgroundSubscription from "../BackgroundSubscription";

function PlansHome() {
  return (
    <Container fluid className="bg-black pt-5" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <h1 className="text-white text-center">
            <ScrollReveal baseOpacity={3} enableBlur={true} blurStrength={5}>
              Choose your plan
            </ScrollReveal>
          </h1>

          <BackgroundSubscription textColorCustom="text-white" />
        </Col>
      </Row>
    </Container>
  );
}

export default PlansHome;
