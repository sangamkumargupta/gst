import React from "react";
import "../assets/css/StatCard.css";
import * as Icons from "react-icons/fa";

const StatCard = ({ title, value, icon }) => {
  const Icon = Icons[icon] || Icons.FaInfoCircle;
  return (
    <div className="p-4 dashboard-card rounded-xl shadow-md flex items-center gap-4">
      <span className="text-blue-500 text-3xl ">
        <Icon />
      </span>
      <p className="text-sm d-flex">{title} </p>
      <div>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
