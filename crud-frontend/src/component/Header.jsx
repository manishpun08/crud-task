import React from "react";
import LogoutModal from "./LogoutModal";
import { Link } from "react-router-dom";

const Header = () => {
  const name = localStorage.getItem("name");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
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
          <div
            className="container collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="text-black text-decoration-none fs-4 fw-bold"
                  to={"/home"}
                >
                  Home
                </Link>
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
