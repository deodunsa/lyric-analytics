import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, BarChart, Bar
} from "recharts";
import { artists } from "../data/artists";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 8, padding: "10px 14px", fontSize: 12
    }}>
      <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#111" }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ margin: "2px 0", color: p.color }}>
          {p.name}: <strong>{p.value > 0 ? "+" : ""}{Number(p.value).toFixed(3)}</strong>
        </p>
      ))}
    </div>
  );
};

export default function SentimentTimeline() {
  const [view, setView] = useState("compound");

  const allAlbums = artists.flatMap(a =>
    a.albums.map(al => ({ ...al, artistName: a.name }))
  ).sort((a, b) => a.year - b.year);

  const timelineData = allAlbums.map(al => ({
    name: `${al.title.length > 22 ? al.title.slice(0, 22) + "…" : al.title} (${al.year})`,
    shortName: al.year,
    [al.artistName]: al.compound,
    neg: al.neg,
    neu: al.neu,
    pos: al.pos,
    artist: al.artistName,
    full: al.title,
    compound: al.compound,
  }));

  const compoundData = artists.map(a => ({
    name: a.name,
    data: a.albums.map(al => ({
      name: al.title.length > 18 ? al.title.slice(0, 18) + "…" : al.title,
      year: al.year,
      compound: al.compound,
    })).sort((a, b) => a.year - b.year)
  }));

  const sentBreakdown = allAlbums.map(al => ({
    name: al.title.length > 16 ? al.title.slice(0, 16) + "…" : al.title,
    Positive: +(al.pos * 100).toFixed(1),
    Neutral: +(al.neu * 100).toFixed(1),
    Negative: +(al.neg * 100).toFixed(1),
    artist: al.artistName,
  }));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#111" }}>Sentiment Timeline</h2>
          <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
            VADER compound scores by album, from −1 (most negative) to +1 (most positive)
          </p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["compound", "breakdown"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 12px", fontSize: 12, borderRadius: 6, cursor: "pointer",
              background: view === v ? "#1DB954" : "#f9fafb",
              color: view === v ? "#fff" : "#374151",
              border: view === v ? "none" : "1px solid #e5e7eb",
              fontWeight: view === v ? 600 : 400,
            }}>{v === "compound" ? "Compound score" : "Pos/Neu/Neg breakdown"}</button>
          ))}
        </div>
      </div>

      {view === "compound" && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          {compoundData.map(({ name, data }) => {
            const artist = artists.find(a => a.name === name);
            return (
              <div key={name} style={{ marginBottom: 28 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: artist.color, margin: "0 0 10px" }}>{name}</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <YAxis domain={[-0.6, 0.6]} tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} stroke="#e5e7eb" strokeDasharray="4 4" />
                    <Line
                      type="monotone" dataKey="compound"
                      stroke={artist.color} strokeWidth={2.5}
                      dot={{ r: 5, fill: artist.color }}
                      activeDot={{ r: 7 }}
                      name={name}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      )}

      {view === "breakdown" && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 16px" }}>
            Percentage of each sentiment dimension per album (stacked = 100%)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sentBreakdown} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} angle={-35} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" stackId="a" fill="#1DB954" />
              <Bar dataKey="Neutral" stackId="a" fill="#9ca3af" />
              <Bar dataKey="Negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{
        marginTop: 14, background: "#fffbeb", border: "1px solid #fde68a",
        borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#92400e"
      }}>
        <strong>Reading the chart:</strong> Kanye's early catalog scores consistently positive — Graduation peaks at +0.46.
        J. Cole trends negative, with 4 Your Eyez Only being his darkest album at −0.40, reflecting its heavy subject matter.
      </div>
    </div>
  );
}
