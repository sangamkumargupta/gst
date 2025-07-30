import React, { useState } from "react";
import TabSwitcher from "../../../components/TabSwitcher";

const mainTabs = [
  { label: "Supplies through ECO", key: "Supplies_through_ECO" },
  { label: "Liable to pay tax us 95", key: "Liable_to_pay_tax_us_95" },
];

const formSubTabs = [
  { label: "Form A", key: "form_a" },
  { label: "Form B", key: "form_b" },
];

const formOneSubTabs = [
  { label: "Form A", key: "form_a" },
  { label: "Form B", key: "form_b" },
  { label: "Form C", key: "form_c" },
  { label: "Form D", key: "form_d" },
];

const viewTabs = [
  { label: "Form", key: "form" },
  { label: "List", key: "list" },
];

const ECO = () => {
  const [activeMainTab, setActiveMainTab] = useState("Supplies_through_ECO");
  const [activeFormSubTab, setActiveFormSubTab] = useState(null);
  const [activeFormOneSubTab, setActiveFormOneSubTab] = useState(null);
  const [activeViewTab, setActiveViewTab] = useState(null);

  const handleMainTabChange = (key) => {
    setActiveMainTab(key);
    setActiveFormSubTab(null);
    setActiveFormOneSubTab(null);
    setActiveViewTab(null);
  };

  const handleFormSubTabChange = (key) => {
    setActiveFormSubTab(key);
    setActiveFormOneSubTab(null);
    setActiveViewTab(null);
  };

  const handleFormOneSubTabChange = (key) => {
    setActiveFormOneSubTab(key);
    setActiveFormSubTab(null); // Reset formSubTab to prevent conflict
    setActiveViewTab(null);
  };

  const handleViewTabChange = (key) => {
    setActiveViewTab(key);
  };

  const getActiveTabName = () => {
    if (activeViewTab) return activeViewTab;
    if (activeFormSubTab || activeFormOneSubTab)
      return (activeFormSubTab || activeFormOneSubTab).replaceAll("_", " ");
    return activeMainTab.replaceAll("_", " ");
  };

  return (
    <div className="form-container">
      {/* Main Tabs */}
      <TabSwitcher
        tabs={mainTabs}
        activeKey={activeMainTab}
        onTabChange={handleMainTabChange}
      />

      {/* Sub-Tabs */}
      {activeMainTab === "Supplies_through_ECO" && (
        <TabSwitcher
          tabs={formSubTabs}
          activeKey={activeFormSubTab}
          onTabChange={handleFormSubTabChange}
        />
      )}

      {activeMainTab === "Liable_to_pay_tax_us_95" && (
        <TabSwitcher
          tabs={formOneSubTabs}
          activeKey={activeFormOneSubTab}
          onTabChange={handleFormOneSubTabChange}
        />
      )}

      {/* View Tabs */}
      {(activeFormSubTab || activeFormOneSubTab) && (
        <TabSwitcher
          tabs={viewTabs}
          activeKey={activeViewTab}
          onTabChange={handleViewTabChange}
        />
      )}

      {/* Output */}
      <div className="mt-4">
        <h4>Active Tab: {getActiveTabName()}</h4>
      </div>
    </div>
  );
};

export default ECO;
