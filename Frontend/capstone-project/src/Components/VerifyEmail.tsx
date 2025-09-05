import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import BlurText from "./BlurText";
import Silk from "./Silk";

function VerifyEmail() {
  const title: string = "...so you forgot your password? 🙄";
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const navigate = useNavigate();

  const otpFetch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch(
        `http://localhost:3002/forgotPassword/verifyMail/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (resp.ok) {
        setMess("OTP inviato!");
        localStorage.setItem("forgotEmail", email);

        navigate(`/forgotPassword/verifyOtp`);
      } else {
        setMess("Impossibile inviare OTP, inserisci un'email valida!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMess("error");
    }
  };

  return (
    <Container
      fluid
      className="m-0 p-0 w-100 d-flex align-items-center bg-dark"
      style={{ height: "100vh" }}
    >
      <div className="m-0 w-100 position-absolute" style={{zIndex:"0", height:"100vh"}}>
        <Silk
          speed={5}
          scale={1}
          color="#471515"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Container fluid className="form-container" style={{zIndex:"2"}}>
        <NavLink to={"/"} className="btn">
          <h2>MovieVerse</h2>
        </NavLink>
        <div className="logo-container">
          <BlurText
            text={title}
            delay={250}
            animateBy="words"
            direction="top"
            onAnimationComplete={() => {}}
            className="text-2xl mb-8 justify-content-center"
          />
        </div>
        <Form onSubmit={otpFetch} className="form">
          <Form.Group>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-4"
              type="email"
              placeholder="Enter email"
              required
            />
            <Button
              type="submit"
              className="d-flex justify-content-center w-100 bg-dark border-0"
            >
              Send
            </Button>
            <p className="text-danger text-center">{mess}</p>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}

export default VerifyEmail;
