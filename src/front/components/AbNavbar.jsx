import React from 'react';
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AbNavbar = () => {

  const { store, dispatch } = useGlobalReducer()

  function logout() {
    localStorage.removeItem("jwt-token");
    dispatch({ type: 'set_access', payload: false });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <a className="navbar-brand" href="/">Brand</a>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColapsed"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content aligned right */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarColapsed">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {!store.access && (<>
                <li className="border-top outline-dark my-2 d-lg-0 "></li>
                <li className="nav-item mb-2 me-2 mb-lg-0">
                  <Link to="/login">
                    <button className="btn btn-outline-info btn-sm" >Log In</button>
                  </Link>
                </li>
                <li className="nav-item mb-2 me-2 mb-lg-0">
                  <Link to="/singup">
                    <button className="btn btn-outline-warning btn-sm" >Sign Up</button>
                  </Link>
                </li>
              </>)}
              {store.access && (<li className="nav-item mb-2 me-2 mb-lg-0">
                <Link to="/welcome">
                  <button className="btn btn-outline-danger btn-sm" onClick={(e) => { logout() }}>Log Out</button>
                </Link>
              </li>)}
            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}
