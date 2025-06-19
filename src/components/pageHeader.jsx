import React from "react";
import "../assets/css/PageHeader.css";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
// import TableActionButton from "./TableActionButton";
const PageHeader = ({ title, parentTitle, parentLink, gstClint }) => {
  return (
    <>
      <div className="pageHeader mb-4">
        {/* Breadcrumb */}
        <div className="breadcrumb-wrapper d-flex align-items-center">
          <Link to={parentLink} className="text-decoration-none text-purple">
            {parentTitle}
          </Link>
          <span className="mx-2 text-muted">&raquo;</span>
          <span className="text-muted">{title}</span>
        </div>

        {/* Desktop view: Login and gstClint */}
        {gstClint && (
          <div className="pageHeader-actions">
            <span className="gstClient-text">{gstClint}</span>
            {/* <TableActionButton
               icon={FaSignInAlt}
              type="login"
              title="Login"
              onClick={() => console.log("Login")}
            /> */}
            <a
              href="https://services.gst.gov.in/services/login"
              target="_blank"
              className="loginButton"
            >
              Login&nbsp;<FaSignInAlt className="loginIcon" />
            </a>
          </div>
        )}
      </div>

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
