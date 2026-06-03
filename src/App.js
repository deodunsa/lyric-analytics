import React, { useState } from "react";
import Header from "./components/Header";
import Overview from "./components/Overview";
import SentimentTimeline from "./components/SentimentTimeline";
import WordExplorer from "./components/WordExplorer";
import TopicClusters from "./components/TopicClusters";
import HeadToHead from "./components/HeadToHead";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <Overview setActiveTab={setActiveTab} />;
      case "sentiment": return <SentimentTimeline />;
      case "words": return <WordExplorer />;
      case "topics": return <TopicClusters />;
      case "headtohead": return <HeadToHead />;
      default: return <Overview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
        {renderTab()}
      </main>
      <footer style={{ textAlign: "center", padding: "2rem", fontSize: 12, color: "#9ca3af", borderTop: "1px solid #e5e7eb", marginTop: "2rem", background: "#fff" }}>
        Built by{" "}
        <a href="https://github.com/deodunsa" target="_blank" rel="noreferrer" style={{ color: "#1DB954", textDecoration: "none", fontWeight: 600 }}>
          deodunsa
        </a>
        {" "}· NLP stack: VADER · TF-IDF · K-means · LDA (R) · React + Recharts
      </footer>
    </div>
  );
}
