import React, { useState } from "react";

const tabs = [
  { id: "overview",   label: "Overview" },
  { id: "sentiment",  label: "Sentiment" },
  { id: "words",      label: "Words" },
  { id: "topics",     label: "Topics" },
  { id: "headtohead", label: "Head-to-Head" },
];

export default function Header({ activeTab, setActiveTab }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <header style={{
      background: "#080808",
      borderBottom: "1px solid #161616",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28,
              background: "linear-gradient(135deg, #1DB954 0%, #0a8a3a 100%)",
              borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>
              ♫
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              color: "#e8e4dc",
              letterSpacing: "-0.02em",
            }}>
              LYRIC<span style={{ color: "#1DB954" }}>ANALYTICS</span>
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 2 }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const isHovered = hoveredTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  style={{
                    padding: "6px 14px",
                    fontSize: 12,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.04em",
                    color: isActive ? "#1DB954" : isHovered ? "#e8e4dc" : "#555",
                    background: isActive ? "#1DB95412" : isHovered ? "#ffffff08" : "none",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    position: "relative",
                  }}
                >
                  {tab.label.toUpperCase()}
                  {isActive && (
                    <div style={{
                      position: "absolute",
                      bottom: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 20,
                      height: 2,
                      background: "#1DB954",
                      borderRadius: 2,
                    }} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
