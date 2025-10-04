import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Modal, Row } from "react-bootstrap";
import type { Profile } from "../../Interface/Profile";
import { useNavigate, type NavigateFunction } from "react-router-dom";

function EditProfile() {
  const [profile, setProfile] = useState<Profile>();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate: NavigateFunction = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const fetchProfile = async () => {
    try {
      const resp = await fetch(`http://localhost:3002/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        const data: Profile = await resp.json();
        setProfile(data);
        setName(data.name || "");
        setUsername(data.username || "");
        setIsLoading(false);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const update: Partial<Profile> = { name, username };
      const resp = await fetch(`http://localhost:3002/users/me`, {
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
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdateImage = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const resp = await fetch(
        `http://localhost:3002/users/image/${profile?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (resp.ok) {
        const message = await resp.text();
        console.log(message);
        setFile(null);
        refreshPage();
      } else {
        throw new Error("Error uploading image");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchDelete = async () => {
    try {
      const resp = await fetch(`http://localhost:3002/users/${profile?.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        handleClick();
      } else {
        throw new Error("Error delete account!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center "
    >
      <Row className="d-flex flex-column flex-md-row align-items-center justify-content-center">
        <Col>
          <h2 className="text-white mb-4">Edit profile</h2>
          <p className="mb-0 text-white">
            this is your main account, update it to see the changes.
          </p>
          <Form onSubmit={fetchUpdateProfile}>
            <Form.Group className="mb-3">
              <p className="mt-3 mb-0 text-white">Name</p>
              <Form.Control
                style={{
                  backgroundColor: "gray",
                  border: "0",
                  borderBottom: "1px solid white",
                  borderRadius: "0px",
                  color: "white",
                }}
                className="editProfile px-0 ps-1 mt-1 rounded-1"
                type="text"
                placeholder={isLoading ? "Loading..." : profile?.name || "Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="mb-0 mt-3 text-white">Username</p>
              <Form.Control
                style={{
                  backgroundColor: "gray",
                  border: "0",
                  borderBottom: "1px solid white",
                  borderRadius: "0px",
                  color: "white",
                }}
                className="editProfile px-0 ps-1 mt-1 rounded-1"
                type="text"
                placeholder={isLoading ? "Loading..." : profile?.username || "Enter your username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <FormGroup>
              <p className="mb-0 text-white">Subscription</p>
              <Form.Control
                type="text"
                placeholder={`${profile?.subscriptions}`}
                disabled
                readOnly
                className="mb-3 mt-1 border-0 customPlaceholder"
                style={{ backgroundColor: "#343A40" }}
              />
              <p className="mb-0 text-white">Email</p>
              <Form.Control
                type="text"
                placeholder={`${profile?.email}`}
                disabled
                readOnly
                className="mb-3 mt-1 border-0 customPlaceholder"
                style={{ backgroundColor: "#343A40" }}
              />
            </FormGroup>
            <div className="d-flex">
              <button className="btn btn-danger" onClick={handleShow}>
                Delete account
              </button>
              <button className="btn btn-primary ms-auto" onClick={refreshPage}>
                Save Changes
              </button>
            </div>
          </Form>
        </Col>
        <Col>
          <div
            style={{ position: "relative" }}
            className="text-center d-flex flex-column "
          >
            <label htmlFor="fileInput">
              <img
                src={profile?.avatar || "/default-avatar.png"}
                alt="Profile"
                width={200}
                height={200}
                className="rounded-circle"
                style={{
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            {file && (
              <button
                type="button"
                className="btn text-white border-bottom rounded-0 bg-transparent border-0 mt-2"
                onClick={fetchUpdateImage}
              >
                Upload Image
              </button>
            )}
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#212529" }}>
          <Modal.Title className="text-white">Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-white"
          style={{ backgroundColor: "#212529" }}
        >
          Are you really sure you want to delete your account?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#212529" }}>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-danger" onClick={fetchDelete}>
            Delete account
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditProfile;
