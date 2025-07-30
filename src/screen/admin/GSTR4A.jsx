import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import Tabs from "../../components/Tabs";
import "../../assets/css/GSTR4A.css";
import B2B from "./forms/GSTR4AB2B";
import B2BA from "./forms/GSTR4AB2BA";
import CDNR from "./forms/GSTR4ACDNR";
import CDNRA from "./forms/GSTR4ACDNRA";
import BottomBar from "../../components/BottomBar";
import { FaFilePdf, FaRegFileExcel } from "react-icons/fa";

const tabComponents = {
  B2B: B2B,
  B2BA: B2BA,
  CDNR: CDNR,
  CDNRA: CDNRA,
};

const GSTR4A = () => {
  // const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const tabs = ["B2B", "B2BA", "CDNR", "CDNRA"];
  // const moreTabs = ["IMPG", "IMPS", "EXP", "AT", "TXPD"];
  const moreTabs = ["Other"];

  const [activeTab, setActiveTab] = useState("B2B");
  const childARef = useRef();

  useEffect(() => {
    console.log("Selected Tab (Default):", activeTab);
  }, []);

  useEffect(() => {
    console.log("Selected Tab:", activeTab);
  }, [activeTab]);

  const ActiveComponent = tabComponents[activeTab] || null;
  // const ActiveComponent = tabComponents[activeTab];

  const handleExport = () => {
    console.log("Ref value:", childARef.current);
    if (childARef.current?.exportToExcel) {
      childARef.current.exportToExcel();
    } else {
      console.warn("Export function not available for this tab.");
    }
  };
  if (ActiveComponent === "B2B") {
    console.log("childARef.current", childARef.current);
  }

  // Handle tab change
  const handleTabChange = (tab) => {
    console.log("Tab clicked:", tab);
    setActiveTab(tab);
  };
  const getFilteredTabs = () => {
    return tabs;
  };

  return (
    <>
      <div className=" GSTR41-client-detail">
        <div className="gstr-tabs ">
          <div className="bottom-buttons mb-3  "></div>
          <Tabs
            tabs={getFilteredTabs()}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
        </div>

        {/* Dynamic Component */}
        <div className="">
          {/* <button onClick={handleExport}>Export</button> */}

          {ActiveComponent && <ActiveComponent ref={childARef} />}
        </div>
      </div>

     <BottomBar tab="GSTR-4A" onExport={handleExport} />
    </>
  );
};

export default GSTR4A;
