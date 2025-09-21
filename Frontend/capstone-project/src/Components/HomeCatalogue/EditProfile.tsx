import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import type { Profile } from "../../Interface/Profile";
import { PencilSquare } from "react-bootstrap-icons";

function EditProfile() {
  const [profile, setProfile] = useState<Profile>();
  const [name, setName] = useState("");

  const fetchProfile = async () => {
    try {
      const resp = await fetch("http://localhost:3002/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        const data: Profile = await resp.json();
        setProfile(data);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const update: Partial<Profile> = { name };
      const resp = await fetch("http://localhost:3002/users/me", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      if (resp.ok) {
        const data: Profile = await resp.json();
        setProfile(data);
        window.location.reload();
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  console.log(profile);

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center "
    >
      <Row className="d-flex flex-column flex-md-row align-items-center justify-content-center">
        <Col>
          <h2 className="text-white mb-4">Edit profile</h2>
          <p className="mb-0 text-white">
            This is your primary profile. It cannot be deleted.
          </p>
          <Form onSubmit={fetchUpdateProfile}>
            <Form.Group className="mb-3">
              <Form.Control
                style={{
                  backgroundColor: "transparent",
                  border: "0",
                  borderBottom: "1px solid white",
                  borderRadius: "0px",
                  color: "white",
                }}
                className="editProfile px-0 ps-1 mt-3"
                type="text"
                placeholder={`${profile?.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <FormGroup>
              <div className="bg-dark my-3 d-flex justify-content-center align-items-center">
                <h4 className="text-white">setting</h4>
              </div>
            </FormGroup>
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
          </Form>
        </Col>
        <Col>
          <div style={{ position: "relative" }} className="text-center">
            <img
              src={`${profile?.avatar}`}
              alt=""
              width={250}
              height={250}
              className="rounded-circle"
              style={{
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
            <PencilSquare
              style={{
                position: "absolute",
                bottom: "0",
                right: "50%",
                color: "white",
                fontSize: "20px",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
