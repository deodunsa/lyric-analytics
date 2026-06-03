import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { artists } from "../data/artists";

function StatRow({ label, left, right, leftColor, rightColor, higherIsBetter = true }) {
  const leftWins = higherIsBetter ? left > right : left < right;
  const rightWins = higherIsBetter ? right > left : right < left;
  const fmt = v => typeof v === "number" ? (v > 0 ? "+" : "") + v.toFixed(3) : v;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 0",
      borderBottom: "1px solid #111",
    }}>
      <div style={{ flex: 1, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
        {leftWins && (
          <span style={{
            fontSize: 9, background: leftColor + "22", color: leftColor,
            padding: "2px 5px", borderRadius: 3, fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
          }}>▲</span>
        )}
        <span style={{
          fontWeight: leftWins ? 700 : 400,
          color: leftWins ? leftColor : "#555",
          fontSize: 12,
          fontFamily: "'Space Mono', monospace",
        }}>
          {fmt(left)}
        </span>
      </div>
      <div style={{
        width: 150, textAlign: "center",
        fontSize: 10, color: "#444",
        letterSpacing: "0.06em",
        fontFamily: "'Space Mono', monospace",
        flexShrink: 0,
      }}>
        {label.toUpperCase()}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          fontWeight: rightWins ? 700 : 400,
          color: rightWins ? rightColor : "#555",
          fontSize: 12,
          fontFamily: "'Space Mono', monospace",
        }}>
          {fmt(right)}
        </span>
        {rightWins && (
          <span style={{
            fontSize: 9, background: rightColor + "22", color: rightColor,
            padding: "2px 5px", borderRadius: 3, fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
          }}>▲</span>
        )}
      </div>
    </div>
  );
}

export default function HeadToHead() {
  const [leftId, setLeftId] = useState(artists[0].id);
  const [rightId, setRightId] = useState(artists[1].id);

  const L = artists.find(a => a.id === leftId);
  const R = artists.find(a => a.id === rightId);

  const avg = (artist, key) => artist.albums.reduce((s, a) => s + a[key], 0) / artist.albums.length;
  const totalSongs = a => a.albums.reduce((s, al) => s + al.songs, 0);
  const no1s = a => a.albums.filter(al => al.peakChartPosition === 1).length;

  const comparisonData = [
    { metric: "Compound", [L.name]: +avg(L, "compound").toFixed(3), [R.name]: +avg(R, "compound").toFixed(3) },
    { metric: "Positive",  [L.name]: +avg(L, "pos").toFixed(3),     [R.name]: +avg(R, "pos").toFixed(3) },
    { metric: "Negative",  [L.name]: +avg(L, "neg").toFixed(3),     [R.name]: +avg(R, "neg").toFixed(3) },
  ];

  const selectStyle = (artist) => ({
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: `1px solid ${artist.color}44`,
    fontSize: 13,
    fontWeight: 700,
    color: artist.color,
    background: artist.color + "0d",
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer",
    outline: "none",
  });

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#1DB954", marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>
          ARTIST COMPARISON
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e8e4dc", letterSpacing: "-0.02em" }}>
          Head-to-Head
        </h2>
        <p style={{ color: "#444", fontSize: 12, marginTop: 4 }}>
          Compare any two artists across sentiment, topics, and lyrical themes
        </p>
      </div>

      {/* Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <select value={leftId} onChange={e => setLeftId(e.target.value)} style={selectStyle(L)}>
          {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <span style={{
          fontWeight: 800, color: "#333", fontSize: 13,
          fontFamily: "'Space Mono', monospace", flexShrink: 0,
        }}>VS</span>
        <select value={rightId} onChange={e => setRightId(e.target.value)} style={selectStyle(R)}>
          {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      {/* Stat table */}
      <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #1a1a1a" }}>
          <span style={{ fontWeight: 800, fontSize: 13, color: L.color, fontFamily: "'Space Mono', monospace" }}>{L.name.toUpperCase()}</span>
          <span style={{ fontWeight: 600, fontSize: 10, color: "#333", fontFamily: "'Space Mono', monospace", alignSelf: "center" }}>METRIC</span>
          <span style={{ fontWeight: 800, fontSize: 13, color: R.color, fontFamily: "'Space Mono', monospace" }}>{R.name.toUpperCase()}</span>
        </div>
        <StatRow label="Avg compound" left={avg(L,"compound")} right={avg(R,"compound")} leftColor={L.color} rightColor={R.color} />
        <StatRow label="Avg positivity" left={avg(L,"pos")} right={avg(R,"pos")} leftColor={L.color} rightColor={R.color} />
        <StatRow label="Avg negativity" left={avg(L,"neg")} right={avg(R,"neg")} leftColor={L.color} rightColor={R.color} higherIsBetter={false} />
        <StatRow label="Total songs" left={totalSongs(L)} right={totalSongs(R)} leftColor={L.color} rightColor={R.color} />
        <StatRow label="#1 albums" left={no1s(L)} right={no1s(R)} leftColor={L.color} rightColor={R.color} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Bar chart */}
        <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em", marginBottom: 14 }}>
            SENTIMENT METRIC COMPARISON
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#161616" />
              <XAxis dataKey="metric" tick={{ fontSize: 10, fill: "#555", fontFamily: "'Space Mono', monospace" }} />
              <YAxis tick={{ fontSize: 10, fill: "#555" }} />
              <Tooltip
                contentStyle={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11 }}
              />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Space Mono', monospace" }} />
              <Bar dataKey={L.name} fill={L.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey={R.name} fill={R.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Album bars */}
        <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em", marginBottom: 14 }}>
            ALBUM-LEVEL COMPOUND SCORES
          </p>
          {[L, R].map(artist => (
            <div key={artist.id} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: artist.color, marginBottom: 8, letterSpacing: "0.08em", fontFamily: "'Space Mono', monospace" }}>
                {artist.name.toUpperCase()}
              </p>
              {artist.albums.map(album => {
                const pct = Math.max(4, ((album.compound + 0.6) / 1.2) * 100);
                const isPos = album.compound >= 0;
                return (
                  <div key={album.title} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 10, color: "#666" }}>{album.title}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700,
                        color: isPos ? "#1DB954" : "#ef4444",
                        fontFamily: "'Space Mono', monospace",
                      }}>
                        {isPos ? "+" : ""}{album.compound.toFixed(3)}
                      </span>
                    </div>
                    <div style={{ height: 3, background: "#161616", borderRadius: 2 }}>
                      <div style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${artist.color}88, ${artist.color})`,
                        borderRadius: 2,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
