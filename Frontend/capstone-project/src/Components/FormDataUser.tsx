import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface CustomFetch {
  nameForm?: boolean;
  fetchNavigate: string;
}

function FormDataUser({ fetchNavigate, nameForm }: CustomFetch) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const body = nameForm
    ? { username, name, email, password }
    : { email, password };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await fetch(`http://localhost:3001/auth/${fetchNavigate}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        localStorage.setItem("loggedIn", "true");
        navigate("/movie");
      } else {
        console.log("Email già in uso");
      }
    } catch (error) {
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
                    to={"/forgotPassword/verifyMail"}
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
            <Button
              style={{
                backgroundColor: "#caf0f8",
                fontFamily: " DM Sans, sans-serif",
              }}
              className="border-0 text-dark"
              type="submit"
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormDataUser;
