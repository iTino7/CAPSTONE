import { Container } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import BlurText from "./BlurText";
import { useEffect, useState } from "react";

function PhrasesHome() {
  const title: string = "Escape reality, enter imagination.";
  const titleButton: string = `Endless stories. One platform`;

  const navigate = useNavigate();

  const handleClick = (page: string, pageNavigate: string) => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      navigate(page);
    } else {
      navigate(pageNavigate);
    }
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center h-100 w-100" style={{ overflowX: "hidden" }}>
        <div
          className="mx-2 d-flex flex-column align-items-center justify-content-center w-100"
          style={{ bottom: "150px", maxWidth: "100%" }}
        >
          <h1
            className="text-white m-0 text-center"
            style={{
              maxWidth: "100%",
              fontSize: "clamp(28px, 8vw, 75px)",
              fontFamily: " DM Sans, sans-serif",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <BlurText
              text={title}
              delay={250}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => {}}
              className="text-2xl mb-8"
            />
          </h1>
          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <p
              className="text-white fw-bold text-center"
              style={{
                fontFamily: " DM Sans, sans-serif",
                maxWidth: "100%",
                fontSize: "clamp(16px, 4vw, 24px)",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              <BlurText
                text={titleButton}
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => {}}
                className="text-2xl mb-8"
              />
            </p>
            <div
              style={{
                opacity: showButton ? 1 : 0,
                transform: showButton ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <CustomButton
                navigate={() => handleClick("/catalogue", "/auth/signup")}
                classCustom=" btn btn-button py-2 order-0 text-white fancy-btn"
                styleCustom={{
                  backgroundColor: "#9e2a2b",
                  fontFamily: " DM Sans, sans-serif",
                }}
                text="movie"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PhrasesHome;
