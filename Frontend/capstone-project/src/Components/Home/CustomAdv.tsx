import { Col, Container, Row } from "react-bootstrap";
import BlurText from "../BlurText";

function CustomAdv() {
  return (
    <Container
      fluid
      className="py-5 d-flex flex-column align-items-center position-relative w-100 "
      style={{
        background:
          "linear-gradient(180deg,rgba(0, 0, 0, 1) 26%, rgba(111, 10, 10, 1) 67%, rgba(156, 14, 14, 1) 87%, rgba(255, 0, 0, 1) 100%)",
      }}
    >
      <Row>
        <Col className="d-flex flex-column align-items-center block">
          <div className="w-100 d-flex justify-content-center align-items-center scrollText mb-4">
            <h1 className="text-white pt-5 mt-2 title w-75 text-center" style={{ maxWidth: "100%" }}>
              <div className="d-flex flex-column">
                <BlurText
                  text="Stories and series,"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={() => {}}
                  className="text-2xl mb-0 justify-content-center"
                />
                <BlurText
                  text="anytime, anywhere."
                  delay={200}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={() => {}}
                  className="text-2xl mb-8 justify-content-center"
                />
              </div>
            </h1>
          </div>
          <div className="text-center backgroundImageAdv w-75 mx-auto mb-3"></div>
        </Col>
        <div className="d-flex justify-content-center">
          <h1 className="text-white  text-center">
            <BlurText
              text="One click, endless stories."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => {}}
              className="text-2xl mb-8 justify-content-center"
            />
          </h1>
        </div>
      </Row>
    </Container>
  );
}

export default CustomAdv;
