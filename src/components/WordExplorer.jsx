import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { artists, sentimentWords } from "../data/artists";

export default function WordExplorer() {
  const [selectedArtist, setSelectedArtist] = useState("all");
  const [sentTab, setSentTab] = useState("positive");

  const getTopWords = () => {
    if (selectedArtist === "all") {
      const freq = {};
      artists.forEach(a => {
        a.albums.forEach(al => {
          al.topWords.forEach(w => {
            if (!freq[w]) freq[w] = { word: w, count: 0, color: a.color };
            freq[w].count += 1;
          });
        });
      });
      return Object.values(freq).sort((a, b) => b.count - a.count).slice(0, 20);
    }
    const artist = artists.find(a => a.id === selectedArtist);
    const freq = {};
    artist.albums.flatMap(al => al.topWords).forEach(w => {
      freq[w] = (freq[w] || 0) + 1;
    });
    return Object.entries(freq)
      .map(([word, count]) => ({ word, count, color: artist.color }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  };

  const words = getTopWords();
  const sentData = sentimentWords[sentTab].slice(0, 15);
  const currentArtist = selectedArtist !== "all" ? artists.find(a => a.id === selectedArtist) : null;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#1DB954", marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>
          TF-IDF · BING LEXICON
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e8e4dc", letterSpacing: "-0.02em" }}>
          Word Explorer
        </h2>
        <p style={{ color: "#444", fontSize: 12, marginTop: 4 }}>
          Most frequent lyrical themes and sentiment-tagged words
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Frequency chart */}
        <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em" }}>
              TOP WORDS BY FREQUENCY
            </p>
            <select
              value={selectedArtist}
              onChange={e => setSelectedArtist(e.target.value)}
              style={{
                fontSize: 11,
                padding: "5px 10px",
                borderRadius: 6,
                border: "1px solid #2a2a2a",
                color: "#e8e4dc",
                background: "#161616",
                fontFamily: "'Space Mono', monospace",
                cursor: "pointer",
              }}
            >
              <option value="all">All Artists</option>
              {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={words} layout="vertical" margin={{ top: 0, right: 10, left: 44, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#161616" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: "#444", fontFamily: "'Space Mono', monospace" }} />
              <YAxis type="category" dataKey="word" tick={{ fontSize: 10, fill: "#888", fontFamily: "'Space Mono', monospace" }} width={56} />
              <Tooltip
                formatter={v => [v, "appearances"]}
                contentStyle={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11 }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {words.map((entry, i) => (
                  <Cell key={i} fill={entry.color || `hsl(${(i * 23) % 360}, 55%, 55%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment cloud + album words */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem", flex: "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em" }}>
                SENTIMENT WORDS
              </p>
              <div style={{ display: "flex", gap: 4 }}>
                {["positive", "negative"].map(s => (
                  <button key={s} onClick={() => setSentTab(s)} style={{
                    padding: "4px 10px",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    borderRadius: 5,
                    cursor: "pointer",
                    background: sentTab === s
                      ? (s === "positive" ? "#1DB954" : "#ef4444")
                      : "#161616",
                    color: sentTab === s ? (s === "positive" ? "#000" : "#fff") : "#555",
                    border: sentTab === s ? "none" : "1px solid #2a2a2a",
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    transition: "all 0.15s",
                  }}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, minHeight: 90 }}>
              {sentData.map(({ word, freq }) => {
                const size = 11 + Math.round((freq / sentData[0].freq) * 13);
                const opacity = 0.45 + (freq / sentData[0].freq) * 0.55;
                const isPos = sentTab === "positive";
                return (
                  <span key={word} style={{
                    fontSize: size,
                    color: isPos ? "#1DB954" : "#ef4444",
                    background: isPos ? "#1DB95410" : "#ef444410",
                    padding: "3px 9px",
                    borderRadius: 20,
                    fontWeight: 600,
                    opacity,
                    border: `1px solid ${isPos ? "#1DB95422" : "#ef444422"}`,
                    cursor: "default",
                    fontFamily: "'Space Mono', monospace",
                    transition: "opacity 0.2s",
                  }}>
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Album word chips */}
          <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: 12, padding: "1.25rem", flex: 1, overflow: "auto" }}>
            <p style={{ fontWeight: 700, fontSize: 12, color: "#e8e4dc", letterSpacing: "0.04em", marginBottom: 14 }}>
              ALBUM WORD LISTS
            </p>
            {(currentArtist ? [currentArtist] : artists).map(artist => (
              <div key={artist.id} style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: artist.color, marginBottom: 8, letterSpacing: "0.06em" }}>
                  {artist.name.toUpperCase()}
                </p>
                {artist.albums.map(album => (
                  <div key={album.title} style={{ marginBottom: 8 }}>
                    <p style={{ fontSize: 10, color: "#444", marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>
                      {album.title} ({album.year})
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {album.topWords.slice(0, 6).map(w => (
                        <span key={w} style={{
                          fontSize: 10,
                          background: artist.color + "15",
                          color: artist.color,
                          padding: "2px 7px",
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
