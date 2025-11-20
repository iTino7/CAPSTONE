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

    try {
      const resp = await fetch(`${API_URL}/auth/${fetchNavigate}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        const data = await resp.json();
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("token", data.accessToken);
        console.log(localStorage.setItem("userId", data.id));

        navigate(`${navigateCustom}`);
      } else if (resp.status === 400) {
        throw new Error("Ops! email address is already in use!");
      } else if (resp.status === 404) {
        throw new Error("Ops! wrong credentials!");
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      console.log(error);
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
