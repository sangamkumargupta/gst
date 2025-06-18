import React, { useState, useEffect } from "react";
import "../../assets/css/taxpayer.css";
import PageHeader from "../../components/pageHeader";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dummyData = [
  { 
    gstin: "27ABCDE1234F1Z5",
    legalName: "ABC TRADERS PRIVATE LIMITED",
    tradeName: "ABC TRADERS",
    registrationDate: "2020-01-15",
    constitution: "Private Limited Company",
    gstinStatus: "Active",
    taxpayerType: "Regular",
    aadhaarAuthenticated: "Yes",
    ekycVerified: "Yes",
    adminOffice: "No",
    otherOffice: "Yes",
    principalPlaceOfBusiness: "Mumbai, Maharashtra",
    coreBusinessActivity: "Retail Business",
    businessActivities: ["Retail", "Wholesale", "Export"],
  },
  {
    gstin: "29XYZINF5678L1Z2",
    legalName: "XYZ INFOTECH SOLUTIONS LLP",
    tradeName: "XYZ INFOTECH",
    registrationDate: "2019-05-20",
    constitution: "LLP",
    gstinStatus: "Active",
    taxpayerType: "Regular",
    aadhaarAuthenticated: "Yes",
    ekycVerified: "No",
    adminOffice: "Yes",
    otherOffice: "No",
    principalPlaceOfBusiness: "Bengaluru, Karnataka",
    coreBusinessActivity: "Software Development",
    businessActivities: ["Software", "Consulting"],
  },
  {
    gstin: "07GREEN7890M1Z9",
    legalName: "GREEN EARTH AGRI PRODUCE PVT LTD",
    tradeName: "Green Earth",
    registrationDate: "2021-03-10",
    constitution: "Private Limited Company",
    gstinStatus: "Active",
    taxpayerType: "Composition",
    aadhaarAuthenticated: "Yes",
    ekycVerified: "Yes",
    adminOffice: "Yes",
    otherOffice: "Yes",
    principalPlaceOfBusiness: "Ahmedabad, Gujarat",
    coreBusinessActivity: "Agriculture Produce",
    businessActivities: ["Farming", "Distribution"],
  },
  {
    gstin: "33TECH1234K1Z8",
    legalName: "TECHTRONICS INDIA",
    tradeName: "TECH INDIA",
    registrationDate: "2018-07-01",
    constitution: "Proprietorship",
    gstinStatus: "Active",
    taxpayerType: "Regular",
    aadhaarAuthenticated: "No",
    ekycVerified: "No",
    adminOffice: "Yes",
    otherOffice: "No",
    principalPlaceOfBusiness: "Chennai, Tamil Nadu",
    coreBusinessActivity: "Electronics Distribution",
    businessActivities: ["Wholesale", "Retail"],
  },
  {
    gstin: "19FOOD9999F1Z0",
    legalName: "FINE FOODS & BEVERAGES",
    tradeName: "Fine Foods",
    registrationDate: "2022-11-12",
    constitution: "Partnership",
    gstinStatus: "Active",
    taxpayerType: "Composition",
    aadhaarAuthenticated: "Yes",
    ekycVerified: "Yes",
    adminOffice: "Yes",
    otherOffice: "Yes",
    principalPlaceOfBusiness: "Kolkata, West Bengal",
    coreBusinessActivity: "Food & Beverage Services",
    businessActivities: ["Restaurant", "Catering", "Beverage Supply"],
  },
];

const Taxpayer = () => {
  const [gstin, setGstin] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

//   const handleSearch = () => {
//   if (captcha.toUpperCase() !== captchaText) {
//     toast.error("❌ Invalid Captcha");
//     setResult(null);
//     generateCaptcha();
//     return;
//   }

//   const match = dummyData.find((item) => item.gstin === gstin.trim());
//   if (!match) {
//     toast.error("❌ No matching GSTIN found");
//     setResult(null);
//   }  
// };

const handleSearch = () => {
    if (captcha.toUpperCase() !== captchaText) {
       toast.error("❌ Invalid Captcha");
      setResult(null);
      generateCaptcha(); // Refresh captcha
      return;
    }

    const match = dummyData.find((item) => item.gstin === gstin.trim());
    if (!match) {
      setError("❌ No matching GSTIN found");
      setResult(null);
    } else {
      setError("");
      setResult(match);
    }
  };


  return (
    <>
      <PageHeader
        title="Search Tax Payer 27ABCDE1234F1Z5"
        parentTitle="Dashboards"
        parentLink="/dashboard/home"
      />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="taxpayer-container">
        <div className="form-section mt-2 ">
          <input
            type="text"
            placeholder="GSTIN/UIN of the Taxpayer"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
          <div className="captcha-container">
            <div className="captcha-box">
              {captchaText.split("").map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
            <button
              className="refresh-btn"
              onClick={generateCaptcha}
              title="Refresh Captcha"
            >
              <i class="fa-solid fa-rotate-right"></i>
            </button>
          </div>

          <button onClick={handleSearch} className="search"><i class="fa-solid fa-magnifying-glass"></i></button>
          {error && <p className="error-message">{error}</p>} 
        </div>

        {result && (
          <div className="taxpayer-table">
            <table>
              <tbody>
                <tr>
                  <th>Legal Name of Business</th>
                  <td>{result.legalName}</td>
                  <th>Trade Name</th>
                  <td>{result.tradeName}</td>
                  <th>Effective Registration Date</th>
                  <td>{result.registrationDate}</td>
                </tr>
                <tr>
                  <th>Constitution of Business</th>
                  <td>{result.constitution}</td>
                  <th>GSTIN / UNI Status</th>
                  <td>{result.gstin}</td>
                  <th>Taxpayer Type</th>
                  <td>{result.taxpayerType}</td>
                </tr>
                <tr>
                  <th>Administrative Office</th>
                  <td>{result.adminOffice}</td>
                  <th>Other Office</th>
                  <td>{result.otherOffice}</td>
                  <th>Principal Place of Business</th>
                  <td>{result.principalPlaceOfBusiness}</td>
                </tr>

                <tr>
                  <th>Whether Aadhaar Authenticated</th>
                  <td>{result.aadhaarAuthenticated}</td>

                  <th>Whether eKYC Verified</th>
                  <td>{result.ekycVerified}</td>
                </tr>
                <tr></tr>
              </tbody>
            </table>

            <div className="nature-section">
              <h4>Nature Core Business Activity</h4>
              <p>{result.coreBusinessActivity}</p>

              <h4>Nature Business Activities</h4>
              <ul>
                {result.businessActivities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Taxpayer;
