import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// import "../../assets/css/profile.css";

const Profile = () => {
  const [editPersonal, setEditPersonal] = useState(false);
  const [editBilling, setEditBilling] = useState(false);
  const [editCompany, setEditCompany] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "SANGAM",
    middleName: "",
    lastName: "KUMAR",
    email: "SANGAMKUMARGUPTA@GMAIL.COM",
    mobile: "8271166949",
  });

  const [billingInfo, setBillingInfo] = useState({
    flatNo: "K-137",
    street: "RAMBLE ROAD",
    landmark: "SIV MANDIR",
    city: "Ajmer",
    district: "AJMER",
    state: "RAJASTHAN",
    country: "INDIA",
    pincode: "305001",
  });

  const [companyInfo, setCompanyInfo] = useState({
    flatNo: "FLAT/PLOT NO",
    street: "STREET",
    landmark: "LANDMARK",
    city: "YOUR CITY",
    district: "DISTRICT",
    state: "STATE",
    country: "INDIA",
    pincode: "PIN CODE",
  });

  const handleChange = (section, e) => {
    const { name, value } = e.target;
    if (section === "personal") {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    } else if (section === "billing") {
      setBillingInfo((prev) => ({ ...prev, [name]: value }));
    } else if (section === "company") {
      setCompanyInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = (section) => {
    if (section === "personal") {
      if (editPersonal) toast.success("Personal Info updated successfully!");
      else toast.info("Editing Personal Info");
      setEditPersonal(!editPersonal);
    } else if (section === "billing") {
      if (editBilling) toast.success("Billing Address updated successfully!");
      else toast.info("Editing Billing Address");
      setEditBilling(!editBilling);
    } else if (section === "company") {
      if (editCompany) toast.success("Company Info updated successfully!");
      else toast.info("Editing Company Info");
      setEditCompany(!editCompany);
    }
  };

  return (
    <>
      <PageHeader
        title="Profile"
        parentTitle="Dashboard"
        parentLink="/dashboard"
      />
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-12 col-md-8">
            {/* Personal Info */}
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <a href="#">Personal</a>
                {editPersonal ? (
                  <FaSave
                    className="edit-color"
                    role="button"
                    onClick={() => toggleEdit("personal")}
                  />
                ) : (
                  <FaEdit
                    className="edit-color"
                    role="button"
                    onClick={() => toggleEdit("personal")}
                  />
                )}
              </div>
              <div className="card-body row g-3">
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Middle Name", name: "middleName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Email", name: "email" },
                  { label: "Mobile", name: "mobile" },
                ].map((field, index) => (
                  <div
                    className={`col-md-${index < 3 ? 4 : 6}`}
                    key={field.name}
                  >
                    <label className="form-label">{field.label}</label>
                    <input
                      className="form-control"
                      name={field.name}
                      value={personalInfo[field.name]}
                      disabled={!editPersonal}
                      onChange={(e) => handleChange("personal", e)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Address */}
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <a href="#">Billing Address</a>
                {editBilling ? (
                  <FaSave
                    className="edit-color"
                    role="button"
                    onClick={() => toggleEdit("billing")}
                  />
                ) : (
                  <FaEdit
                    className="edit-color"
                    role="button"
                    onClick={() => toggleEdit("billing")}
                  />
                )}
              </div>
              <div className="card-body row g-3">
                {[
                  { label: "Flat / Plot No", name: "flatNo" },
                  { label: "Street", name: "street" },
                  { label: "Landmark", name: "landmark" },
                  { label: "City / Village", name: "city" },
                  { label: "District", name: "district" },
                  { label: "State", name: "state" },
                  { label: "Country", name: "country" },
                  { label: "PIN Code", name: "pincode" },
                ].map((field, index) => (
                  <div
                    className={`col-md-${index < 6 ? 4 : 6}`}
                    key={field.name}
                  >
                    <label className="form-label">{field.label}</label>
                    <input
                      className="form-control"
                      name={field.name}
                      value={billingInfo[field.name]}
                      disabled={!editBilling}
                      onChange={(e) => handleChange("billing", e)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Company Details */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <a href="#">Company Details (if any)</a>
                {editCompany ? (
                  <FaSave
                    className="edit-color"
                    role="button"
                    onClick={() => toggleEdit("company")}
                  />
                ) : (
                  <FaEdit
                    className="edit-color"
                    role="button"
                    onClick={() => toggleEdit("company")}
                  />
                )}
              </div>
              <div className="card-body row g-3">
                {[
                  { label: "Flat / Plot No", name: "flatNo" },
                  { label: "Street", name: "street" },
                  { label: "Landmark", name: "landmark" },
                  { label: "City / Village", name: "city" },
                  { label: "District", name: "district" },
                  { label: "State", name: "state" },
                  { label: "Country", name: "country" },
                  { label: "PIN Code", name: "pincode" },
                ].map((field, index) => (
                  <div
                    className={`col-md-${index < 6 ? 4 : 6}`}
                    key={field.name}
                  >
                    <label className="form-label">{field.label}</label>
                    <input
                      className="form-control"
                      name={field.name}
                      value={companyInfo[field.name]}
                      disabled={!editCompany}
                      onChange={(e) => handleChange("company", e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-12 col-md-4">
            {/* Account Details */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Account Details</h5>
              </div>
              <div className="card-body">
                <label className="form-label">Account Status</label>
                <input className="form-control mb-2" disabled value="Active" />
                <label className="form-label">Account Type</label>
                <input
                  className="form-control mb-2"
                  disabled
                  value="Standard"
                />
                <label className="form-label">Expires on</label>
                <input
                  className="form-control mb-3"
                  disabled
                  value="31-03-2023"
                />
                <button className="btn btn-view w-100">View</button>
              </div>
            </div>

            {/* Change Password */}
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Change Password</h5>
              </div>
              <div className="card-body">
                <label className="form-label">Old Password</label>
                <input
                  className="form-control mb-2"
                  type="password"
                  placeholder="Old Password"
                />
                <label className="form-label">New Password</label>
                <input
                  className="form-control mb-2"
                  type="password"
                  placeholder="New Password"
                />
                <label className="form-label">Confirm Password</label>
                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button className="btn btn-success w-100">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Profile;
