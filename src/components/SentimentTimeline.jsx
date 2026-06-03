import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, BarChart, Bar
} from "recharts";
import { artists } from "../data/artists";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#161616",
      border: "1px solid #2a2a2a",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 12,
      fontFamily: "'Space Mono', monospace",
    }}>
      <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#e8e4dc", fontSize: 11 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ margin: "3px 0", color: p.color, fontSize: 11 }}>
          {p.name}: <strong>{Number(p.value) > 0 ? "+" : ""}{Number(p.value).toFixed(3)}</strong>
        </p>
      ))}
    </div>
  );
};

const CHART_STYLE = {
  background: "#0e0e0e",
  border: "1px solid #1a1a1a",
  borderRadius: 12,
  padding: "1.25rem",
};

export default function SentimentTimeline() {
  const [view, setView] = useState("compound");

  const compoundData = artists.map(a => ({
    name: a.name,
    color: a.color,
    data: [...a.albums].sort((x, y) => x.year - y.year).map(al => ({
      name: al.title.length > 18 ? al.title.slice(0, 18) + "…" : al.title,
      year: al.year,
      compound: al.compound,
    })),
  }));

  const allAlbums = artists.flatMap(a =>
    a.albums.map(al => ({ ...al, artistName: a.name, artistColor: a.color }))
  ).sort((a, b) => a.year - b.year);

  const sentBreakdown = allAlbums.map(al => ({
    name: al.title.length > 14 ? al.title.slice(0, 14) + "…" : al.title,
    Positive: +(al.pos * 100).toFixed(1),
    Neutral: +(al.neu * 100).toFixed(1),
    Negative: +(al.neg * 100).toFixed(1),
    artist: al.artistName,
  }));

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#1DB954", marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>
            VADER COMPOUND SCORE
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e8e4dc", letterSpacing: "-0.02em" }}>
            Sentiment Timeline
          </h2>
          <p style={{ color: "#444", fontSize: 12, marginTop: 4 }}>
            −1 (most negative) to +1 (most positive) per album
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {[
            { id: "compound", label: "COMPOUND" },
            { id: "breakdown", label: "BREAKDOWN" },
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              padding: "6px 12px",
              fontSize: 10,
              letterSpacing: "0.08em",
              borderRadius: 6,
              cursor: "pointer",
              background: view === v.id ? "#1DB954" : "#111",
              color: view === v.id ? "#000" : "#555",
              border: view === v.id ? "none" : "1px solid #1e1e1e",
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace",
              transition: "all 0.15s",
            }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "compound" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {compoundData.map(({ name, color, data }) => (
            <div key={name} style={CHART_STYLE}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
                <p style={{ fontWeight: 700, fontSize: 12, color, letterSpacing: "0.04em" }}>
                  {name.toUpperCase()}
                </p>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161616" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#444", fontFamily: "'Space Mono', monospace" }} />
                  <YAxis domain={[-0.6, 0.6]} tick={{ fontSize: 10, fill: "#444", fontFamily: "'Space Mono', monospace" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={0} stroke="#2a2a2a" strokeDasharray="4 4" />
                  <Line
                    type="monotone" dataKey="compound"
                    stroke={color} strokeWidth={2}
                    dot={{ r: 4, fill: color, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: color }}
                    name={name}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      )}

      {view === "breakdown" && (
        <div style={CHART_STYLE}>
          <p style={{ fontSize: 11, color: "#444", marginBottom: 16, fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>
            POS / NEU / NEG SPLIT PER ALBUM (%)
          </p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={sentBreakdown} margin={{ top: 5, right: 20, left: 0, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#161616" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#444", fontFamily: "'Space Mono', monospace" }} angle={-40} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fill: "#444" }} />
              <Tooltip contentStyle={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, fontFamily: "'Space Mono', monospace" }} />
              <Bar dataKey="Positive" stackId="a" fill="#1DB954" />
              <Bar dataKey="Neutral"  stackId="a" fill="#333" />
              <Bar dataKey="Negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{
        marginTop: 12,
        background: "#0e0e0e",
        border: "1px solid #1e1e1e",
        borderLeft: "3px solid #EF9F27",
        borderRadius: "0 8px 8px 0",
        padding: "10px 14px",
        fontSize: 12,
        color: "#555",
        fontFamily: "'Space Mono', monospace",
        lineHeight: 1.6,
      }}>
        <strong style={{ color: "#EF9F27" }}>NOTE:</strong> Kanye's early catalog trends strongly positive — Graduation peaks at +0.459.
        J. Cole trends negative, with 4 Your Eyez Only scoring −0.395, its darkest thematically.
      </div>
    </div>
  );
}
