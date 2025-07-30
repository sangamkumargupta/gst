// components/DynamicFormTable.jsx
import React from "react";
import TableActionButton from "./TableActionButton";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const DynamicFormTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="table-responsive mt-3 client-table-regular">
      <table className="table table-bordered">
        <thead className="text-center">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.name]}</td>
                ))}
                <td className="d-flex">
                  <TableActionButton
                    icon={FaPencilAlt}
                    type="edit"
                    title="Edit"
                    onClick={() => onEdit(rowIndex)}
                  />
                  &nbsp;
                  <TableActionButton
                    icon={FaTrash}
                    type="delete"
                    title="Delete"
                    onClick={() => onDelete(rowIndex)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicFormTable;
