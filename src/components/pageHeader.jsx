import React, { useState } from "react";
import "../assets/css/PageHeader.css";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
// import TableActionButton from "./TableActionButton";
const PageHeader = ({ title, parentTitle, parentLink, gstClint }) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div className="pageHeader  mb-4  ">
        {/* Breadcrumb */}
        <div className="breadcrumb-wrapper d-flex align-items-center">
          <Link to={parentLink} className="text-decoration-none text-purple">
            {parentTitle}
          </Link>
          <span className="pageheader-title mx-2 text-muted">&raquo;</span>
          <span className="pageheader-title text-muted">{title}</span>
        </div>

        {/* Desktop view: Login and gstClint */}
        {gstClint && (
          <div className="pageHeader-actions">
            <span className="gstClient-text">{gstClint}</span> 
            <a
              
              target="_blank"
              className="loginButton greenbtn"
              onClick={() => setShowLogin(true)}
            >
              Login&nbsp;
              <FaSignInAlt className="loginIcon" />
            </a>
          </div>
        )}
      </div>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      {/* Mobile view: Centered gstClint below breadcrumb */}
      {gstClint && (
        <div className="gstClient-mobile-wrapper text-center">
          <span className="gstClient-mobile-text">{gstClint}</span>
        </div>
      )}
    </>
  );
};

export default PageHeader;
