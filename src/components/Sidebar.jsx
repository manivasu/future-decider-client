import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { telugu } from "../translations/telugu";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if on mobile
  const isMobile = () => window.innerWidth <= 768;

  const menuItems = [
    {
      id: "birth-form",
      label: telugu.birthDetails,
      path: "/",
      icon: "📋",
    },
    {
      id: "predictions",
      label: telugu.predictions,
      icon: "🔮",
      submenu: [
        { id: "summary", label: telugu.summary, path: "/predictions/summary" },
        { id: "scorecard", label: telugu.scorecard, path: "/predictions/scorecard" },
        { id: "planets", label: telugu.planets, path: "/predictions/planets" },
        { id: "yogas", label: telugu.yogas, path: "/predictions/yogas" },
        { id: "problems", label: telugu.problems, path: "/predictions/problems" },
        { id: "dasha", label: telugu.dasha, path: "/predictions/dasha" },
      ],
    },
    {
      id: "chart",
      label: telugu.birthChart,
      path: "/chart",
      icon: "📊",
    },
  ];

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      navigate(item.path);
      // Close sidebar on mobile when navigating
      if (isMobile()) {
        setIsOpen(false);
      }
      setExpandedMenu(null);
    }
  };

  const handleSubMenuClick = (path) => {
    navigate(path);
    // Close sidebar on mobile when navigating
    if (isMobile()) {
      setIsOpen(false);
    }
    setExpandedMenu(null);
  };

  const closeOnOverlay = () => {
    if (isMobile()) {
      setIsOpen(false);
    }
  };

  const isMenuActive = (path) => location.pathname === path;
  const isSubmenuActive = (id) => expandedMenu === id;

  return (
    <>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "మెనూ ఆపండి" : "మెనూ తెరండి"}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Brand/Logo */}
        <div className="sidebar-brand">
          <h2>🌟 {telugu.title}</h2>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item-wrapper">
              <button
                className={`menu-item ${
                  isMenuActive(item.path) || isSubmenuActive(item.id) ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {item.submenu && (
                  <span className={`submenu-arrow ${isSubmenuActive(item.id) ? "expanded" : ""}`}>
                    ▼
                  </span>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && isSubmenuActive(item.id) && (
                <div className="submenu">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      className={`submenu-item ${isMenuActive(subitem.path) ? "active" : ""}`}
                      onClick={() => handleSubMenuClick(subitem.path)}
                    >
                      <span className="submenu-dot">•</span>
                      <span className="submenu-label">{subitem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <p>✨ {telugu.vedicAstrology}</p>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeOnOverlay}
        />
      )}
    </>
  );
};

export default Sidebar;
