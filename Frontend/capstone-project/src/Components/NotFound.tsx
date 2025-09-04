import { Col, Container, Row } from "react-bootstrap";
import FuzzyText from "./FuzzyText";

function NotFound() {
  return (
    <>
      <Container
        fluid
        className="bg-black d-flex w-100 justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <div className="d-flex flex-column">
              <FuzzyText
                baseIntensity={0.1}
                hoverIntensity={0.2}
                enableHover={true}
              >
                404
              </FuzzyText>
              <div className="mt-2"></div>
              <FuzzyText
                baseIntensity={0.1}
                hoverIntensity={0.16}
                enableHover={true}
              >
                Not found
              </FuzzyText>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotFound;
