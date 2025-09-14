import { Container, Nav, Navbar } from "react-bootstrap";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

function NavBarLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const check = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" ? "nav-link text-white" : "nav-link";
    }
    return location.pathname.startsWith(path)
      ? "nav-link text-white"
      : "nav-link";
  };

  return (
    <>
      <Container fluid style={{ backgroundColor: "#121212"}}>
        <Navbar expand="lg" style={{ zIndex: 2 }}>
          <Container fluid>
            <Navbar.Brand>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <h1 className="mb-0">MovieVerse</h1>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <NavLink
                  to={"/catalogue"}
                  className={` ${check(
                    "/catalogo"
                  )} nav-link me-2 fs-5 text-secondary`}
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/search"}
                  className={` ${check(
                    "/search"
                  )} nav-link me-2 fs-5 text-secondary`}
                >
                  Search
                </NavLink>
                <NavLink
                  to={"/watchList"}
                  className={` ${check(
                    "/watchList"
                  )} nav-link me-2 fs-5 text-secondary`}
                >
                  Watchlist
                </NavLink>
                <NavLink
                  to={"/movie"}
                  className={` ${check(
                    "/movie"
                  )} nav-link me-2 fs-5 text-secondary`}
                >
                  Movie
                </NavLink>
                <NavLink
                  to={"/series"}
                  className={` ${check(
                    "/series"
                  )} nav-link me-2 fs-5 text-secondary`}
                >
                  Series
                </NavLink>
              </Nav>
              <button
                onClick={handleLogout}
                className="ms-auto btn btn-primary"
              >
                logout
              </button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Outlet />
      </Container>
    </>
  );
}

export default NavBarLogin;
