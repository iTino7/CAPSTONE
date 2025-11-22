import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import BlurText from "../BlurText";
import Silk from "../Silk";
import { API_URL } from "../../config/api";

function VerifyEmail() {
  const title: string = "...so you forgot your password? 🙄";
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email || !email.trim()) {
      setMess("Please enter a valid email address");
      return;
    }

    setMess(""); // Clear previous messages
    setIsLoading(true);
    
    try {
      const encodedEmail = encodeURIComponent(email.trim());
      
      const resp = await fetch(
        `${API_URL}/forgotPassword/verifyMail/${encodedEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );
      
      if (resp.ok) {
        await resp.json().catch(() => null);
        setMess("OTP inviato!");
        localStorage.setItem("forgotEmail", email.trim());
        navigate(`/forgotPassword/verifyOtp`);
      } else {
        let errorMessage = "Could not send OTP. Please try again later.";
        try {
          const errorData = await resp.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          if (resp.status === 500) {
            errorMessage = "Server error. Please contact support or try again later.";
          }
        }
        setMess(errorMessage);
      }
    } catch {
      setMess("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const otpFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    sendOtp();
  };

  return (
    <Container
      fluid
      className="m-0 p-0 w-100 d-flex align-items-center bg-dark"
      style={{ height: "100vh" }}
    >
      <div
        className="m-0 w-100 position-absolute"
        style={{ zIndex: "0", height: "100vh" }}
      >
        <Silk
          speed={5}
          scale={1}
          color="#471515"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Container fluid className="form-container" style={{ zIndex: "2" }}>
        <NavLink to={"/"} className="btn">
          <h2 className="movieverse-title">MovieVerse</h2>
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

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                sendOtp();
              }}
              disabled={isLoading}
              className="d-flex justify-content-center align-items-center w-100 bg-dark border-0 form-submit-btn"
              style={{ gap: "8px" }}
            >
              {isLoading && (
                <Spinner
                  animation="border"
                  size="sm"
                  variant="light"
                  style={{ width: "16px", height: "16px" }}
                />
              )}
              {isLoading ? "Sending..." : "Send"}
            </button>
            <p className="text-danger text-center">{mess}</p>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}

export default VerifyEmail;
