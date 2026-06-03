import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { artists, sentimentWords } from "../data/artists";

export default function WordExplorer() {
  const [selectedArtist, setSelectedArtist] = useState("all");
  const [sentTab, setSentTab] = useState("positive");

  const getTopWords = () => {
    if (selectedArtist === "all") {
      const all = artists.flatMap(a => a.albums.flatMap(al => al.topWords.map(w => ({ word: w, artist: a.name, color: a.color }))));
      const freq = {};
      all.forEach(({ word, artist, color }) => {
        if (!freq[word]) freq[word] = { word, count: 0, artists: {} };
        freq[word].count += 1;
        freq[word].artists[artist] = (freq[word].artists[artist] || 0) + 1;
      });
      return Object.values(freq).sort((a, b) => b.count - a.count).slice(0, 20);
    }
    const artist = artists.find(a => a.id === selectedArtist);
    const freq = {};
    artist.albums.flatMap(al => al.topWords).forEach(w => {
      freq[w] = (freq[w] || 0) + 1;
    });
    return Object.entries(freq).map(([word, count]) => ({ word, count })).sort((a, b) => b.count - a.count).slice(0, 20);
  };

  const words = getTopWords();
  const sentData = sentimentWords[sentTab].slice(0, 15);

  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#111" }}>Word Explorer</h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
          Most frequent lyrical themes and sentiment-tagged words across all analyzed albums
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#111" }}>Top words by frequency</p>
            <select
              value={selectedArtist}
              onChange={e => setSelectedArtist(e.target.value)}
              style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb", color: "#374151" }}
            >
              <option value="all">All artists</option>
              {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={words} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis type="category" dataKey="word" tick={{ fontSize: 11, fill: "#374151" }} width={60} />
              <Tooltip formatter={(v) => [v, "appearances"]} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {words.map((entry, i) => {
                  if (selectedArtist !== "all") {
                    const artist = artists.find(a => a.id === selectedArtist);
                    return <Cell key={i} fill={artist.color} />;
                  }
                  return <Cell key={i} fill={`hsl(${(i * 18) % 360}, 60%, 55%)`} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#111" }}>Sentiment words (Bing lexicon)</p>
            <div style={{ display: "flex", gap: 6 }}>
              {["positive", "negative"].map(s => (
                <button key={s} onClick={() => setSentTab(s)} style={{
                  padding: "4px 10px", fontSize: 11, borderRadius: 6, cursor: "pointer",
                  background: sentTab === s ? (s === "positive" ? "#1DB954" : "#ef4444") : "#f9fafb",
                  color: sentTab === s ? "#fff" : "#374151",
                  border: sentTab === s ? "none" : "1px solid #e5e7eb",
                  fontWeight: sentTab === s ? 600 : 400,
                }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {sentData.map(({ word, freq }) => {
              const size = 12 + Math.round((freq / sentData[0].freq) * 14);
              const opacity = 0.5 + (freq / sentData[0].freq) * 0.5;
              const color = sentTab === "positive" ? "#15803d" : "#dc2626";
              const bg = sentTab === "positive" ? "#f0fdf4" : "#fef2f2";
              return (
                <span key={word} style={{
                  fontSize: size, color, background: bg,
                  padding: "4px 10px", borderRadius: 20, fontWeight: 500,
                  opacity, border: `1px solid ${sentTab === "positive" ? "#bbf7d0" : "#fecaca"}`
                }}>
                  {word}
                </span>
              );
            })}
          </div>

          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Top album word lists
            </p>
            {artists.map(artist => (
              <div key={artist.id} style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: artist.color, margin: "0 0 4px" }}>{artist.name}</p>
                {artist.albums.map(album => (
                  <div key={album.title} style={{ marginBottom: 6 }}>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 3px" }}>{album.title}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {album.topWords.slice(0, 6).map(w => (
                        <span key={w} style={{
                          fontSize: 11, background: artist.color + "18",
                          color: artist.color, padding: "2px 7px", borderRadius: 10
                        }}>{w}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
