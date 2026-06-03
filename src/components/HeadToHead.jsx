import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { artists } from "../data/artists";

function StatRow({ label, left, right, leftColor, rightColor, higherIsBetter = true }) {
  const leftWins = higherIsBetter ? left > right : left < right;
  const rightWins = higherIsBetter ? right > left : right < left;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
      <div style={{ flex: 1, textAlign: "right" }}>
        <span style={{
          fontWeight: leftWins ? 700 : 400,
          color: leftWins ? leftColor : "#374151",
          fontSize: 14
        }}>{typeof left === "number" ? (left > 0 ? "+" : "") + left.toFixed(3) : left}</span>
        {leftWins && <span style={{ marginLeft: 6, fontSize: 10, background: leftColor + "22", color: leftColor, padding: "2px 6px", borderRadius: 8, fontWeight: 600 }}>▲</span>}
      </div>
      <div style={{ width: 160, textAlign: "center", fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{label}</div>
      <div style={{ flex: 1 }}>
        {rightWins && <span style={{ marginRight: 6, fontSize: 10, background: rightColor + "22", color: rightColor, padding: "2px 6px", borderRadius: 8, fontWeight: 600 }}>▲</span>}
        <span style={{
          fontWeight: rightWins ? 700 : 400,
          color: rightWins ? rightColor : "#374151",
          fontSize: 14
        }}>{typeof right === "number" ? (right > 0 ? "+" : "") + right.toFixed(3) : right}</span>
      </div>
    </div>
  );
}

export default function HeadToHead() {
  const [leftId, setLeftId] = useState(artists[0].id);
  const [rightId, setRightId] = useState(artists[1].id);

  const leftArtist = artists.find(a => a.id === leftId);
  const rightArtist = artists.find(a => a.id === rightId);

  const avgCompound = (artist) => {
    const vals = artist.albums.map(a => a.compound);
    return vals.reduce((s, v) => s + v, 0) / vals.length;
  };
  const avgPos = (artist) => artist.albums.reduce((s, a) => s + a.pos, 0) / artist.albums.length;
  const avgNeg = (artist) => artist.albums.reduce((s, a) => s + a.neg, 0) / artist.albums.length;
  const totalSongs = (artist) => artist.albums.reduce((s, a) => s + a.songs, 0);
  const no1Albums = (artist) => artist.albums.filter(a => a.peakChartPosition === 1).length;

  const comparisonData = [
    {
      metric: "Avg Compound",
      [leftArtist.name]: +avgCompound(leftArtist).toFixed(3),
      [rightArtist.name]: +avgCompound(rightArtist).toFixed(3),
    },
    {
      metric: "Avg Positive",
      [leftArtist.name]: +avgPos(leftArtist).toFixed(3),
      [rightArtist.name]: +avgPos(rightArtist).toFixed(3),
    },
    {
      metric: "Avg Negative",
      [leftArtist.name]: +avgNeg(leftArtist).toFixed(3),
      [rightArtist.name]: +avgNeg(rightArtist).toFixed(3),
    },
  ];

  const albumData = [
    ...leftArtist.albums.map(a => ({ name: a.title.length > 14 ? a.title.slice(0, 14) + "…" : a.title, [leftArtist.name]: a.compound })),
    ...rightArtist.albums.map(a => ({ name: a.title.length > 14 ? a.title.slice(0, 14) + "…" : a.title, [rightArtist.name]: a.compound })),
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#111" }}>Head-to-Head</h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
          Compare any two artists side-by-side across sentiment, topics, and lyrical themes
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <select
          value={leftId}
          onChange={e => setLeftId(e.target.value)}
          style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `2px solid ${leftArtist.color}`, fontSize: 14, fontWeight: 600, color: leftArtist.color, background: leftArtist.color + "11" }}
        >
          {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <span style={{ fontWeight: 700, color: "#9ca3af", fontSize: 16 }}>VS</span>
        <select
          value={rightId}
          onChange={e => setRightId(e.target.value)}
          style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `2px solid ${rightArtist.color}`, fontSize: 14, fontWeight: 600, color: rightArtist.color, background: rightArtist.color + "11" }}
        >
          {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: leftArtist.color }}>{leftArtist.name}</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#9ca3af" }}>metric</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: rightArtist.color }}>{rightArtist.name}</span>
        </div>
        <StatRow label="Avg compound sentiment" left={avgCompound(leftArtist)} right={avgCompound(rightArtist)} leftColor={leftArtist.color} rightColor={rightArtist.color} />
        <StatRow label="Avg positivity score" left={avgPos(leftArtist)} right={avgPos(rightArtist)} leftColor={leftArtist.color} rightColor={rightArtist.color} />
        <StatRow label="Avg negativity score" left={avgNeg(leftArtist)} right={avgNeg(rightArtist)} leftColor={leftArtist.color} rightColor={rightArtist.color} higherIsBetter={false} />
        <StatRow label="Total songs analyzed" left={totalSongs(leftArtist)} right={totalSongs(rightArtist)} leftColor={leftArtist.color} rightColor={rightArtist.color} />
        <StatRow label="#1 albums in dataset" left={no1Albums(leftArtist)} right={no1Albums(rightArtist)} leftColor={leftArtist.color} rightColor={rightArtist.color} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ margin: "0 0 14px", fontWeight: 600, fontSize: 14, color: "#111" }}>Sentiment metric comparison</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="metric" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey={leftArtist.name} fill={leftArtist.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey={rightArtist.name} fill={rightArtist.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ margin: "0 0 14px", fontWeight: 600, fontSize: 14, color: "#111" }}>Album-level compound scores</p>
          <div>
            {[leftArtist, rightArtist].map(artist => (
              <div key={artist.id} style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: artist.color, margin: "0 0 6px" }}>{artist.name}</p>
                {artist.albums.map(album => {
                  const pct = ((album.compound + 0.6) / 1.2) * 100;
                  const isPos = album.compound >= 0;
                  return (
                    <div key={album.title} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                        <span style={{ color: "#374151" }}>{album.title}</span>
                        <span style={{ fontWeight: 600, color: isPos ? "#15803d" : "#dc2626" }}>
                          {isPos ? "+" : ""}{album.compound.toFixed(3)}
                        </span>
                      </div>
                      <div style={{ height: 5, background: "#f3f4f6", borderRadius: 3 }}>
                        <div style={{ height: "100%", width: `${Math.max(4, pct)}%`, background: artist.color, borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
