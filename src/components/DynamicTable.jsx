import React from "react";

const DynamicTable = ({
  headers = [],
  rows = [],
  actions = [], // Example: ['view', 'edit', 'delete']
  onAction = () => {},

  tableTag = {},
  theadTag = {},
  tbodyTag = {},
  tfootTag = {},
  trTag = {},
  thTag = {},
  tdTag = {},
  actionColors = {
    view: "#3498db",
    edit: "#2ecc71",
    delete: "#e74c3c",
  },
  actionBtnStyle = {},
}) => {
  const mergeStyles = (base, extra) => ({ ...base, ...(extra?.style || {}) });
  const getClassName = (tag) => (tag?.className ? tag.className : "");

  return (
    <div style={{"padding":"10px","border":"1px solid white","background":"white",
            boxShadow: "0 .125rem .25rem #0000000d",
            borderRadius :"10px"}}>

    <table {...tableTag} style={mergeStyles({}, tableTag)} className={getClassName(tableTag)}>
      <thead {...theadTag} className={getClassName(theadTag)}>
        <tr {...trTag} className={getClassName(trTag)}>
          {headers.map((head, index) => (
            <th
              key={index}
              rowSpan={head.rowSpan || 1}
              colSpan={head.colSpan || 1}
              style={mergeStyles({}, { ...thTag, ...head })}
              className={head.className || thTag.className}
              {...(head || {})}
            >
              {head.label}
            </th>
          ))}
          {actions.length > 0 && (
            <th style={mergeStyles({}, thTag)} className={thTag.className}>Actions</th>
          )}
        </tr>
      </thead>
      <tbody {...tbodyTag} className={getClassName(tbodyTag)}>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} {...trTag} className={getClassName(trTag)}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                rowSpan={cell.rowSpan || 1}
                colSpan={cell.colSpan || 1}
                style={mergeStyles({}, { ...tdTag, ...cell })}
                className={cell.className || tdTag.className}
                {...(cell || {})}
              >
                {cell.content}
              </td>
            ))}
            {actions.length > 0 && (
              <td style={mergeStyles({}, tdTag)} className={tdTag.className}>
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAction(action, rowIndex)}
                    style={{
                      marginRight: "6px",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      backgroundColor: actionColors[action] || "#666",
                      color: "#fff",
                      ...actionBtnStyle,
                    }}
                  >
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
      {/* {tfootTag?.enabled && (
        <tfoot {...tfootTag} className={getClassName(tfootTag)}>
          <tr {...trTag}>
            <td colSpan={headers.length + (actions.length > 0 ? 1 : 0)}>
              {tfootTag.content || "Footer"}
            </td>
          </tr>
        </tfoot>
      )} */}
    </table>
    </div>
  );
};

export default DynamicTable;
