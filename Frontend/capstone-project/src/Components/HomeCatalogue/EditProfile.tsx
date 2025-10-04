import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Modal, Row, Toast } from "react-bootstrap";
import type { Profile } from "../../Interface/Profile";
import { useNavigate, type NavigateFunction } from "react-router-dom";

function EditProfile() {
  const [profile, setProfile] = useState<Profile>();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showBorder, setShowBorder] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 1048576; // 1MB in bytes
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
      
      // Controlla il tipo di file
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage("Only jpg, png, gif, bmp files are allowed");
        setShowErrorToast(true);
        
        // Reset del file input
        e.target.value = '';
        setFile(null);
        setPreviewUrl(null);
        setShowBorder(false);
        return;
      }
      
      // Controlla la dimensione del file
      if (selectedFile.size > maxSize) {
        setErrorMessage("File size too large. Please select an image smaller than 1MB.");
        setShowErrorToast(true);
        
        // Reset del file input
        e.target.value = '';
        setFile(null);
        setPreviewUrl(null);
        setShowBorder(false);
        return;
      }
      
      setFile(selectedFile);
      
      // Crea un URL per l'anteprima
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      
      // Mostra il bordo verde
      setShowBorder(true);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    const imageContainer = document.querySelector('.image-container');
    
    // Se il click è fuori dal container dell'immagine e c'è un bordo visibile
    if (showBorder && imageContainer && !imageContainer.contains(target)) {
      // Timer per far sparire lentamente il bordo
      setTimeout(() => {
        setShowBorder(false);
      }, 1000); // 1 secondo di delay
    }
  }, [showBorder]);

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

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    try {
      // Prima aggiorna i dati del profilo
      const update: Partial<Profile> = { name, username };
      const profileResp = await fetch(`http://localhost:3002/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      if (!profileResp.ok) {
        throw new Error("Error updating profile");
      }

      const updatedProfile: Profile = await profileResp.json();
      setProfile(updatedProfile);

      // Se c'è un'immagine da caricare, caricala
      if (file && profile?.id) {
        const formData = new FormData();
        formData.append("file", file);

        const imageResp = await fetch(
          `http://localhost:3002/users/image/${profile.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        if (!imageResp.ok) {
          throw new Error("Error uploading image");
        }

        setFile(null);
        setPreviewUrl(null);
        setShowBorder(false);
      }

      // Ricarica la pagina per mostrare le modifiche
      refreshPage();
    } catch (error) {
      console.log(error);
      alert("Error saving changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  // Cleanup dell'URL dell'anteprima quando il componente viene smontato
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Event listener per click fuori dall'immagine
  useEffect(() => {
    if (showBorder) {
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [showBorder, handleClickOutside]);

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
              <button 
                className="btn btn-primary ms-auto" 
                onClick={handleSaveAll}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        </Col>
        <Col>
          <div
            style={{ position: "relative" }}
            className="text-center d-flex flex-column image-container"
          >
            <label htmlFor="fileInput" onClick={(e) => e.stopPropagation()}>
              <img
                src={previewUrl || profile?.avatar || "/default-avatar.png"}
                alt="Profile"
                width={200}
                height={200}
                className="rounded-circle"
                style={{
                  cursor: "pointer",
                  objectFit: "cover",
                  border: showBorder ? "3px solid #28a745" : "3px solid transparent",
                  transition: "border 0.8s ease-out"
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
              accept=".jpg,.jpeg,.png,.gif,.bmp"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-success mt-2 mb-0">
                ✓ Image selected - Click "Save Changes" to update
              </p>
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
      
      {/* Toast di errore per file troppo grande */}
      <Toast
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          backgroundColor: "#dc3545",
          color: "white",
          border: "none"
        }}
        delay={5000}
        autohide
      >
        <Toast.Header closeButton={false} style={{ backgroundColor: "#dc3545", color: "white", border: "none" }}>
          <strong className="me-auto">⚠️ File Too Large</strong>
        </Toast.Header>
        <Toast.Body>
          {errorMessage}
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default EditProfile;
