import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const body = nameForm
      ? { username, name, email, password }
      : { email, password };

    const url = `${API_URL}/auth/${fetchNavigate}`;
    const requestBody = JSON.stringify(body);

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      
      if (resp.ok) {
        const data = await resp.json();
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
          errorData = text ? JSON.parse(text) : { message: "Unknown error" };
        } catch (parseError) {
          errorData = { message: "Unknown error" };
        }
        
        if (resp.status === 400) {
          throw new Error(errorData.message || "Ops! email address is already in use!");
        } else if (resp.status === 404) {
          throw new Error(errorData.message || "Ops! wrong credentials!");
        } else if (resp.status === 500) {
          // Mostra il messaggio del backend se disponibile
          const errorMessage = errorData.message || "Server error. Please try again later.";
          throw new Error(errorMessage);
        } else {
          throw new Error(errorData.message || `An error occurred (${resp.status}). Please try again.`);
        }
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setError("Network error. Please check your connection.");
      } else {
        setError((error as Error).message);
      }
    } finally {
      setIsLoading(false);
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
              className=" btn border-0 text-white d-flex align-items-center justify-content-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner animation="border" size="sm" variant="light" />}
              {isLoading ? "Loading..." : "Send"}
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormDataUser;
