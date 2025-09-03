import { Container, Nav, Navbar } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";

function NavbarHome() {
  const title: string = "Movieverse";

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
    <Navbar
      expand="lg"
      style={{ backgroundColor: "transparent" }}
      className="mt-2"
    >
      <Container fluid className="mx-2 mx-md-5">
        <Navbar.Brand
          href="#"
          style={{
            fontFamily: " DM Sans, sans-serif",
            color: "#fff",
            fontSize: "30px",
            margin: "0",
            padding: "0",
          }}
        >
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <div className="d-flex justify-content-center align-items-baseline flex-md-row">
              <CustomButton
                navigate={() => handleClick("/catalogue", "/auth/signin")}
                classCustom="btn btn-buton text-white me-2 bg-transparent fancy-btn mt-5 mt-md-0"
                styleCustom={{ border: "1px solid white", zIndex: "2" }}
                text="Sign in"
              />

              <Link to={"/auth/signup"} style={{ textDecoration: "none" }}>
                <CustomButton
                  classCustom=" btn btn-button border-0 text-black fancy-btn"
                  styleCustom={{
                    backgroundColor: "#caf0f8",
                    fontFamily: " DM Sans, sans-serif",
                  }}
                  text="Sign up"
                />
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;
