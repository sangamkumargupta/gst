// components/TabSwitcher.jsx
import React from "react";
import "../assets/css/TabSwitcher.css";

const TabSwitcher = ({ tabs = [], activeKey, onTabChange }) => {
  return (
    <div className="custom-tab-header">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`custom-tab-button ${
            activeKey === tab.key ? "active" : ""
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
