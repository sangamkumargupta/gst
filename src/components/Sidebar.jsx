import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import menu from "../sidebar/menu.json";
import "../assets/css/Sidebar.css";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isDesktop,
  sidebarRef,
  navStyle,
}) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const container = document.getElementById("header");
    const preventDoubleClick = (e) => e.preventDefault();
    if (container) {
      container.addEventListener("dblclick", preventDoubleClick);
    }
    return () => {
      if (container) {
        container.removeEventListener("dblclick", preventDoubleClick);
      }
    };
  }, []);

  if (navStyle === "horizontal") return null;

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${sidebarOpen ? "open sidebar-border" : "collapsed sidebar-border"}`}
    >
      {/* Top Logo Section */}
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src="https://i.pravatar.cc/40" alt="Logo" style={{ height: "24px" }} />
          <h5 className="fw-bold m-2 sider-heading">ATL - GST</h5>
        </div>
        {!isDesktop && (
          <button className="btn btn-sm" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-x fs-4"></i>
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div>
        {menu.map((section, i) => (
          <div key={i} className="mb-3">
            {section.group && (
              <div className="text-secondary text-uppercase small mb-2 fw-bold">
                {section.group}
              </div>
            )}
            <ul className="nav flex-column">
              {section.items.map((item, j) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openMenus[item.label];

                return (
                  <li className="nav-item" key={j}>
                    {hasChildren ? (
                      <>
                        <div
                          onClick={() => toggleMenu(item.label)}
                          className={`nav-link d-flex justify-content-between py-2 px-2 align-items-center rounded ${
                            item.children.some((child) => location.pathname === child.path)
                              ? "active"
                              : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="d-flex align-items-center">
                              <i className={`bi mainmenu ${item.icon || ""}`}></i>
                              &nbsp;
                              {item.label}
                            </div>
                            <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                          </div>
                        </div>
                        {isOpen && (
                          <ul className="nav flex-column ms-4 mt-1">
                            {item.children.map((child, idx) => (
                              <li key={idx}>
                                <NavLink
                                  to={child.path}
                                  className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                  }
                                  onClick={() => !isDesktop && setSidebarOpen(false)}
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `nav-link d-flex justify-content-between align-items-center py-2 px-2 rounded ${
                            isActive ? "active" : ""
                          }`
                        }
                        onClick={() => !isDesktop && setSidebarOpen(false)}
                      >
                        <div className="d-flex align-items-center">
                          <i className={`bi mainmenu ${item.icon || ""} me-2`}></i>
                          {item.label}
                        </div>
                        {item.badge && (
                          <span className="badge bg-primary small ms-2">{item.badge}</span>
                        )}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto text-center py-4 small text-muted border-top">
        <a
          href="https://docs.google.com/spreadsheets/d/1G1RY2wm3z_YgxJrOznKZF_o3QWPfA84mfv-qrFyaRe8/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Excel sheet 22/7/2025
        </a>
        <br />
        <a
          href="https://docs.google.com/document/d/1gfh-GzczESldpWqIUupQfzzV078DnAKy/edit"
          target="_blank"
          rel="noreferrer"
        >
          Word File
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
