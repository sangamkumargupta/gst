import React from "react";
import StatusBadge from "./StatusBadge";

const ClientRow = React.memo(({ client, onClick }) => (
  <>
    <tr onClick={() => onClick(client)} style={{ cursor: "pointer" }}>
      <td>{client.id}</td>
      <td>
        <div className="client-name">{client.name}</div>
        <div className="client-subname">{client.subname}</div>
      </td>
      <td>
        <div>{client.gstin}</div>
        <div className="client-type">{client.type}</div>
      </td>
      <td>{client.date || "-"}</td>
      {client.status.slice(0, 4).map((status, i) => (
        <td key={i}>
          <StatusBadge value={status} />
        </td>
      ))}
    </tr>
  </>
));

export default ClientRow;
