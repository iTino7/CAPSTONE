/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import type { User } from "../../Interface/User";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

function NavBarLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/editProfile");
  };

  const check = (path: string) => {
    if (path === "/catalogue") {
      return location.pathname === "/catalogue"
        ? "nav-link text-white"
        : "nav-link";
    }
    return location.pathname.startsWith(path)
      ? "nav-link text-white"
      : "nav-link";
  };

  const fetchProfile = async () => {
    try {
      const resp = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  console.log(user);

  return (
    <>
      <Container fluid style={{ backgroundColor: "#121212" }}>
        <Navbar expand="lg" style={{ zIndex: 2 }}>
          <Container fluid>
            <Navbar.Brand>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <h1 className="mb-0 text-white">MovieVerse</h1>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <NavLink
                  to={"/catalogue"}
                  className={` ${check(
                    "/catalogue"
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
              {/* <button
                onClick={handleLogout}
                className="ms-auto btn btn-primary"
              >
                {user?.name}
              </button> */}
              <Dropdown className="me-3">
                <Dropdown.Toggle className="d-flex justify-content-md-center align-items-center bg-transparent border-0">
                  <p className="d-none d-md-block text-white mb-0">
                    {user?.name}
                  </p>
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt=""
                      width={45}
                      height={45}
                      style={{ objectFit: "cover" }}
                      className="rounded-circle ms-0 ms-md-3"
                    />
                  ) : (
                    <></>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark py-3 m-0 ">
                  <Dropdown.Item
                    onClick={handleProfile}
                    className="text-white textHover fw-light pb-3"
                  >
                    Edit profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                    className=" textHover text-white fw-light"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Outlet />
      </Container>
    </>
  );
}

export default NavBarLogin;
