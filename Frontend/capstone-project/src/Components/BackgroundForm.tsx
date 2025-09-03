import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface TitleRegister {
  children?: React.ReactNode;
  subTitle?: string;
}

function BackgroundForm({ children, subTitle }: TitleRegister) {
  const title: string = "Movieverse";

  return (
    <Container
      fluid
      className="p-0 position-relative d-flex justify-content-center"
    >
      <Row className="m-0 d-flex justify-content-center">
        <div className=" wallpaperRegister" />
        <Col xs={10} sm={6} lg={7}
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="bg-black text-white mx-3 mx-md-0 rounded-2 p-3">
            <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
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
