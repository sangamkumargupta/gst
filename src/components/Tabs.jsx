// components/Tabs.js
import React, { memo } from "react";

const Tab = ({ tabs, activeTab, setActiveTab, icon: Icon }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {Icon && <Icon style={{ marginRight: "6px" }} />}
          {tab}
        </button>
      ))}
    </div>
  );
};

export default memo(Tab);
