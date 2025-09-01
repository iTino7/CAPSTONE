import { Button, Container } from "react-bootstrap";
import CustomButton from "./CustomButton";

function PhrasesHome() {
  const title: string = "Escape reality, enter imagination.";
  const titleButton: string = "Endless stories. One platform";

  return (
    <>
      <Container className="position-absolute h-100">
        <div
          className="d-none d-md-flex mx-2 mx-md-5 d-md-flex align-items-center fixed-bottom"
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
        <div className="h-100 d-flex flex-column justify-content-center align-items-center d-md-none">
          <div className="mt-auto d-flex flex-column align-items-center">
            <h1
              style={{ fontSize: "50px", color: "white" }}
              className="text-center"
            >
              {titleButton}
            </h1>
            <CustomButton
              classCustom="border-0 text-black fancy-btn mt-3"
              styleCustom={{
                backgroundColor: "#caf0f8",
                fontFamily: " DM Sans, sans-serif",
              }}
              text="Sign up"
            />
          </div>
          <div className="mt-auto mb-5">
            <h1 className="text-white">{title}</h1>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PhrasesHome;
