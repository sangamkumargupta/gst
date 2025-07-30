import React from "react";

const GSTR2A = () => {
  const combinedData = [
    {
      gstin: "18AAACMO0092P1Z6",
      name: "MICROTEK INTERNATIONAL PRIVATE LIMITED",
      invoiceNumber: "IN1011000920",
      invoiceType: "R",
      invoiceDate: "14-06-2025",
      invoiceValue: "114376.08",
      place: "Manipur",
      reverseCharge: "N",
      rate: "12",
      taxableValue: "102121.5",
      integratedTax: "12254.58",
      centralTax: "0",
      stateTax: "0",
      cess: "0",
      gstr1FilingStatus: "Y",
      gstr1FilingDate: "09-Jul-25",
      gstr1FilingPeriod: "Jun-25",
      gstr3bFilingStatus: "N",
      amendment: "",
      amendedPeriod: "",
      cancellation: "",
      source: "",
      irn: "",
      irnDate: "",
    },
    {
      gstin: "18AAACMO0092P1Z6",
      name: "MICROTEK INTERNATION",
      invoiceNumber: "IN1011001143",
      invoiceType: "R",
      invoiceDate: "30-06-2025",
      invoiceValue: "129265.49",
      place: "Manipur",
      reverseCharge: "N",
      rate: "12",
      taxableValue: "115415.62",
      integratedTax: "13849.87",
      centralTax: "0",
      stateTax: "0",
      cess: "0",
      gstr1FilingStatus: "Y",
      gstr1FilingDate: "09-Jul-25",
      gstr1FilingPeriod: "Jun-25",
      gstr3bFilingStatus: "Y",
      amendment: "N",
      amendedPeriod: "",
      cancellation: "",
      source: "",
      irn: "",
      irnDate: "",
    },
    {
      gstin: "19AIFPA2207C1Z1",
      name: "BHASKAR ARYA",
      invoiceNumber: "PG/25-26/648",
      invoiceType: "R",
      invoiceDate: "04-06-2025",
      invoiceValue: "289123",
      place: "Manipur",
      reverseCharge: "N",
      rate: "18",
      taxableValue: "245019.2",
      integratedTax: "44103.45",
      centralTax: "0",
      stateTax: "0",
      cess: "0",
      gstr1FilingStatus: "Y",
      gstr1FilingDate: "09-Jul-25",
      gstr1FilingPeriod: "Jun-25",
      gstr3bFilingStatus: "Y",
      amendment: "N",
      amendedPeriod: "",
      cancellation: "",
      source: "E-Invoice",
      irn: "785a5ef7S",
      irnDate: "04-06-2025",
    },
  ];

  return (
    <div
      className="gstr2a-container"
      // style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <div className="gstr2a-header d-flex align-items-center p-2 background  " style={{background :'#b94eed',color:'white'}}>
        <img src="/image.png" alt="Logo" className="gstr2a-logo" />
        <h4 className="flex-grow-1 text-center mb-0">GSTR-2A Report</h4>
      </div>

      <div className="table-responsive gstr2a-table-wrapper mt-3">
        <table
          className="table table-bordered table-hover gstr2a-table"
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
                Trade/Legal name of the Supplier
              </th>
              <th
                colSpan="4"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Invoice details
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
                Rate (%)
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
                colSpan="3"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                GSTR-1/IFF/GSTR-1A/5 Filing Status
              </th>
              <th
                colSpan="3"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                GSTR-3B Filing Status
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Amendment made, if any
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Tax Period in which Amended
              </th>
              <th
                rowSpan="2"
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Effective date of cancellation
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
                IRN date
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
                Invoice Value (₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Integrated Tax (₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Central Tax (₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                State/UT tax (₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Cess (₹)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Status
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Filing Date
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Filing Period
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Status
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Filing Date
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Filing Period
              </th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((row, index) => (
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
                  {row.rate}
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
                  {row.gstr1FilingStatus}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.gstr1FilingDate}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.gstr1FilingPeriod}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.gstr3bFilingStatus}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.amendment}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.amendedPeriod}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.cancellation}
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

export default GSTR2A;
