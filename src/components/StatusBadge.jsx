import React from "react";
import "../assets/css/ClientTable.css";

const StatusBadge = React.memo(({ value }) => {
  if (value === "FILED") return <span className="badge badge-filed">FILED</span>;
  if (value === "NOT FILED") return <span className="badge badge-not-filed">NOT FILED</span>;
  return <span className="badge badge-empty">-</span>;
});

export default StatusBadge;
