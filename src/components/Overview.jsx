import React from "react";
import { artists } from "../data/artists";

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: "#111",
      border: "1px solid #1e1e1e",
      borderRadius: 10,
      padding: "16px 18px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: accent || "#1DB954",
        opacity: 0.6,
      }} />
      <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: 8 }}>
        {label}
      </p>
      <p style={{
        fontSize: 26, fontWeight: 800, color: "#e8e4dc", letterSpacing: "-0.03em",
        lineHeight: 1, marginBottom: 4,
        fontFamily: "'Space Mono', monospace",
      }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: 11, color: "#444" }}>{sub}</p>}
    </div>
  );
}

export default function Overview({ setActiveTab }) {
  const allAlbums = artists.flatMap(a => a.albums.map(al => ({ ...al, artist: a.name, color: a.color })));
  const totalSongs = allAlbums.reduce((s, a) => s + a.songs, 0);
  const mostPositive = [...allAlbums].sort((a, b) => b.compound - a.compound)[0];

  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid #161616" }}>
        <p style={{
          fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
          color: "#1DB954", marginBottom: 12, fontFamily: "'Space Mono', monospace"
        }}>
          NLP · VADER · TF-IDF · LDA
        </p>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 46px)",
          fontWeight: 800,
          color: "#e8e4dc",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          marginBottom: 14,
        }}>
          Rap Lyrics<br />
          <span style={{ color: "#1DB954" }}>Intelligence</span>
        </h1>
        <p style={{ color: "#555", fontSize: 14, maxWidth: 500, lineHeight: 1.6 }}>
          Sentiment analysis, topic modeling, and lyrical comparison across hip-hop's defining albums — built with VADER, TF-IDF, K-means, and LDA.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "2rem" }}>
        <StatCard label="Artists" value={artists.length} sub="5 artists analyzed" accent="#1DB954" />
        <StatCard label="Albums" value={allAlbums.length} sub="Across all catalogs" accent="#378ADD" />
        <StatCard label="Songs" value={totalSongs} sub="Fully NLP-analyzed" accent="#EF9F27" />
        <StatCard label="Most Positive" value={mostPositive.title.split(" ").slice(0, 2).join(" ")} sub={`+${mostPositive.compound.toFixed(3)} compound`} accent="#a855f7" />
      </div>

      {/* Artist Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12, marginBottom: "2rem" }}>
        {artists.map((artist) => (
          <div key={artist.id} style={{
            background: "#0e0e0e",
            border: "1px solid #1a1a1a",
            borderRadius: 12,
            padding: "1.25rem",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = artist.color + "44"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
          >
            {/* Artist header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 8,
                background: artist.color + "1a",
                border: `1px solid ${artist.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: artist.color,
                fontFamily: "'Space Mono', monospace",
                flexShrink: 0,
              }}>
                {artist.initials}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#e8e4dc", letterSpacing: "-0.01em" }}>
                  {artist.name}
                </p>
                <p style={{ fontSize: 11, color: "#444", marginTop: 2 }}>
                  {artist.albums.length} albums · {artist.albums.reduce((s, a) => s + a.songs, 0)} songs
                </p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <span style={{
                  fontSize: 10, letterSpacing: "0.08em",
                  color: artist.color,
                  background: artist.color + "18",
                  padding: "3px 8px", borderRadius: 4,
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {artist.albums.reduce((s,a) => s + a.compound, 0) >= 0 ? "+" : ""}
                  {(artist.albums.reduce((s,a) => s + a.compound, 0) / artist.albums.length).toFixed(3)}
                </span>
              </div>
            </div>

            {/* Album bars */}
            {artist.albums.map(album => {
              const pct = Math.max(4, ((album.compound + 0.6) / 1.2) * 100);
              const isPos = album.compound >= 0;
              return (
                <div key={album.title} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#777" }}>
                      {album.title}{" "}
                      <span style={{ color: "#333" }}>({album.year})</span>
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: isPos ? "#1DB954" : "#ef4444",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {isPos ? "+" : ""}{album.compound.toFixed(3)}
                    </span>
                  </div>
                  <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2 }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${artist.color}99, ${artist.color})`,
                      borderRadius: 2,
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        background: "#0e0e0e",
        border: "1px solid #1DB95422",
        borderRadius: 12,
        padding: "1.25rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 13, color: "#e8e4dc", marginBottom: 3 }}>
            Ready to go deeper?
          </p>
          <p style={{ fontSize: 12, color: "#444" }}>
            Compare artists head-to-head, explore word frequencies, or track sentiment over time.
          </p>
        </div>
        <button
          onClick={() => setActiveTab("headtohead")}
          style={{
            padding: "9px 18px",
            background: "#1DB954",
            color: "#000",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Syne', sans-serif",
            cursor: "pointer",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          COMPARE →
        </button>
      </div>
    </div>
  );
}
