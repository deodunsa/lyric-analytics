import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Overview from "./components/Overview";
import SentimentTimeline from "./components/SentimentTimeline";
import WordExplorer from "./components/WordExplorer";
import TopicClusters from "./components/TopicClusters";
import HeadToHead from "./components/HeadToHead";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080808;
    color: #e8e4dc;
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

  select {
    font-family: 'Syne', sans-serif;
  }

  button {
    font-family: 'Syne', sans-serif;
  }

  .tab-fade-in {
    animation: fadeUp 0.3s ease forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  @keyframes bar-grow {
    from { width: 0; }
    to { width: var(--w); }
  }

  .card {
    background: #111;
    border: 1px solid #1e1e1e;
    border-radius: 12px;
    padding: 1.25rem;
  }

  .card-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 6px;
  }

  .mono {
    font-family: 'Space Mono', monospace;
  }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const renderTab = () => {
    const key = activeTab;
    switch (activeTab) {
      case "overview":    return <Overview key={key} setActiveTab={setActiveTab} />;
      case "sentiment":   return <SentimentTimeline key={key} />;
      case "words":       return <WordExplorer key={key} />;
      case "topics":      return <TopicClusters key={key} />;
      case "headtohead":  return <HeadToHead key={key} />;
      default:            return <Overview key={key} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808" }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ maxWidth: 1160, margin: "0 auto", padding: "2rem 1.5rem" }} className="tab-fade-in">
        {renderTab()}
      </main>
      <footer style={{
        textAlign: "center", padding: "2rem",
        fontSize: 11, color: "#333",
        borderTop: "1px solid #161616",
        marginTop: "3rem",
        fontFamily: "'Space Mono', monospace",
        letterSpacing: "0.05em"
      }}>
        <a href="https://github.com/deodunsa" target="_blank" rel="noreferrer"
          style={{ color: "#555", textDecoration: "none" }}>
          @deodunsa
        </a>
        {" "}·{" "}VADER · TF-IDF · K-MEANS · LDA (R) · REACT + RECHARTS
      </footer>
    </div>
  );
}
