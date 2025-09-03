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
    <Container fluid className="p-0 position-relative ">
      <Row className="m-0">
        <Col xs={12} className="p-0">
          <div className=" wallpaperRegister" />
        </Col>
        <Col
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="bg-black text-white w-25 rounded-2 p-3">
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
