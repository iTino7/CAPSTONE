import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import type { Profile } from "../../Interface/Profile";

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
      <Row>
        <Col>
          <h2 className="text-white">Edit profile</h2>
          <p className="mb-0 text-white">
            This is your primary profile. It cannot be deleted.
          </p>
          <Form onSubmit={fetchUpdateProfile}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={`${profile?.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
          </Form>
        </Col>
        <Col>
          <img
            src={`${profile?.avatar}`}
            alt=""
            width={250}
            height={250}
            className="rounded-circle"
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
