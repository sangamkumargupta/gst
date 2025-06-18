import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from "../sidebar/menu.json";
import "../assets/css/Sidebar.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen, isDesktop, sidebarRef }) => {
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

  return (
    <>
      <div
        ref={sidebarRef}
        className={`sidebar ${
          sidebarOpen ? "open sidebar-border" : "collapsed sidebar-border"
        }`}
      >
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <div className="d-flex align-items-center">
            <img
              src="https://i.pravatar.cc/40"
              style={{ height: "24px" }}
              alt="Logo"
            />
            &nbsp;&nbsp;
            <h5 className="fw-bold m-0">ATL - GST</h5>
          </div>

          {/* Show Close Button Only on Mobile */}
          {!isDesktop && (
            <button
              className="btn btn-sm"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-x fs-4"></i>
            </button>
          )}
        </div>

        <div className="bg-light">
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

                  // Active check: matches current path or any child's path
                  const isActive =
                    location.pathname === item.path ||
                    (hasChildren &&
                      item.children.some(
                        (child) => location.pathname === child.path
                      ));

                  return (
                    <li className="nav-item" key={j}>
                      {hasChildren ? (
                        <>
                          <ul
                            onClick={() => toggleMenu(item.label)}
                            className={`nav-link d-flex justify-content-between py-2 px-2 align-items-center text-black rounded ${
                              isActive ? "active" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <div className="d-flex align-items-center">
                                <i
                                  className={`bi mainmenu ${item.icon || ""}`}
                                ></i>
                                &nbsp;
                                {item.label}
                              </div>
                              <i
                                className={`bi ${
                                  isOpen ? "bi-chevron-up" : "bi-chevron-down"
                                }`}
                              ></i>
                            </div>
                          </ul>

                          {isOpen && (
                            <ul className="nav flex-column ms-8 mt-1">
                              {item.children.map((child, idx) => (
                                <li key={idx}>
                                  <Link
                                    to={child.path}
                                    className={`nav-link ${
                                      location.pathname === child.path
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      !isDesktop && setSidebarOpen(false)
                                    }
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`nav-link d-flex justify-content-between align-items-center text-black py-2 px-2 rounded ${
                            isActive ? "active" : ""
                          }`}
                          onClick={() => !isDesktop && setSidebarOpen(false)} // auto-close on mobile
                        >
                          <div className="d-flex align-items-center">
                            <i
                              className={`bi mainmenu ${item.icon || ""} me-2`}
                            ></i>
                            {item.label}
                          </div>
                          {item.badge && (
                            <span className="badge bg-primary small ms-2">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
