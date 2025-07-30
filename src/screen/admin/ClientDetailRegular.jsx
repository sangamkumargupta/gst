// ✅ pages/Regular/ClientDetailRegular.jsx
import React from "react";
import ClientDetail from "./ClientDetail";

const tabs = ["GSTR 1", "GSTR 3B", "GSTR 2A", "GSTR 2B"];

const ClientDetailRegular = () => {
  return (
    <>
      {/* <ClientDetail title="Regular" tabs={tabs} defaultTab="GSTR 1" />; */}
      <ClientDetail title="Regular" tabs={tabs} defaultTab="GSTR 1" />;
    </>
  );
};

export default ClientDetailRegular;
