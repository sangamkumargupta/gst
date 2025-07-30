import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from "../sidebar/menu.json";

const HorizontalMenu = ({ setSidebarOpen, isDesktop }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="horizontal-menu">
      <div className="horizontal-menu-container p-2">
        <ul className="nav">
          {Array.isArray(menu) && menu.map((section) => (
            Array.isArray(section.items) && section.items.map((item) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              const isOpen = openMenus[item.label];
              const isActive =
                location.pathname === item.path ||
                (hasChildren &&
                  item.children.some(
                    (child) => location.pathname === child.path
                  ));

              return (
                <li className="nav-item" key={item.label}>
                  {hasChildren ? (
                    <>
                      <div
                        className={`nav-link d-flex justify-content-between align-items-center ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => toggleMenu(item.label)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          <i className={`bi ${item.icon || ""} me-2`}></i>
                          {item.label}
                        </div>
                        <i
                          className={`bi ${
                            isOpen ? "bi-chevron-up" : "bi-chevron-down"
                          }`}
                        ></i>
                      </div>
                      {isOpen && (
                        <div className="dropdown-menu show">
                          {item.children && item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`dropdown-item ${
                                location.pathname === child.path ? "active" : ""
                              }`}
                              onClick={() => !isDesktop && setSidebarOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-link ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <i className={`bi ${item.icon || ""} me-2`}></i>
                        {item.label}
                      </div>
                    </Link>
                  )}
                </li>
              );
            })
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HorizontalMenu;