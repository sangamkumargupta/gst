import React from "react";
import "../assets/css/pageHeader.css";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PageHeader = ({ title, parentTitle, parentLink }) => {
  return (
    <div className="mb-4">
      {/* Page Title */}
      {/* <h4 className="fw-bold text-dark">{title}</h4> */}

      {/* Breadcrumb */}
      <div className="d-flex align-items-center">
        <Link to={parentLink} className="text-decoration-none text-purple">
          {parentTitle}
        </Link>
        <span className="mx-2 text-muted">&raquo;</span>{" "}
        {/* You can use icon also */}
        <span className="text-muted">{title}</span>
      </div>
    </div>
  );
};

export default PageHeader;
