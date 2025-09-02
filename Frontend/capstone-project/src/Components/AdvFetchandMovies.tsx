import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "./CustomButton";

function AdvFetchandMovies() {
  return (
    <Container fluid className="bg-white position-relative py-4">
      <Row>
        <Col xs={12}>
          <div className="d-flex flex-column align-items-center pt-5 customTitleAdv">
            <h1
              className="text-center title"
              style={{
                fontFamily: " DM Sans, sans-serif",
              }}
            >
              "See what's next"
            </h1>
            <CustomButton
              text="Accedi"
              classCustom="fancy-btn d-none d-md-flex"
              styleCustom={{
                color: "white",
                fontFamily: " DM Sans, sans-serif",
                backgroundColor: "red",
                fontSize: "28px",
                marginRight: "10px",
                borderRadius: "8px",
                padding: ".2rem .7rem",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvFetchandMovies;
