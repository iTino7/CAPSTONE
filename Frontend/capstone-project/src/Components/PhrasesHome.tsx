import { Container } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import BlurText from "./BlurText";

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

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center h-100 w-100">
        <div
          className="mx-2 d-md-flex mx-md-0 align-items-center justify-content-center w-100 "
          style={{ bottom: "150px" }}
        >
          <h1
            className="text-white m-0"
            style={{
              maxWidth: "450px",
              fontSize: "75px",
              fontFamily: " DM Sans, sans-serif",
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
          <div className="ms-auto  d-flex flex-column justify-content-end align-items-start">
            <p
              className="text-white fw-bold fs-3"
              style={{
                fontFamily: " DM Sans, sans-serif",
                maxWidth: "250px",
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
      </Container>
    </>
  );
}

export default PhrasesHome;
