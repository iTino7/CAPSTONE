import React, { useState } from "react";
import BackgroundForm from "./BackgroundForm";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const title: string = "Forgot Password";
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
    <BackgroundForm>
      <Container fluid className="my-5">
        <h4 className="text-center"> {title} </h4>
        <Form onSubmit={otpFetch}>
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
            className="w-100 d-flex flex-column align-items-center"
          >
            Send
          </Button>
          <p className="text-danger">{mess}</p>
        </Form>
      </Container>
    </BackgroundForm>
  );
}

export default VerifyEmail;
