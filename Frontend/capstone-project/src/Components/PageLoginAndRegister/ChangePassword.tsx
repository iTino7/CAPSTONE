import React, { useState } from "react";
import BackgroundForm from "./BackgroundForm";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

function ChangePassword() {
  const title: string = "Repeat password";
  const email = localStorage.getItem("forgotEmail") || "";

  const [password, SetPassword] = useState("");
  const [repeatPassword, SetNewPassword] = useState("");
  const [mess, setMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTime = () => {
    setTimeout(() => {
      navigate("/auth/signin");
    }, 2000);
  };

  const fetchNewPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMess("");

    try {
      const resp = await fetch(
        `${API_URL}/forgotPassword/changePassword/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, repeatPassword }),
        }
      );
      if (resp.ok) {
        setMess("Password updated!");
        getTime();
      } else {
        setMess("password don't match!");
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
        onSubmit={fetchNewPass}
        className="d-flex flex-column align-items-center"
      >
        <Form.Control
          className="my-4"
          type="password"
          placeholder="new password"
          required
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        <Form.Control
          className="my-4"
          type="password"
          placeholder="repeat password"
          required
          value={repeatPassword}
          onChange={(e) => SetNewPassword(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 btn d-flex align-items-center justify-content-center gap-2"
          style={{ backgroundColor: "#893346", color: "white" }}
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
          {isLoading ? "Updating..." : "Send"}
        </button>
        <p className="my-2 text-black">{mess}</p>
      </Form>
    </BackgroundForm>
  );
}

export default ChangePassword;
