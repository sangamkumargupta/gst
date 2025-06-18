import React, { useState, useRef, useEffect } from "react";
import "../assets/css/header.css";
import { FaBars, FaSearch, FaCog ,FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarOpen, setSidebarOpen, menuButtonRef }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  // Close submenu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 🔒 Clear login state
    navigate("/"); // ⛔ Redirect to login
  };

  return (
    <div
      className={`header border-bottom ${sidebarOpen ? "with-sidebar" : ""}`}
    >
      <div className="left-section">
        <FaBars
          ref={menuButtonRef}
          onClick={toggleSidebar}
          style={{ cursor: "pointer", color: "#6f778e" }}
        />

        <div className="search-box" style={{ background: "#f7f8f9" }}>
          <input type="text" placeholder="Search for Results..." />
          <FaSearch />
        </div>
      </div>

      <div className="right-section">
        <div
          className="profile-section"
          onClick={toggleSubmenu}
          ref={profileRef}
        >
          <FaCog size={18} style={{ color: "#c7cad3" }} />

          {submenuOpen && (
            <div className="profile-submenu">
               <div className="profile-btn   " onClick={handleLogout}>
               <i class="bi bi-person fs-18 me-2 op-7"></i> Profile
                {/* <div href="" data-rr-ui-dropdown-item="" class="d-flex align-items-center dropdown-item"><i class="bi bi-box-arrow-right fs-18 me-2 op-7"></i>Log Out</div> */}
               </div>
               <div className="logout-btn" onClick={handleLogout}> 
                <i class="bi bi-box-arrow-right fs-18 me-2 op-7"></i>Log Out
                
               </div>
              {/* <button className="logout-btn " onClick={handleLogout}>
                
              </button> &nbsp;
              <button className="logout-btn " onClick={handleLogout}>
                Logout
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
