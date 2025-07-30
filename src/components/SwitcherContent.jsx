import React, { useState, useEffect } from "react";
import { Offcanvas, Tab, Tabs } from "react-bootstrap";
import "../assets/css/SwitcherContent.css";

const SwitcherContent = ({
  show,
  onHide,
  headerHeight,
  direction: propDirection,
  navStyle: propNavStyle,
  onNavStyleChange,
  menuStyle: propMenuStyle,
  onMenuStyleChange,
  sideMenu: propSideMenu,
  onSideMenuChange,
  onMenuColorChange,
  onHeaderColorChange,
  onPrimaryColorChange,
  onBackgroundColorChange,
}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuBackgroundImage, setMenuBackgroundImage] = useState(localStorage.getItem("menuBackgroundImage") || "none");
  const [direction, setDirection] = useState(propDirection || "ltr");
  const [navStyle, setNavStyle] = useState(propNavStyle || "vertical");
  const [menuStyle, setMenuStyle] = useState(propMenuStyle || "menuClick");
  const [activeTab, setActiveTab] = useState("themeStyles");

  const [menuColor, setMenuColor] = useState(localStorage.getItem("menuColor") || "#ffffff");
  const [headerColor, setHeaderColor] = useState(localStorage.getItem("headerColor") || "#ffffff");
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("primaryColor") || "#4e73df");
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem("backgroundColor") || "#f8f9fc");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("darkmode", theme === "dark");
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("dir", direction);
    document.body.classList.remove("vertical", "horizontal");
    document.body.classList.add(navStyle);
    document.body.classList.remove("menuClick", "menuHover", "iconClick", "iconHover");
    document.body.classList.add(menuStyle);
    document.body.classList.remove("default", "closed", "iconText", "iconOverlay");
    document.body.classList.add(propSideMenu);

    applyColor("--menu-color", menuColor, "--menu-text-color");
    applyColor("--header-color", headerColor, "--header-text-color");
    applyPrimaryColors(primaryColor);
    applyColor("--background", backgroundColor, "--background-text-color");
  }, [theme, direction, navStyle, menuStyle, propSideMenu, menuColor, headerColor, primaryColor, backgroundColor]);

  const getContrastColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  const adjustColor = (hex, percent) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newR = Math.min(255, r + Math.round((percent * r) / 100));
    const newG = Math.min(255, g + Math.round((percent * g) / 100));
    const newB = Math.min(255, b + Math.round((percent * b) / 100));
    return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
  };

  const applyColor = (cssVar, hex, textCssVar) => {
    document.documentElement.style.setProperty(cssVar, hex);
    if (textCssVar) {
      document.documentElement.style.setProperty(textCssVar, getContrastColor(hex));
    }
  };

  const applyPrimaryColors = (hex) => {
    document.documentElement.style.setProperty("--primary", hex);
    document.documentElement.style.setProperty("--primary-hover-color", adjustColor(hex, 20));
    document.documentElement.style.setProperty("--primary-active-color", adjustColor(hex, -20));
    document.documentElement.style.setProperty("--primary-text-color", getContrastColor(hex));
  };

  const handleColorChange = (setter, key, cssVar, onChange, textCssVar) => (color) => {
    const hex = color.hex;
    setter(hex);
    localStorage.setItem(key, hex);
    applyColor(cssVar, hex, textCssVar);
    onChange?.(hex);
  };

  const handlePrimaryColorChange = (color) => {
    const hex = color.hex;
    setPrimaryColor(hex);
    localStorage.setItem("primaryColor", hex);
    applyPrimaryColors(hex);
    onPrimaryColorChange?.(hex);
  };

  const handleMenuBackgroundChange = (image) => {
    setMenuBackgroundImage(image);
    localStorage.setItem("menuBackgroundImage", image);
    document.documentElement.style.setProperty("--menu-background-image", image);
  };

  const handleReset = () => {
    const defaults = {
      theme: "light",
      direction: "ltr",
      navStyle: "vertical",
      menuStyle: "menuClick",
      sideMenu: "default",
      menuColor: "#ffffff",
      headerColor: "#ffffff",
      primaryColor: "#4e73df",
      backgroundColor: "#f8f9fc",
    };
    setTheme(defaults.theme);
    setDirection(defaults.direction);
    setNavStyle(defaults.navStyle);
    setMenuStyle(defaults.menuStyle);
    setMenuColor(defaults.menuColor);
    setHeaderColor(defaults.headerColor);
    setPrimaryColor(defaults.primaryColor);
    setBackgroundColor(defaults.backgroundColor);

    localStorage.setItem("theme", defaults.theme);
    localStorage.setItem("dir", defaults.direction);
    localStorage.setItem("navStyle", defaults.navStyle);
    localStorage.setItem("menuStyle", defaults.menuStyle);
    localStorage.setItem("sideMenu", defaults.sideMenu);
    localStorage.setItem("menuColor", defaults.menuColor);
    localStorage.setItem("headerColor", defaults.headerColor);
    localStorage.setItem("primaryColor", defaults.primaryColor);
    localStorage.setItem("backgroundColor", defaults.backgroundColor);

    onNavStyleChange?.(defaults.navStyle);
    onMenuStyleChange?.(defaults.menuStyle);
    onSideMenuChange?.(defaults.sideMenu);
    onMenuColorChange?.(defaults.menuColor);
    onHeaderColorChange?.(defaults.headerColor);
    onPrimaryColorChange?.(defaults.primaryColor);
    onBackgroundColorChange?.(defaults.backgroundColor);
  };

  const renderColorOptions = (current, onChange, title) => (
    <div className="mb-4">
      {title && <p className="switcher-section-title mb-2">{title}</p>}
      <div className="color-options">
        {["#ffffff", "#f8f9fa", "#343a40", "#a084f9", "#bc6fe7"].map((color) => (
          <div
            key={color}
            className={`color-option ${current === color ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange({ hex: color })}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Offcanvas show={show} onHide={onHide} placement={direction === "rtl" ? "start" : "end"} className="switcher-panel">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Switcher</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <Tabs activeKey={activeTab} onSelect={setActiveTab} className="border-bottom switcher-tabs" id="switcher-tabs">
          <Tab eventKey="themeStyles" title="Theme Styles" className="p-3">
            {/* Theme Toggle */}
            <div className="mb-4">
              <p className="switcher-section-title mb-2">Theme Color Mode:</p>
              <div className="switcher-options d-flex gap-3">
                {["light", "dark"].map((mode) => (
                  <div className="form-check" key={mode}>
                    <input type="radio" name="theme" className="form-check-input" id={`theme_${mode}`} checked={theme === mode} onChange={() => setTheme(mode)} />
                    <label className="form-check-label" htmlFor={`theme_${mode}`}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Direction */}
            <div className="mb-4">
              <p className="switcher-section-title mb-2">Direction:</p>
              <div className="d-flex gap-3">
                {["ltr", "rtl"].map((dir) => (
                  <div className="form-check" key={dir}>
                    <input type="radio" name="direction" className="form-check-input" id={`dir_${dir}`} checked={direction === dir} onChange={() => setDirection(dir)} />
                    <label className="form-check-label" htmlFor={`dir_${dir}`}>{dir.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Style */}
            <div className="mb-4">
              <p className="switcher-section-title mb-2">Navigation Style:</p>
              <div className="d-flex gap-3">
                {["vertical", "horizontal"].map((style) => (
                  <div className="form-check" key={style}>
                    <input type="radio" name="navStyle" className="form-check-input" id={`nav_${style}`} checked={navStyle === style} onChange={() => { setNavStyle(style); onNavStyleChange?.(style); }} />
                    <label className="form-check-label" htmlFor={`nav_${style}`}>{style.charAt(0).toUpperCase() + style.slice(1)}</label>
                  </div>
                ))}
              </div>
            </div>
          </Tab>

          <Tab eventKey="themeColors" title="Theme Colors" className="p-3">
            {renderColorOptions(menuColor, handleColorChange(setMenuColor, "menuColor", "--menu-color", onMenuColorChange, "--menu-text-color"), "Menu Colors")}
            {renderColorOptions(headerColor, handleColorChange(setHeaderColor, "headerColor", "--header-color", onHeaderColorChange, "--header-text-color"), "Header Colors")}

            <div className="mb-4">
              <p className="switcher-section-title mb-2">Theme Primary:</p>
              <div className="color-options">
                {["#a084f9", "#bc6fe7", "#36b9cc", "#f6c23e", "#e74a3b"].map((color) => (
                  <div key={color} className={`color-option ${primaryColor === color ? "active" : ""}`} style={{ backgroundColor: color }} onClick={() => handlePrimaryColorChange({ hex: color })} />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="switcher-section-title mb-2">Theme Background:</p>
              <div className="color-options">
                {["#f8f9fc", "#ffffff", "#f5f5f5", "#eaeaea", "#dee2e6"].map((color) => (
                  <div key={color} className={`color-option ${backgroundColor === color ? "active" : ""}`} style={{ backgroundColor: color }} onClick={() => handleColorChange(setBackgroundColor, "backgroundColor", "--background", onBackgroundColorChange, "--background-text-color")({ hex: color })} />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="switcher-section-title mb-2">Menu Background Image:</p>
              <div className="background-image-options">
                {["none", "/images/bg-img2.jpg", "/images/bg-img3.jpg"].map((img) => (
                  <div key={img} className={`background-image-option ${menuBackgroundImage === img ? "active" : ""}`} style={{ backgroundImage: img === "none" ? "none" : `url(${img})`, backgroundColor: img === "none" ? "#f8f9fc" : "transparent" }} onClick={() => handleMenuBackgroundChange(img)}>
                    {img === "none" && <span>None</span>}
                  </div>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>

        <div className="switcher-footer p-3 border-top">
          <button className="btn btn-sm btn-primary me-2">Buy Now</button>
          <button className="btn btn-sm btn-outline-primary me-2">Our Portfolio</button>
          <button className="btn btn-sm btn-outline-danger" onClick={handleReset}>Reset</button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SwitcherContent;
