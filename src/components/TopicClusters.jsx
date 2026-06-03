import React from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { topics, artistTopicWeights, artists } from "../data/artists";

const TOPIC_COLORS = ["#378ADD", "#1DB954", "#EF9F27", "#8b5cf6", "#ef4444"];

export default function TopicClusters() {
  const radarData = topics.map((t, i) => {
    const row = { topic: t.label.split(" & ")[0] };
    artistTopicWeights.forEach(aw => {
      row[aw.artist] = +(aw[`topic${t.id}`] * 100).toFixed(1);
    });
    return row;
  });

  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#111" }}>Topic Clusters</h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
          LDA topic modeling (5 topics, R — topicmodels) reveals the dominant lyrical themes for each artist
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ margin: "0 0 14px", fontWeight: 600, fontSize: 14, color: "#111" }}>
            Artist topic distribution (radar)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 11, fill: "#374151" }} />
              <PolarRadiusAxis angle={90} domain={[0, 40]} tick={{ fontSize: 9, fill: "#9ca3af" }} />
              <Tooltip formatter={(v) => [`${v}%`, ""]} />
              <Legend />
              {artists.map(a => (
                <Radar
                  key={a.id}
                  name={a.name}
                  dataKey={a.name}
                  stroke={a.color}
                  fill={a.color}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ margin: "0 0 14px", fontWeight: 600, fontSize: 14, color: "#111" }}>
            Topic definitions
          </p>
          {topics.map((topic, i) => (
            <div key={topic.id} style={{
              marginBottom: 12, background: "#f9fafb",
              borderRadius: 8, padding: "10px 12px",
              borderLeft: `3px solid ${TOPIC_COLORS[i]}`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%", background: TOPIC_COLORS[i],
                  color: "#fff", fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{topic.id}</span>
                <span style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>{topic.label}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {topic.words.slice(0, 7).map(w => (
                  <span key={w} style={{
                    fontSize: 11, background: TOPIC_COLORS[i] + "18",
                    color: TOPIC_COLORS[i], padding: "2px 7px", borderRadius: 10
                  }}>{w}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
        <p style={{ margin: "0 0 14px", fontWeight: 600, fontSize: 14, color: "#111" }}>
          Artist → topic affinity scores (gamma weights from LDA)
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#6b7280", fontWeight: 600 }}>Artist</th>
                {topics.map((t, i) => (
                  <th key={t.id} style={{ padding: "8px 12px", color: TOPIC_COLORS[i], fontWeight: 600, textAlign: "center" }}>
                    T{t.id}: {t.label.split(" & ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {artistTopicWeights.map((row, ri) => (
                <tr key={row.artist} style={{ borderBottom: "1px solid #f3f4f6", background: ri % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: artists.find(a => a.name === row.artist)?.color }}>
                    {row.artist}
                  </td>
                  {topics.map((t, i) => {
                    const val = row[`topic${t.id}`];
                    const isTop = Math.max(...topics.map(tt => row[`topic${tt.id}`])) === val;
                    return (
                      <td key={t.id} style={{ padding: "10px 12px", textAlign: "center" }}>
                        <span style={{
                          background: isTop ? TOPIC_COLORS[i] + "20" : "transparent",
                          color: isTop ? TOPIC_COLORS[i] : "#374151",
                          fontWeight: isTop ? 700 : 400,
                          padding: "3px 8px", borderRadius: 6
                        }}>
                          {(val * 100).toFixed(1)}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
