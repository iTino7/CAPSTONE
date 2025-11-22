import React, { useState } from "react";
import BackgroundForm from "./BackgroundForm";

import {  Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

function VerifyOtp() {
  const email = localStorage.getItem("forgotEmail") || "";

  const title: string = "Verify OTP";
  const [otp, setOtp] = useState<number>(0);
  const [mess, setMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMess("");

    try {
      const resp = await fetch(
        `${API_URL}/forgotPassword/verifyOtp/${otp}/${email}`,
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
      setMess("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
        <button 
          type="submit" 
          className="px-5 btn d-flex align-items-center justify-content-center gap-2" 
          style={{ backgroundColor: "#9e2a2b", color: "white" }}
          disabled={isLoading}
        >
          {isLoading && (
            <Spinner
              animation="border"
              size="sm"
              variant="light"
              style={{ width: "16px", height: "16px" }}
            />
          )}
          {isLoading ? "Verifying..." : "Send"}
        </button>
        <p className="my-2 text-danger">{mess}</p>
      </Form>
    </BackgroundForm>
  );
}

export default VerifyOtp;
