import React, { useMemo } from "react";
// import StatCard from "../../components/StatCard";
// import { statsData, tableData } from "../../dummyData/dummyData";
// import DataTable from "../../components/DataTable";
import "../../assets/css/Dashboard.css";
import PageHeader from "../../components/pageHeader";
const versionData = [
  {
    release: "Release 1.0.25",
    date: "17-08-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-2B",
        description:
          "Improved functionality in GSTR-2B compare data to identify mismatch data and see Portal value with respect to that mismatch value.",
      },
    ],
  },
  {
    release: "Release 1.0.24",
    date: "16-08-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-2B",
        description:
          "Added functionality to compare to show GSTR-2B input credit summary and section wise Books data processed and pending summary.",
      },
    ],
  },
  {
    release: "Release 1.0.24",
    date: "13-08-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-2B",
        description:
          "Added functionality to compare GSTR-2B Books data with portal data.",
      },
    ],
  },
  {
    release: "Release 1.0.23",
    date: "06-08-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-2B",
        description:
          "Re-designed GSTR-2B and separated functionalities as per usage.",
      },
      {
        no: 2,
        section: "GSTR-2B",
        description:
          "Added functionality to import GSTR-2B Books data into the software.",
      },
    ],
  },
  {
    release: "Release 1.0.22",
    date: "01-08-2022",
    entries: [
      {
        no: 1,
        section: "Client",
        description:
          "Added functionality to enable/disable client in my clients.",
      },
    ],
  },
  {
    release: "Release 1.0.22",
    date: "30-07-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-1",
        description: "Added functionality in GSTR-1 to reset invoice data.",
      },
    ],
  },
  {
    release: "Release 1.0.21",
    date: "28-07-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-1",
        description:
          "Bugs fixed in GSTR-1 multi rated invoices during Excel import.",
      },
    ],
  },
  {
    release: "Release 1.0.20",
    date: "27-07-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-1",
        description: "Bugs fixed in GSTR-1 edit and delete invoice Fixed.",
      },
    ],
  },
  {
    release: "Release 1.0.19",
    date: "25-07-2022",
    entries: [
      {
        no: 1,
        section: "GSTR-1",
        description:
          "Added functionality to view and download GSTR-1 return or uploaded JSON file.",
      },
    ],
  },
];

const Dashboard = () => {
  // const columns = useMemo(() => [
  //   { Header: "ID", accessor: "id" },
  //   { Header: "Name", accessor: "name" },
  //   { Header: "Email", accessor: "email" },
  //   { Header: "Role", accessor: "role" },
  // ], []);

  return (
    <>
      <PageHeader
        title="Analytics"
        parentTitle="Dashboards"
        parentLink="/dashboard/home"
      />

      <div className="version-history-container">
        <h2 className="table-title">Version History</h2>
        <table className="version-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Section</th>
              <th className="description">Description</th>
            </tr>
          </thead>
          <tbody>
            {versionData.map((release, releaseIndex) => (
              <>
                {/* Single row for the release title and date */}
                <tr key={`release-${releaseIndex}`}>
                  <td
                    colSpan="3"
                    style={{ color: "#d21a1a", fontWeight: "bold" }}
                  >
                    {release.release} (Date: {release.date})
                  </td>
                </tr>

                {/* Standard rows for each entry */}
                {release.entries.map((entry, entryIndex) => (
                  <tr key={`${releaseIndex}-${entryIndex}`}>
                    <td className="td-align">{entry.no}</td>
                    <td className="td-align">{entry.section}</td>
                    <td>{entry.description}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>

          {/* <tbody>
          {versionData.map((release, releaseIndex) =>
            release.entries.map((entry, entryIndex) => (
              
              <tr key={`${releaseIndex}-${entryIndex}`}>
                <td>{entry.no}</td>
                <td>{entry.section}</td>
                
                <td>
                  <strong style={{ color: "#d21a1a" }}>{release.release} (Date: {release.date})</strong>
                  <br />
                  {entry.description}
                </td>
              </tr>
            ))
          )}
        </tbody> */}
        </table>
      </div>
    </>
    // <div className="ml-64 p-6 space-y-6 bg-gray-50 min-h-screen text-gray-800">
    //   <div className="row">
    //          {statsData.map((stat, i) => (
    //         <div className="col-lg-3">
    //             <StatCard key={i} {...stat}  />
    //         </div>
    //     ))}
    //     </div>
    //     <div className=" p-6 rounded-xl shadow-md mt-6">
    //       <DataTable columns={columns} data={tableData} />
    //     </div>
    // </div>
  );
};

export default Dashboard;
