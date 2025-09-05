import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LightRays from "./LightRays";

interface TitleRegister {
  children?: React.ReactNode;
  subTitle?: string;
}

function BackgroundForm({ children, subTitle }: TitleRegister) {
  const title: string = "MovieVerse";

  return (
    <Container
      fluid
      className="bg-black p-0 position-relative"
    >
      <div
        className="m-0 w-100 position-absolute"
        style={{ zIndex: "0", height: "100vh" }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#fff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <Row className="m-0 d-flex justify-content-center">
        <div />
        <Col
          xs={10}
          sm={6}
          lg={8}
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="form-container text-black" style={{ zIndex: "1" }}>
            <Link
              to="/"
              className="text-black"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <h1>{title}</h1>
            </Link>
            <h2 className="my-4">{subTitle}</h2>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BackgroundForm;
