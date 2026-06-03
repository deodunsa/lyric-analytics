import React from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { topics, artistTopicWeights, artists } from "../data/artists";

const TOPIC_COLORS = ["#378ADD", "#1DB954", "#EF9F27", "#a855f7", "#ef4444"];

export default function TopicClusters() {
  const radarData = topics.map(t => {
    const row = { topic: t.label.split(" & ")[0] };
    artistTopicWeights.forEach(aw => {
      row[aw.artist] = +(aw[`topic${t.id}`] * 100).toFixed(1);
    });
    return row;
  });

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#1DB954", marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>
          LDA · 5 TOPICS · R TOPICMODELS
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e8e4dc", letterSpacing: "-0.02em" }}>
          Topic Clusters
        </h2>
        <p style={{ color: "#444", fontSize: 12, marginTop: 4 }}>
          Dominant lyrical themes revealed by LDA topic modeling
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {/* Radar */}
        <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em", marginBottom: 14 }}>
            ARTIST TOPIC DISTRIBUTION
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e1e1e" />
              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 10, fill: "#555", fontFamily: "'Space Mono', monospace" }} />
              <PolarRadiusAxis angle={90} domain={[0, 40]} tick={{ fontSize: 8, fill: "#333" }} />
              <Tooltip
                formatter={v => [`${v}%`, ""]}
                contentStyle={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11 }}
              />
              {artists.map(a => (
                <Radar
                  key={a.id}
                  name={a.name}
                  dataKey={a.name}
                  stroke={a.color}
                  fill={a.color}
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, justifyContent: "center" }}>
            {artists.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: a.color }} />
                <span style={{ fontSize: 10, color: "#666", fontFamily: "'Space Mono', monospace" }}>{a.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topic definitions */}
        <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em", marginBottom: 14 }}>
            TOPIC DEFINITIONS
          </p>
          {topics.map((topic, i) => (
            <div key={topic.id} style={{
              marginBottom: 12,
              background: "#111",
              borderRadius: 8,
              padding: "10px 12px",
              borderLeft: `2px solid ${TOPIC_COLORS[i]}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 4,
                  background: TOPIC_COLORS[i] + "25",
                  color: TOPIC_COLORS[i],
                  fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {topic.id}
                </span>
                <span style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.02em" }}>
                  {topic.label}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {topic.words.slice(0, 7).map(w => (
                  <span key={w} style={{
                    fontSize: 10,
                    background: TOPIC_COLORS[i] + "12",
                    color: TOPIC_COLORS[i],
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem" }}>
        <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em", marginBottom: 14 }}>
          GAMMA WEIGHTS — ARTIST → TOPIC AFFINITY
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#444", fontWeight: 600, fontSize: 10, letterSpacing: "0.08em", fontFamily: "'Space Mono', monospace" }}>
                  ARTIST
                </th>
                {topics.map((t, i) => (
                  <th key={t.id} style={{ padding: "8px 12px", color: TOPIC_COLORS[i], fontWeight: 700, textAlign: "center", fontSize: 10, letterSpacing: "0.06em", fontFamily: "'Space Mono', monospace" }}>
                    T{t.id}: {t.label.split(" & ")[0].toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {artistTopicWeights.map((row, ri) => {
                const artist = artists.find(a => a.name === row.artist);
                const maxVal = Math.max(...topics.map(t => row[`topic${t.id}`]));
                return (
                  <tr key={row.artist} style={{ borderBottom: "1px solid #111" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 700, color: artist?.color || "#e8e4dc", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
                      {row.artist}
                    </td>
                    {topics.map((t, i) => {
                      const val = row[`topic${t.id}`];
                      const isTop = val === maxVal;
                      return (
                        <td key={t.id} style={{ padding: "10px 12px", textAlign: "center" }}>
                          <span style={{
                            background: isTop ? TOPIC_COLORS[i] + "22" : "transparent",
                            color: isTop ? TOPIC_COLORS[i] : "#555",
                            fontWeight: isTop ? 700 : 400,
                            padding: "3px 8px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontFamily: "'Space Mono', monospace",
                          }}>
                            {(val * 100).toFixed(1)}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
