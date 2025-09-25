import React, { useState } from "react";
import BackgroundForm from "./BackgroundForm";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const title: string = "Repeat password";
  const email = localStorage.getItem("forgotEmail") || "";

  const [password, SetPassword] = useState("");
  const [repeatPassword, SetNewPassword] = useState("");
  const [mess, setMess] = useState("");
  const navigate = useNavigate();

  const getTime = () => {
    setTimeout(() => {
      navigate("/auth/signin");
    }, 2000);
  };

  const fetchNewPass = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch(
        `http://localhost:3002/forgotPassword/changePassword/${email}`,
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
      console.log(error);
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
          className="px-5 btn"
          style={{ backgroundColor: "#893346", color: "white" }}
        >
          Send
        </button>
        <p className="my-2 text-black">{mess}</p>
      </Form>
    </BackgroundForm>
  );
}

export default ChangePassword;
