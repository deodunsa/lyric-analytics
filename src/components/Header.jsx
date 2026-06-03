import React from "react";
import { Music } from "lucide-react";

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "sentiment", label: "Sentiment Timeline" },
    { id: "words", label: "Word Explorer" },
    { id: "topics", label: "Topic Clusters" },
    { id: "headtohead", label: "Head-to-Head" },
  ];

  return (
    <header style={{
      borderBottom: "1px solid #e5e7eb",
      padding: "0 2rem",
      background: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "1rem 0 0.5rem" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Music size={16} color="#fff" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#111" }}>Lyric Analytics</span>
          <span style={{
            marginLeft: 8, fontSize: 11, background: "#f0fdf4", color: "#166534",
            border: "1px solid #bbf7d0", borderRadius: 20, padding: "2px 8px"
          }}>beta</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "#1DB954" : "#6b7280",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #1DB954" : "2px solid transparent",
                cursor: "pointer",
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
