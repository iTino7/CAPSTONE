import { Col, Container, Row } from "react-bootstrap";
import FuzzyText from "./FuzzyText";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="position-absolute m-0 text-white" style={{top:"30px"}}>
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <FuzzyText
            baseIntensity={0.0}
            hoverIntensity={0.2}
            enableHover={true}
          >
            MovieVerse
          </FuzzyText>
        </NavLink>
      </div>
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
