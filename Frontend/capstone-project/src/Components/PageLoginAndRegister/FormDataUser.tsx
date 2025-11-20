import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

interface CustomFetch {
  nameForm?: boolean;
  fetchNavigate: string;
  navigateCustom: string;
}

function FormDataUser({
  fetchNavigate,
  nameForm,
  navigateCustom,
}: CustomFetch) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const body = nameForm
    ? { username, name, email, password }
    : { email, password };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${API_URL}/auth/${fetchNavigate}`;
    const requestBody = JSON.stringify(body);
    
    // Debug logging
    console.log("=== LOGIN REQUEST DEBUG ===");
    console.log("URL:", url);
    console.log("Method: POST");
    console.log("Body:", body);
    console.log("Stringified Body:", requestBody);
    console.log("API_URL:", API_URL);
    console.log("fetchNavigate:", fetchNavigate);

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      
      console.log("Response Status:", resp.status);
      console.log("Response Headers:", Object.fromEntries(resp.headers.entries()));
      
      if (resp.ok) {
        const data = await resp.json();
        console.log("Response Data:", data);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("token", data.accessToken);
        if (data.id) {
          localStorage.setItem("userId", data.id.toString());
        }

        navigate(`${navigateCustom}`);
      } else {
        let errorData;
        try {
          const text = await resp.text();
          console.log("Error Response Text:", text);
          errorData = text ? JSON.parse(text) : { message: "Unknown error" };
        } catch (parseError) {
          console.log("Failed to parse error response:", parseError);
          errorData = { message: "Unknown error" };
        }
        
        console.log("Error Data:", errorData);
        
        if (resp.status === 400) {
          throw new Error(errorData.message || "Ops! email address is already in use!");
        } else if (resp.status === 404) {
          throw new Error(errorData.message || "Ops! wrong credentials!");
        } else if (resp.status === 500) {
          throw new Error(errorData.message || "Server error. Please try again later.");
        } else {
          throw new Error(errorData.message || `An error occurred (${resp.status}). Please try again.`);
        }
      }
    } catch (error) {
      console.error("Request Error:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setError("Network error. Please check your connection.");
      } else {
        setError((error as Error).message);
      }
    }
  };

  

  return (
    <>
      <Form onSubmit={handleRegister} className="ps-0">
        <Row>
          {nameForm && (
            <>
              <Col xs={12}>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="mt-3"
                  placeholder="username"
                  required
                />
              </Col>
              <Col xs={12} md={6}>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="mt-3"
                  placeholder="name"
                  required
                />
              </Col>
            </>
          )}

          {nameForm ? (
            <Col xs={12} md={6}>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3"
                type="email"
                placeholder="email"
                required
              />
            </Col>
          ) : (
            <Col xs={12}>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3"
                type="email"
                placeholder="email"
                required
              />
            </Col>
          )}
          <Col xs={12}>
            <Form.Control
              className="my-3"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
          <Col
            xs={12}
            className="mb-3 d-flex flex-column justify-content-center"
          >
            {nameForm ? (
              <>
                <Link to={"/auth/signin"}>
                  <p>Login</p>
                </Link>
              </>
            ) : (
              <>
                <div className="d-flex">
                  <Link
                    target="_blank"
                    to={"/forgotPassword/verifyEmail"}
                    style={{ textDecoration: "none" }}
                  >
                    <p>Forgot password ? </p>
                  </Link>
                  <Link to={"/auth/signup"} style={{ marginLeft: "auto" }}>
                    <p>Create an Account </p>
                  </Link>
                </div>
              </>
            )}
            {error && <p className="text-danger text-center">{error}</p>}
            <button
              style={{
                backgroundColor: "#9e2a2b",
                fontFamily: " DM Sans, sans-serif",
              }}
              className=" btn border-0 text-white"
              type="submit"
            >
              Send
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormDataUser;
