import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import clients from "../../GstCustomers/gstCustomer.json";
import "../../assets/css/ClientDetails.css";

import PageHeader from "../../components/PageHeader";
import ToggleSelect from "../../components/DropdownToggle";
import Tabs from "../../components/Tabs";
import BottomBar from "../../components/BottomBar";
import Footer from "../../components/Footer";

import GstR1 from "./GstR1";
import GSTR1A from "./GstR1";
import GSTR2A from "./GSTR2A";
import GSTR2B from "./GSTR2B";
import GSTR3B from "./GSTR3B";
import CMP08 from "./CMP08";
import GSTR4A from "./GSTR4A";
import GSTR9A from "./GSTR9A";
import GSTR9 from "./GSTR9";

const tabComponents = {
  "GSTR-01": GstR1,
  "GSTR-1A": GSTR1A,
  "GSTR-2A": GSTR2A,
  "GSTR-2B": GSTR2B,
  "GSTR-3B": GSTR3B,
  "CMP-08": CMP08,
  "GSTR-4A": GSTR4A,
  "GSTR-9": GSTR9,
  "GSTR-9A": GSTR9A,
};

const returnTypeOptions = ["REGULAR", "COMPOSITION"];
const yearOptions = ["2022-2023", "2023-2024", "2024-2025"];
const RegularfrequencyOptions = ["All", "MONTHLY", "QUARTERLY"];
const CompositionfrequencyOptions = ["QUARTERLY"];
const AnnualfrequencyOptions = ["MONTHLY", "QUARTERLY", "ANNUAL"];
const quarterOptions = [
  "Q1 (April to June)",
  "Q2 (July to September)",
  "Q3 (October to December)",
  "Q4 (January to March)",
];

const companyOptions = clients.map((client) => client.subname || client.name);

const ClientDetail = ({ title = "Regular", tabs = [], defaultTab = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [clientData, setClientData] = useState(location.state?.client || null);
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [filters, setFilters] = useState({
    returnType: title.toUpperCase(),
    year: "2023-2024",
    frequency: "All",
    month: "NOVEMBER",
    quarter: quarterOptions[0],
    company: "",
  });

  useEffect(() => {
    if (!clientData && id) {
      const found = clients.find((c) => String(c.id) === String(id));
      if (found) setClientData(found);
    }
  }, [clientData, id]);

  useEffect(() => {
    if (clientData) {
      setFilters((prev) => ({
        ...prev,
        company: clientData.subname || "",
        month: clientData.month || "NOVEMBER",
        year: clientData.financialYear || "2023-2024",
        frequency: clientData.frequency || "MONTHLY",
      }));
      setSelectedCompany(clientData.subname || "");
    }
  }, [clientData]);

  useEffect(() => {
    if (filters.frequency === "ANNUAL") {
      setActiveTab(filters.returnType === "COMPOSITION" ? "GSTR-4" : "GSTR-9");
    } else {
      setActiveTab(tabs[0]);
    }
  }, [filters.frequency, filters.returnType, tabs]);

  useEffect(() => {
    if (filters.company) {
      const found = clients.find(
        (client) =>
          client.subname === filters.company || client.name === filters.company
      );
      if (found) setClientData(found);
    }
  }, [filters.company]);

  const handleFilterChange = (field, value) => {
    if (field === "company") setSelectedCompany(value);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const getFilteredTabs = () => {
    if (filters.frequency === "ANNUAL") {
      return filters.returnType === "COMPOSITION"
        ? ["GSTR-4", "GSTR-9A"]
        : ["GSTR-9", "GSTR-9C"];
    }
    return tabs;
  };

  const ActiveComponent = tabComponents[activeTab] || null;

  if (!clientData) {
    return (
      <div className="text-center p-4">
        <h4>No client data available.</h4>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          ← Back to List
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="client-detail p-4">
        <PageHeader
          title={title}
          parentTitle="Return"
          parentLink="/dashboard/home"
          gstClint={selectedCompany || clientData.name}
        />

        <div className="details-dropdown d-flex flex-wrap justify-content-center mb-3 gap-2">
          {title === "Annual" ? (
            <>
              <ToggleSelect
                label="Return Type"
                options={returnTypeOptions}
                value={filters.returnType}
                onChange={(val) => handleFilterChange("returnType", val)}
              />
              <ToggleSelect
                label="Year"
                options={yearOptions}
                value={filters.year}
                onChange={(val) => handleFilterChange("year", val)}
              />
              <ToggleSelect
                label="Company"
                options={companyOptions}
                value={filters.company}
                onChange={(val) => handleFilterChange("company", val)}
              />
            </>
          ) : (
            <>
              <ToggleSelect
                label="Return Type"
                options={returnTypeOptions}
                value={filters.returnType}
                onChange={(val) => handleFilterChange("returnType", val)}
                disabled
              />
              <ToggleSelect
                label="Year"
                options={yearOptions}
                value={filters.year}
                onChange={(val) => handleFilterChange("year", val)}
              />
              <ToggleSelect
                label="Frequency"
                options={
                  title === "Regular"
                    ? RegularfrequencyOptions
                    : title === "Composition"
                    ? CompositionfrequencyOptions
                    : AnnualfrequencyOptions
                }
                value={filters.frequency}
                onChange={(val) => handleFilterChange("frequency", val)}
              />
              {filters.frequency === "QUARTERLY" && (
                <ToggleSelect
                  label="Quarter"
                  options={quarterOptions}
                  value={filters.quarter}
                  onChange={(val) => handleFilterChange("quarter", val)}
                />
              )}
              <ToggleSelect
                label="Company"
                options={companyOptions}
                value={filters.company}
                onChange={(val) => handleFilterChange("company", val)}
              />
            </>
          )}
        </div>

        <Tabs
          tabs={getFilteredTabs()}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        {ActiveComponent ? (
          <ActiveComponent filters={filters} clientData={clientData} />
        ) : (
          <div className="coming-soon text-center p-5">
            <h4>{activeTab} is coming soon!</h4>
            <p>We're working on this return type. Please check back later.</p>
          </div>
        )}

        {activeTab !== "GSTR-4A" && <BottomBar tab={activeTab} />}
      </div>
      <div>{activeTab === "GSTR-4A" && <Footer />}</div>
    </>
  );
};

export default ClientDetail;
