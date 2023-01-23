//if logged show user name and display log out button
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "./../context/courses";

const Navbar = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(CoursesContext);
  const [navVis, setNavVis] = useState("");
  const [loginBtn, setLoginBtn] = useState("");
  useEffect(() => {
    setNavVis(localStorage.getItem("token") ? "visible" : "hidden");
    setLoginBtn(localStorage.getItem("token") ? "hidden" : "visible");
  });
  return (
    <header
      className="p-3  border-bottom"
      style={{ backgroundColor: "#1d1e1e", marginBottom: "0" }}
    >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link
                to="/"
                className="nav-link px-2"
                style={{ color: "yellow" }}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="nav-link px-2"
                style={{ color: "yellow", visibility: loginBtn }}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link className="nav-link px-2" style={{ color: "yellow" }}>
                {"Hello  "} {localStorage.getItem("name")}
              </Link>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            ></input>
          </form>

          <div className="dropdown text-end" style={{ visibility: navVis }}>
            <Link
              to="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa-solid fa-book-open-reader"
                style={{ color: "yellow" }}
              ></i>
            </Link>
            <ul className="dropdown-menu text-small">
              <li>
                <Link className="dropdown-item" to="/profile">
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => {
                    logOut();
                    navigate("/");
                  }}
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
