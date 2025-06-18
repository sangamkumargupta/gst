import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import Footer from "./components/footer"; 
// only for test purpose
import PopupMessage from "./components/PopupMessage"; 
import Dashboard from "./screen/admin/Dashboard";
import Profile from "./screen/admin/Profile";
import MyTablePage from "./screen/admin/MyTablePage";
import Ledger from "./screen/admin/MyTablePage";
import ClientTable from "./screen/admin/ClientTable";
import ReturnPage from "./screen/admin/ReturnPage";
import Home from "./screen/admin/Home";
import Myclients from "./screen/admin/myclients";
import SearchTaxPayer from "./screen/admin/searchTaxPayer";
import Eway from "./screen/admin/Eway";
import Einvoice from "./screen/admin/Einvoice";
import UserProfile from "./screen/admin/UserProfile"; 
import Clients from "./screen/admin/clients";
import Login from "./screen/login";

import "./app.css";

// Layout Wrapper for Authenticated Pages
const Layout = ({ children, sidebarOpen, setSidebarOpen, isDesktop, sidebarRef, menuButtonRef, }) => (
  <div className="app-wrapper d-flex">
    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isDesktop={isDesktop}
      sidebarRef={sidebarRef}
    />
    <div
      className={`main-content flex-grow-1 ${
        sidebarOpen && isDesktop ? "with-sidebar" : "no-sidebar"
      }`}
    >
      <Header setSidebarOpen={setSidebarOpen} menuButtonRef={menuButtonRef} />
      <div className="p-4 min-vh-100" style={{ background: "#f7f8f9" }}>
        {children}
      </div>
      <Footer />
    </div>
  </div>
);

function App() {
  // only for test purpose
  const [popup, setPopup] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

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

  return (
    <>
    {/* <button onClick={() => setPopup({ type: "success", message: "Return downloaded and data saved successfully" })}>
        Show Success
      </button>

      <button onClick={() => setPopup({ type: "error", message: "Something went wrong while saving data!" })}>
        Show Error
      </button>

      {popup && (
        <PopupMessage
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}  */}
    <Router>
      <Routes>
        {/* Login Route (No Layout) */}
        <Route path="/" element={<Login />} />

        {/* Authenticated Routes Wrapped with Sidebar/Header/Footer */}
        <Route
          path="/dashboard"
          element={
            <Layout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isDesktop={isDesktop}
              sidebarRef={sidebarRef}
              menuButtonRef={menuButtonRef}
            >
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/return"
          element={
            <Layout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isDesktop={isDesktop}
              sidebarRef={sidebarRef}
              menuButtonRef={menuButtonRef}
            >
              <ReturnPage />
            </Layout>
          }
        />
        <Route
          path="/dashboard/home"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/dashboard/myclients"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <Myclients />
            </Layout>
          }
        />
        <Route
          path="/return/regular"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}> 
              <ClientTable />
            </Layout>
          }
        />
        <Route
          path="/return/composition"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              {/* <MyTablePage /> */}
              <Clients />
            </Layout>
          }
        />
        <Route
          path="/ledger"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <Ledger />
            </Layout>
          }
        />
        <Route
          path="/dashboard/searchTaxPayer"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <SearchTaxPayer />
            </Layout>
          }
        />
        <Route
          path="/eway"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <Eway />
            </Layout>
          }
        />
        <Route
          path="/einvoice"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <Einvoice />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <UserProfile />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout
              {...{
                sidebarOpen,
                setSidebarOpen,
                isDesktop,
                sidebarRef,
                menuButtonRef,
              }}
            >
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
