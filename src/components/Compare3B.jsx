import React, { useEffect, useRef } from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ReusableTableSection = ({
  title,
  headers,
  rows,
  keys,
  subheadingsLeft,
  subheadingsRight,
}) => {
  return (
    <>
      <thead>
        <tr className="  fw-semibold text-primary text-center">
          <th colSpan="2" className="purple_btnpurple">
            {subheadingsLeft[title] || title}
          </th>
          {headers.includes("Diff") ? (
            <>
              <th className="purple_btnpurple" colSpan="4 ">
                {subheadingsRight[title] || ""}
              </th>
              <th className="purple_btnpurple" colSpan="2">
                Difference
              </th>
            </>
          ) : (
            <th colSpan="">{subheadingsRight[title] || ""}</th>
          )}
        </tr>
        <tr className="table-secondary text-center">
          {headers.map((col, idx) => {
            console.log(headers);
            if (headers.length === 5) {
              if (col === "Gross") {
                return (
                  <th key={idx} colSpan={5}>
                    {col}
                  </th>
                );
              } else if (col !== "Diff") {
                return <th key={idx}>{col}</th>;
              }
            } else {
              if (col === "Diff") {
                return (
                  <th
                    key={idx}
                    colSpan={2}
                    className="text-danger text-center"
                  ></th>
                );
              }
              if (headers[idx - 1] === "Diff") return null;
              return <th key={idx}>{col}</th>;
            }
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {keys.map((key, kIdx) => {
              const isDiff = key === "difference";
              return isDiff ? (
                <td key={kIdx} colSpan={2} className="text-center fw-bold">
                  {typeof row[key] === "number"
                    ? row[key].toFixed(2)
                    : row[key]}
                </td>
              ) : (
                <td key={kIdx} className="text-center">
                  {typeof row[key] === "number"
                    ? row[key].toFixed(2)
                    : row[key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </>
  );
};

const Compare3B = ({ show, handleClose }) => {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      if (show) {
        bsModalRef.current = new bootstrap.Modal(modalRef.current, {
          backdrop: "static",
          keyboard: false,
        });
        bsModalRef.current.show();
      } else {
        bsModalRef.current?.hide();
      }

      const handleHidden = () => {
        handleClose();
      };

      modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

      return () => {
        modalRef.current?.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, [show]);

  const dataSections = [
    {
      title: "1(a) Tax On Outward Supplies",
      data: "outward",
      headers: [
        "Particular",
        "Amount",
        "Original",
        "Amended",
        "Effect",
        "Gross",
        "Diff",
      ],
      keys: [
        "particular",
        "gstr3b",
        "original",
        "amended",
        "effect",
        "gross",
        "difference",
      ],
    },
    {
      title: "1(b) Zero rated",
      data: "zeroRated",
      headers: [
        "Particular",
        "Amount",
        "Original",
        "Amended",
        "Effect",
        "Gross",
        "Diff",
      ],
      keys: [
        "particular",
        "gstr3b",
        "original",
        "amended",
        "effect",
        "gross",
        "difference",
      ],
    },
    {
      title: "1(c) Nil rated, Exempted & Non-GST",
      data: "nilRated",
      headers: ["Particular", "Amount", "Gross", "Diff", ""],
      keys: ["particular", "gross", "difference"],
    },
    {
      title: "2. Inter State Supplies",
      data: "interState",
      headers: [
        "Particular",
        "Total Taxable",
        "IGST (3B)",
        "Taxable (1)",
        "IGST (1)",
        "Taxable (2)",
        "IGST (2)",
        "Diff",
      ],
      keys: [
        "particular",
        "totalTaxable",
        "igst3b",
        "taxable1",
        "igst1",
        "taxable2",
        "igst2",
        "difference",
      ],
    },
  ];

  const dataset = {
    outward: [
      {
        particular: "Total Taxable Value",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
      {
        particular: "Total Tax Liability",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
      {
        particular: "IGST",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
      {
        particular: "CESS",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
    ],
    zeroRated: [
      {
        particular: "Total Taxable Value",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
      {
        particular: "Total Tax Liability",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
      {
        particular: "IGST",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
      {
        particular: "CESS",
        gstr3b: 0,
        original: 0,
        amended: 0,
        effect: 0,
        gross: 0,
        difference: 0,
      },
    ],
    nilRated: [{ particular: "Total Taxable Value", gross: 0, difference: 0 }],
    interState: [
      {
        particular: "Unregistered",
        totalTaxable: 3000,
        igst3b: 540,
        taxable1: 1500,
        igst1: 270,
        taxable2: 1500,
        igst2: 270,
        difference: 0,
      },
      {
        particular: "Composition",
        totalTaxable: 0,
        igst3b: 0,
        taxable1: 0,
        igst1: 0,
        taxable2: 0,
        igst2: 0,
        difference: 0,
      },
      {
        particular: "UIN",
        totalTaxable: 0,
        igst3b: 0,
        taxable1: 0,
        igst1: 0,
        taxable2: 0,
        igst2: 0,
        difference: 0,
      },
      {
        particular: "Total",
        totalTaxable: 3000,
        igst3b: 540,
        taxable1: 1500,
        igst1: 270,
        taxable2: 1500,
        igst2: 270,
        difference: 0,
      },
    ],
  };

  const subheadingsLeft = {
    "1(a) Tax On Outward Supplies": "1(a) Tax On Outward Supplies",
    "1(b) Zero rated": "1(b) Zero Rated",

    "1(c) Nil rated, Exempted & Non-GST": "1(c) Nil rated, Exempted & Non-GST",
    "2. Inter State Supplies": "2. Inter State Supplies",
  };

  const subheadingsRight = {
    "1(a) Tax On Outward Supplies": "1(a) B2B + SEZ + B2CS + B2CL",
    "1(b) Zero rated": "1(b) Export + Supplies to SEZ",

    "1(c) Nil rated, Exempted & Non-GST": "1(c) Nil Rated",
    "2. Inter State Supplies": "2. Inter State Supplies",
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div
        className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down mt-3"
        style={{ maxWidth: "75vw", width: "95vw" }}
      >
        <div className="modal-content  modal-container  modal-container rounded-3">
          <div className="modal-header background text-white">
            <h5 className="modal-title">Compare R1 vs 3B</h5>
          </div>
          <div
            className="modal-body"
            style={{
              fontSize: "0.85rem",
              overflowX: "auto",
              maxHeight: "75vh",
              overflowY: "auto",
            }}
          >
            <div className="table-responsive p-4">
              <table className="table table-bordered table-sm text-center">
                <thead>
                  <tr className="bg-primary text-white">
                    <th colSpan={2} className="text-center align-middle">
                      GSTR-3B
                    </th>
                    <th colSpan="7" className="text-center align-middle">
                      GSTR-1
                    </th>
                  </tr>
                </thead>
                {dataSections.map((section) => (
                  <ReusableTableSection
                    key={section.title}
                    title={section.title}
                    headers={section.headers}
                    rows={dataset[section.data]}
                    keys={section.keys}
                    subheadingsLeft={subheadingsLeft}
                    subheadingsRight={subheadingsRight}
                  />
                ))}
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn redbtn btn-sm"
              onClick={() => bsModalRef.current?.hide()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare3B;
