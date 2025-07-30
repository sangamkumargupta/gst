// ✅ pages/Regular/ClientDetailRegular.jsx
import React from "react";
import ClientDetail from "./ClientDetail";

const tabs = ["GSTR 1", "GSTR 3B", "GSTR 2A", "GSTR 2B"];

const ClientDetailAnnual = () => {
  return (
    <>
      <ClientDetail title="Annual" tabs={tabs} defaultTab="GSTR 9" />;
    </>
  );
}; 
export default ClientDetailAnnual;
