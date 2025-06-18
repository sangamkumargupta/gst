import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaEdit,
} from "react-icons/fa";
import PageHeader from "../../components/pageHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/profile.css';

const ProfileCard = () => {
  return (
    <>
    <PageHeader
        title="Profile"
        parentTitle="Dashboard"
        parentLink="/dashboard"
      />
    <div className="container  ">
      <div className="row">
        {/* Left Column */}
        <div className="col-12 col-md-8">
          {/* Personal Info */}
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              {/* <h5 className="mb-0">Personal</h5> */}
              <a href="#" className="mb-0">Personal</a>
              <FaEdit className="edit-color" role="button"/> 
            </div>
            <div className="card-body row g-3">
              <div className="col-md-4">
                <label className="form-label">First Name</label>
                <input className="form-control" disabled value="SANGAM" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Middle Name</label>
                <input className="form-control" disabled value="" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Last Name</label>
                <input className="form-control" disabled value="KUMAR" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input className="form-control" disabled value="SANGAMKUMARGUPTA@GMAIL.COM" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input className="form-control" disabled value="8271166949" />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="card mb-4 ">
            <div className="card-header d-flex justify-content-between align-items-center">
              {/* <h5 className="mb-0">Billing Address</h5> */}
              <a href="#  " className="mb-0">Billing Address</a>
              <FaEdit className="edit-color" role="button"/> 
            </div>
            <div className="card-body row g-3 ">
              <div className="col-md-4">
                <label className="form-label">Flat / Plot No</label>
                <input className="form-control" disabled value="K-137" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Street</label>
                <input className="form-control" disabled value="RAMBLE ROAD" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Landmark</label>
                <input className="form-control" disabled value="SIV MANDIR" />
              </div>
              <div className="col-md-4">
                <label className="form-label">City / Village</label>
                <input className="form-control" disabled value="Ajmer" />
              </div>
              <div className="col-md-4">
                <label className="form-label">District</label>
                <input className="form-control" disabled value="AJMER" />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-control" disabled value="RAJASTHAN" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input className="form-control" disabled value="INDIA" />
              </div>
              <div className="col-md-6">
                <label className="form-label">PIN Code</label>
                <input className="form-control" disabled value="305001" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              {/* <h5 className="mb-0">Company Details (if any)</h5> */}
              <a href="#" className="mb-0">Company Details (if any)</a>
              <FaEdit className="edit-color" role="button"/> 
            </div>
            <div className="card-body row g-3">
              <div className="col-md-4">
                <label className="form-label">Flat / Plot No</label>
                <input className="form-control" disabled value="FLAT/PLOT NO" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Street</label>
                <input className="form-control" disabled value="STREET" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Landmark</label>
                <input className="form-control" disabled value="LANDMARK" />
              </div>
              <div className="col-md-4">
                <label className="form-label">City / Village</label>
                <input className="form-control" disabled value="YOUR CITY" />
              </div>
              <div className="col-md-4">
                <label className="form-label">District</label>
                <input className="form-control" disabled value="DISTRICT" />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-control" disabled value="STATE" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input className="form-control" disabled value="INDIA" />
              </div>
              <div className="col-md-6">
                <label className="form-label">PIN Code</label>
                <input className="form-control" disabled value="PIN CODE" />
              </div>
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
              <input className="form-control mb-2" disabled value="Standard" />
              <label className="form-label">Expires on</label>
              <input className="form-control mb-3" disabled value="31-03-2023" />
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
              <input className="form-control mb-2" type="password" value="sangam@123" placeholder="Old Password" />
              <label className="form-label">New Password</label>
              <input className="form-control mb-2" type="password" placeholder="New Password" />
              <label className="form-label">Confirm Password</label>
              <input className="form-control mb-3" type="password" placeholder="Confirm Password" />
              <button className="btn btn-success w-100">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileCard;
