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
          className="d-none mx-2 d-md-flex mx-md-0 align-items-center justify-content-center w-100 "
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
          <div className="ms-auto mt-auto d-flex flex-column align-items-start">
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
              classCustom=" btn btn-button order-0 text-black fancy-btn"
              styleCustom={{
                backgroundColor: "#caf0f8",
                fontFamily: " DM Sans, sans-serif",
              }}
              text="movie"
            />
          </div>
        </div>
        <div className="h-100 d-flex flex-column justify-content-center align-items-center d-md-none">
          <div className="mt-auto d-flex flex-column align-items-center">
            <h1
              style={{ fontSize: "50px", color: "white" }}
              className="text-center"
            >
              {titleButton}
            </h1>
            <CustomButton
              navigate={() => handleClick("/catalogue", "/auth/signup")}
              classCustom="btn btn-button border-0 text-black fancy-btn mt-3"
              styleCustom={{
                backgroundColor: "#caf0f8",
                fontFamily: " DM Sans, sans-serif",
              }}
              text="movie"
            />
          </div>
          <div className="mt-auto mb-5">
            <h1 className="text-white text-center">{title}</h1>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PhrasesHome;
