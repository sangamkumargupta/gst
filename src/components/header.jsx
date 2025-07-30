import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import SwitcherContent from "./SwitcherContent";
import "../assets/css/Header.css"; 

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  menuButtonRef,
  darkMode,
  toggleDarkMode,
  navStyle,
  setNavStyle,
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [direction, setDirection] = useState(
    document.documentElement.getAttribute("dir") || "ltr"
  );
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const profileRef = useRef(null);
  const notificationIconRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

  // Detect header height on mount
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Handle dark/light mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("darkmode");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Watch for direction change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newDir = document.documentElement.getAttribute("dir");
      setDirection(newDir);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });
    return () => observer.disconnect();
  }, []);

  // Fullscreen logic
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Click outside to close profile submenu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleNotificationClick = () => {
    if (notificationIconRef.current) {
      const rect = notificationIconRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 160,
      });
    }
    setShowNotificationModal(true);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };

  const handleNavStyleChange = (style) => {
    setNavStyle(style);
    localStorage.setItem("navStyle", style);
  };

  return (
    <>
      <div
        className={`header ${
          navStyle === "horizontal" ? "with-horizontal-nav" : ""
        }`}
        ref={headerRef}
      >
        <div className="left-section">
          <FaBars
            ref={menuButtonRef}
            onClick={() => setSidebarOpen((prev) => !prev)}
            style={{ cursor: "pointer", color: "#6f778e" }}
          />
          {/* <div className="search-box" style={{ background: "#f7f8f9" }}>
            <input type="text" placeholder="Search for Results..." />
            <FaSearch />
          </div> */}
          <div className="search-box" >
            <input type="text" placeholder="Search for Results..." />
            <FaSearch />
          </div>
        </div>

        <div className="right-section">
          <div
            className="icon-button"
            onClick={toggleFullScreen}
            title="Fullscreen"
          >
            <i
              className={`fas ${
                isFullscreen ? "fa-compress" : "fa-expand"
              } header_icon_bg`}
            ></i>
          </div>

          <div
            className="icon-button notification-wrapper"
            title="Notifications"
            onClick={handleNotificationClick}
            ref={notificationIconRef}
            style={{ cursor: "pointer" }}
          >
            <span className="blinking-dot"></span>
            <i className="fas fa-bell header_icon_bg"></i>
          </div>

          <div
            className="icon-button"
            onClick={toggleDarkMode}
            title="Dark Mode"
          >
            <i
              className={`fas ${
                darkMode ? "fa-sun" : "fa-moon"
              } header_icon_bg`}
            ></i>
          </div>

          <div
            className="profile-section"
            onClick={() => setSubmenuOpen((prev) => !prev)}
            ref={profileRef}
          >
            <img src="https://i.pravatar.cc/40" alt="Avatar" height="24" />
            {submenuOpen && (
              <div className="profile-submenu ">
                <div
                  className="profile-btn"
                  onClick={() => navigate("/profile")}
                >
                  <i className="bi bi-person me-2 "></i> Profile
                </div>
                <div className="logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Log Out
                </div>
              </div>
            )}
            <div className="profile-name">John Doe</div>
          </div>

          <div
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSwitcher"
            aria-controls="offcanvasSwitcher"
            title="Settings"
            onClick={() => setShowSwitcher(true)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            <i className="fas fa-cog switcher-icon rotating header_icon_bg"></i>
          </div>
        </div>
      </div>

      {showNotificationModal && (
        <>
          <div
            className="notification-modal-overlay"
            onClick={handleCloseNotificationModal}
          ></div>
          <div
            className="notification-modal-dropdown"
            style={{
              position: "absolute",
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              zIndex: 3000,
            }}
          >
            <div className="notification-modal-header">
              <h4>Notifications</h4>
              <span className="notification-count">3 new</span>
            </div>
            <ul className="notification-list">
              <li className="notification-item">
                <img src="https://i.pravatar.cc/30?img=1" alt="user" />
                <div>
                  <p>
                    <strong>Alice</strong> sent you a message
                  </p>
                  <span className="time">2 mins ago</span>
                </div>
              </li>
              <li className="notification-item">
                <img src="https://i.pravatar.cc/30?img=2" alt="user" />
                <div>
                  <p>
                    <strong>Bob</strong> shared a document
                  </p>
                  <span className="time">10 mins ago</span>
                </div>
              </li>
              <li className="notification-item">
                <img src="https://i.pravatar.cc/30?img=3" alt="user" />
                <div>
                  <p>
                    <strong>System</strong> maintenance completed
                  </p>
                  <span className="time">30 mins ago</span>
                </div>
              </li>
            </ul>
            <Link
              to="/Notification"
              className="view-all-link"
              onClick={handleCloseNotificationModal}
            >
              View All Notifications
            </Link>
          </div>
        </>
      )}

      <SwitcherContent
        show={showSwitcher}
        onHide={() => setShowSwitcher(false)}
        headerHeight={headerHeight}
        direction={direction}
        onNavStyleChange={handleNavStyleChange}
      />
    </>
  );
};

export default Header;
