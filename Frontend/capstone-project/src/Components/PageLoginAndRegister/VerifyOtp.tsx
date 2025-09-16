import React, { useState } from "react";
import BackgroundForm from "./BackgroundForm";

import {  Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const email = localStorage.getItem("forgotEmail") || "";

  const title: string = "Verify OTP";
  const [otp, setOtp] = useState<number>(0);
  const [mess, setMess] = useState("");
  const navigate = useNavigate();

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch(
        `http://localhost:3002/forgotPassword/verifyOtp/${otp}/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );
      if (resp.ok) {
        setMess("OTP Corretto");
        localStorage.setItem("forgotEmail", email);
        navigate("/forgotPassword/changePassword");
      } else {
        setMess("OTP not correct!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackgroundForm>
      <h2 className="text-center"> {title} </h2>
      <Form
        onSubmit={verifyOtp}
        className="d-flex flex-column align-items-center"
      >
        <Form.Control
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtp(Number(e.currentTarget.value))
          }
          className="my-4"
          type="number"
          placeholder="Enter OTP"
          required
        />
        <button type="submit" className="px-5 btn" style={{ backgroundColor: "#E50914", color: "white" }}>
          Send
        </button>
        <p className="my-2 text-danger">{mess}</p>
      </Form>
    </BackgroundForm>
  );
}

export default VerifyOtp;
