import React from "react";
import LogoutModal from "./LogoutModal";

const Header = () => {
  const name = localStorage.getItem("name");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>

            {/* left side  */}
            <div className="d-flex align-items-center">
              <p className="mb-0 text-capitalize me-2">Welcome, {name}</p>
              {/* <!-- Vertically centered modal --> */}
              <LogoutModal />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
