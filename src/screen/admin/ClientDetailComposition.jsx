
// ✅ pages/Composition/ClientDetailComposition.jsx
import React from "react";
import ClientDetail from "./ClientDetail";

const tabs = [" CMP 08", "GSTR 4", "GSTR 2A", "GSTR 2B"];

const ClientDetailComposition = () => {
  return ( 
      <ClientDetail title="Composition" tabs={tabs} defaultTab="CMP 08" />  
  );  
};

export default ClientDetailComposition;