import React from "react";
import DynamicTable from "../../components/DynamicTable"; 
import PageHeader from "../../components/pageHeader";
const headers = [
  { label: "Name", colSpan: 1 },
  { label: "Age", colSpan: 1 },
  { label: "Department", colSpan: 2 },
];

const rows = [
  [
    { content: "Alice" },
    { content: 28 },
    { content: "Engineering", colSpan: 2 },
  ],
  [
    { content: "Bob", rowSpan: 2 },
    { content: 30 },
    { content: "Design" },
    { content: "Remote" },
  ],
  [
    { content: 32 },
    { content: "Product" },
    { content: "On-site" },
  ],
];

const MyTablePage = () => {
  const handleAction = (action, rowIndex) => {
    alert(`${action.toUpperCase()} clicked for row ${rowIndex + 1}`);
  };

  return (
    <>
    <PageHeader
        title="Composition"
        parentTitle="return"
        parentLink="/return/composition"
      />
    <div className="text-center"> 
      Composition Page
      {/* <DynamicTable
        headers={headers}
        rows={rows}
        actions={["view", "edit", "delete"]}
        onAction={handleAction}
        tableTag={{
          style: {
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #ccc",
            fontFamily: "Arial",
          },
        }}
        theadTag={{
          style: {
            backgroundColor: "#2c3e50",
            color: "#fff !important", 
          },
        }}
        trTag={{
          style: {
            transition: "all 0.2s ease-in-out",
          },
        }}
        thTag={{
          style: {
            padding: "12px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            color:"white",
          },
        }}
        tdTag={{
          style: {
            padding: "12px",
            fontSize: "0.95rem",
            border: "1px solid #ddd",
            
            color:"black",
            textAlign :"center"
          },
        }}
        tfootTag={{
          enabled: true,
          style: { 
            textAlign:"center",
            backgroundColor: "#f1f1f1",
          }, 
          content: "This is the footer",
        }}
      />*/}
    </div> 
    </>
  );
};

export default MyTablePage;
