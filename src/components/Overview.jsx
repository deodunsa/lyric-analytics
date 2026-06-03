import React from "react";
import { artists } from "../data/artists";

function MetricCard({ label, value, sub }) {
  return (
    <div style={{
      background: "#f9fafb", borderRadius: 10, padding: "14px 16px",
      border: "1px solid #e5e7eb"
    }}>
      <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 600, color: "#111", margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: "#9ca3af", margin: "3px 0 0" }}>{sub}</p>}
    </div>
  );
}

export default function Overview({ setActiveTab }) {
  const allAlbums = artists.flatMap(a => a.albums.map(al => ({ ...al, artist: a.name, color: a.color })));
  const totalSongs = allAlbums.reduce((s, a) => s + a.songs, 0);
  const mostPositive = [...allAlbums].sort((a, b) => b.compound - a.compound)[0];
  const mostNegative = [...allAlbums].sort((a, b) => a.compound - b.compound)[0];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>
          Rap Lyrics Intelligence
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
          NLP-powered sentiment analysis, topic modeling, and lyrical comparison across hip-hop's greatest albums.
          Built with VADER, TF-IDF, K-means, and LDA.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "1.5rem" }}>
        <MetricCard label="Artists" value={artists.length} sub="More coming soon" />
        <MetricCard label="Albums" value={allAlbums.length} sub={artists.map(a => a.name).join(" · ")} />
        <MetricCard label="Songs" value={totalSongs} sub="Fully analyzed" />
        <MetricCard label="Most positive album" value={mostPositive.title} sub={`compound: +${mostPositive.compound.toFixed(2)}`} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {artists.map(artist => (
          <div key={artist.id} style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 12, padding: "1.25rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: artist.color + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: artist.color
              }}>{artist.initials}</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#111" }}>{artist.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>{artist.albums.length} albums · {artist.albums.reduce((s, a) => s + a.songs, 0)} songs</p>
              </div>
            </div>
            {artist.albums.map(album => {
              const pct = ((album.compound + 0.5) / 1.0) * 100;
              const isPos = album.compound >= 0;
              return (
                <div key={album.title} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: "#374151" }}>{album.title} <span style={{ color: "#9ca3af" }}>({album.year})</span></span>
                    <span style={{ fontWeight: 600, color: isPos ? "#15803d" : "#dc2626" }}>
                      {isPos ? "+" : ""}{album.compound.toFixed(3)}
                    </span>
                  </div>
                  <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${Math.max(4, pct)}%`,
                      background: artist.color, borderRadius: 3, transition: "width 0.5s"
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{
        background: "#f0fdf4", border: "1px solid #bbf7d0",
        borderRadius: 12, padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: 14, color: "#166534" }}>
            Want to explore deeper?
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#15803d" }}>
            Check the Sentiment Timeline, Word Explorer, and Head-to-Head tabs.
          </p>
        </div>
        <button
          onClick={() => setActiveTab("headtohead")}
          style={{
            padding: "8px 16px", background: "#1DB954", color: "#fff",
            border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
          }}
        >
          Compare artists →
        </button>
      </div>
    </div>
  );
}
