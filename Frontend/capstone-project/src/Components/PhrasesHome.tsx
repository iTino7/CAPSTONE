import { Container } from "react-bootstrap";
import CustomButton from "./CustomButton";

function PhrasesHome() {
  const title: string = "Escape reality, enter imagination.";
  const titleButton: string = "Endless stories. One platform";

  return (
    <>
      <Container className="position-absolute">
        <div
          className="mx-2 mx-md-5 d-md-flex align-items-center fixed-bottom"
          style={{ bottom: "50px" }}
        >
          <h1
            className="text-white ms-5"
            style={{ maxWidth: "350px", fontFamily: " DM Sans, sans-serif" }}
          >
            {title}
          </h1>
          <div className="ms-auto">
            <p
              className="text-white"
              style={{
                fontFamily: " DM Sans, sans-serif",
              }}
            >
              {titleButton}
            </p>
            <CustomButton
              classCustom=" border-0 text-black fancy-btn"
              styleCustom={{
                backgroundColor: "#caf0f8",
                fontFamily: " DM Sans, sans-serif",
              }}
              text="Sign up"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default PhrasesHome;
