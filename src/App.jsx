import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HorizontalMenu from "./components/HorizontalMenu";

// Screens
import Dashboard from "./screen/admin/Dashboard";
import GstR1 from "./screen/admin/GstR1";
import Profile from "./screen/admin/Profile";
import Ledger from "./screen/admin/Ledger";
import Notification from "./screen/admin/Notification";
import Challan from "./screen/admin/Challan";
import ClientTableRegular from "./screen/admin/ClientTableRegular";
import ClientTableComposition from "./screen/admin/ClientTableComposition";
import ClientTableAnnual from "./screen/admin/ClientTableAnnual";
import ClientDetail from "./screen/admin/ClientDetail";
import ReturnPage from "./screen/admin/ReturnPage";
import MyClients from "./screen/admin/MyClients";
import SearchTaxPayer from "./screen/admin/SearchTaxPayer";
import Eway from "./screen/admin/Home";
import Einvoice from "./screen/admin/Home";
import UserProfile from "./screen/admin/UserProfile"; 
import Clients from "./screen/admin/Clients";
import Login from "./screen/Login";

const regularTabs = ["GSTR-01", "GSTR-3B", "GSTR-2A", "GSTR-2B", "GSTR-1A"];
const compositionTabs = ["CMP-08", "GSTR-4A"]; 
const annualTab = ["GSTR-9", "GSTR-9C","GSTR-4",  "GSTR-9A"];

const Layout = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  isDesktop,
  sidebarRef,
  menuButtonRef,
  darkMode,
  toggleDarkMode,
  navStyle,
  setNavStyle,
  menuStyle,
  sideMenu,
}) => {
  useEffect(() => {
    const body = document.body;
    body.classList.remove("vertical", "horizontal");
    body.classList.add(navStyle);

    const app = document.getElementById("root");
    if (app) {
      app.classList.toggle(
        "horizontal-nav",
        navStyle === "horizontal" && isDesktop
      );
    }

    body.classList.remove("menuClick", "menuHover", "iconClick", "iconHover");
    body.classList.add(menuStyle);

    body.classList.remove("default", "closed", "iconText", "iconOverlay");
    body.classList.add(sideMenu);
  }, [navStyle, menuStyle, sideMenu, isDesktop]);

  const effectiveNavStyle = isDesktop ? navStyle : "vertical";

  return (
    <div className={`app-wrapper ${effectiveNavStyle}`}>
      {effectiveNavStyle === "vertical" && (
        // <Sidebar
        //   sidebarOpen={sidebarOpen}
        //   setSidebarOpen={setSidebarOpen}
        //   isDesktop={isDesktop}
        //   sidebarRef={sidebarRef}
        //   navStyle={effectiveNavStyle}
        // />
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDesktop={isDesktop}
          sidebarRef={sidebarRef}
          navStyle={navStyle}
          darkMode={darkMode} // ✅ Must pass this
        />
      )}

      <div
        className={`main-content ${
          sidebarOpen && isDesktop && effectiveNavStyle === "vertical"
            ? "with-sidebar"
            : "no-sidebar"
        }`}
      >
        <div className="header-container">
          {/* <Header
            setSidebarOpen={setSidebarOpen}
            menuButtonRef={menuButtonRef}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            navStyle={effectiveNavStyle}
            setNavStyle={setNavStyle}
          /> */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            navStyle={navStyle}
            setNavStyle={setNavStyle}
          />

          {effectiveNavStyle === "horizontal" && isDesktop && (
            <div style={{ paddingTop: "10px" }}>
              <HorizontalMenu
                setSidebarOpen={setSidebarOpen}
                isDesktop={isDesktop}
              />
            </div>
          )}
        </div>

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [navStyle, setNavStyle] = useState("vertical");
  const [menuStyle, setMenuStyle] = useState("menuClick");
  const [sideMenu, setSideMenu] = useState("default");

  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Apply dark/light mode to body & html
  useEffect(() => {
    document.body.classList.toggle("darkmode", darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);
      setSidebarOpen(isNowDesktop);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        !isDesktop &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen, isDesktop]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const layoutProps = {
    sidebarOpen,
    setSidebarOpen,
    isDesktop,
    sidebarRef,
    menuButtonRef,
    darkMode,
    toggleDarkMode,
    navStyle,
    setNavStyle,
    menuStyle,
    sideMenu,
  };

  return (
    <div className={`app-root ${darkMode ? "darkmode" : ""}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Layout {...layoutProps}>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout {...layoutProps}>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/myclients"
            element={
              <Layout {...layoutProps}>
                <MyClients />
              </Layout>
            }
          />

          <Route
            path="/return"
            element={
              <Layout {...layoutProps}>
                <ReturnPage />
              </Layout>
            }
          />
          <Route
            path="/return/regular"
            element={
              <Layout {...layoutProps}>
                <ClientTableRegular />
              </Layout>
            }
          />
          <Route
            path="/return/regular/:id"
            element={
              <Layout {...layoutProps}>
                <ClientDetail
                  title="Regular"
                  tabs={regularTabs}
                  defaultTab="GSTR 1"
                />
              </Layout>
            }
          />
          <Route
            path="/return/composition"
            element={
              <Layout {...layoutProps}>
                <ClientTableComposition />
              </Layout>
            }
          />
         
          <Route
            path="/return/composition/:id"
            element={
              <Layout {...layoutProps}>
                <ClientDetail
                  title="Composition"
                  tabs={compositionTabs}
                  defaultTab="CMP 08"
                />
              </Layout>
            }
          />
           <Route
            path="/return/annual"
            element={
              <Layout {...layoutProps}>
                <ClientTableAnnual />
              </Layout>
            }
          />
           <Route
            path="/return/annual/:id"
            element={
              <Layout {...layoutProps}>
                <ClientDetail
                  title="Annual"
                  tabs={annualTab}
                  // defaultTab="CMP 08"
                />
              </Layout>
            }
          />

          <Route
            path="/ledger"
            element={
              <Layout {...layoutProps}>
                <Ledger />
              </Layout>
            }
          />
          <Route
            path="/Challan"
            element={
              <Layout {...layoutProps}>
                <Challan />
              </Layout>
            }
          />
          <Route
            path="/Notification"
            element={
              <Layout {...layoutProps}>
                <Notification />
              </Layout>
            }
          />
          <Route
            path="/search-tax-payer"
            element={
              <Layout {...layoutProps}>
                <SearchTaxPayer />
              </Layout>
            }
          />
          <Route
            path="/eway"
            element={
              <Layout {...layoutProps}>
                <Eway />
              </Layout>
            }
          />
          <Route
            path="/einvoice"
            element={
              <Layout {...layoutProps}>
                <Einvoice />
              </Layout>
            }
          />
          <Route
            path="/user-profile"
            element={
              <Layout {...layoutProps}>
                <UserProfile />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout {...layoutProps}>
                <Profile />
              </Layout>
            }
          />

          <Route
            path="*"
            element={
              <Layout {...layoutProps}>
                <div>Page Not Found</div>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
