import { Container } from "react-bootstrap";
import CustomButton from "./CustomButton";

function PhrasesHome() {
  const title: string = "Escape reality, enter imagination.";
  const titleButton: string = `Endless stories. One platform`;

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
            {title}
          </h1>
          <div className="ms-auto mt-auto">
            <p
              className="text-white fw-bold fs-3"
              style={{
                fontFamily: " DM Sans, sans-serif",
                maxWidth: "250px",
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
            <h1 className="text-white text-center">{title}</h1>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PhrasesHome;
