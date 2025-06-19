import React, { useState, useMemo } from "react";
import "../assets/css/DataTable.css";

const DataTable = ({
  data,
  columns = [],
  itemsPerPage = 5, 
  fetchError = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filtered data: search across all fields
  const filteredList = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

  return (
    <div className="bg-white shadow-sm p-3 rounded">
      {/* 🔍 Search Input */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* 🧾 Table */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="">
            <tr>
              <th>#</th>
              {columns.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((item, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.Cell
                      ? col.Cell({ row: item, rowIndex: index })
                      : item[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
            {filteredList.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center text-danger"
                >
                  {fetchError
                    ? "Error fetching data. Please try again later."
                    : "No matching data found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ⬅️ Pagination */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default DataTable;
