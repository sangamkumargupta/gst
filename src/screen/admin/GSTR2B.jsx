import React from "react";

const GSTR2B = () => {
  // Sample data from your Excel sheet
  const b2bData = [
    {
      gstin: "14AAACC2498P4Z7",
      name: "Central Bank of India",
      invoiceNumber: "26141C0000015574",
      invoiceType: "Regular",
      invoiceDate: "31/05/2025",
      invoiceValue: "238.36",
      place: "Manipur",
      reverseCharge: "No",
      taxableValue: "202",
      integratedTax: "0",
      centralTax: "18.18",
      stateTax: "18.18",
      cess: "0",
      period: "May'25",
      filingDate: "11/06/2025",
      itcAvailability: "Yes",
      applicableRate: "100%",
      source: "",
      irn: "",
      irnDate: "",
    },
    {
      gstin: "18AAACE6641E1ZU",
      name: "M/S. EXIDE INDUSTRIES LTD.",
      invoiceNumber: "1114162170",
      invoiceType: "Regular",
      invoiceDate: "31/05/2025",
      invoiceValue: "14297.57",
      place: "Manipur",
      reverseCharge: "No",
      taxableValue: "11169.57",
      integratedTax: "3128",
      centralTax: "0",
      stateTax: "0",
      cess: "0",
      period: "May'25",
      filingDate: "06/06/2025",
      itcAvailability: "Yes",
      applicableRate: "100%",
      source: "E-Invoice",
      irn: "6246f9e1c96cb3baba3dfba181052e0dd70e8d694a5c0f6239e932afa8937454",
      irnDate: "31/05/2025",
    },
  ];

  return (
    <div
      className="gstr2b-container"
      // style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <div className="gstr2a-header d-flex align-items-center p-2 background  " style={{background :'#b94eed',color:'white'}} >
        <img src="/image.png" alt="Logo" className="gstr2a-logo" />
        <h4 className="flex-grow-1 text-center mb-0">GSTR-2B Report</h4>
      </div>

      <div className="table-responsive mt-3" style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                GSTIN of supplier
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Trade/Legal name
              </th>
              <th
                colSpan="4"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Invoice Details
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Place of supply
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Supply Attract Reverse Charge
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Taxable Value (₹)
              </th>
              <th
                colSpan="4"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Tax Amount
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                GSTR-1/IFF/GSTR-5 Period
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                GSTR-1/IFF/GSTR-5 Filing Date
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                ITC Availability
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Reason
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Applicable % of Tax Rate
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Source
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                IRN
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                IRN Date
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Invoice number
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Invoice type
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Invoice Date
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Invoice Value(₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Integrated Tax(₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Central Tax(₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                State/UT Tax(₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Cess(₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {b2bData.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.gstin}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.name}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.invoiceNumber}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.invoiceType}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.invoiceDate}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.invoiceValue}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.place}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.reverseCharge}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.taxableValue}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.integratedTax}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.centralTax}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.stateTax}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.cess}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.period}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.filingDate}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.itcAvailability}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                ></td>{" "}
                {/* Empty for Reason */}
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.applicableRate}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.source}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.irn}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.irnDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GSTR2B;
