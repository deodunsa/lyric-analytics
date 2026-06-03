# Lyric Analytics 🎵

> NLP-powered sentiment analysis, topic modeling, and lyrical comparison across hip-hop's greatest albums.

**Live demo:** _(coming soon — deploy to Vercel or Netlify)_

---

## What it does

Lyric Analytics lets you explore the emotional and thematic DNA of rap albums using real NLP methods:

- **Sentiment scoring** — VADER compound scores per album, visualized over time
- **Word frequency analysis** — most common lyrical themes, per artist and album
- **Topic modeling** — LDA (5 topics) revealing dominant themes across all songs
- **Head-to-head comparison** — compare any two artists side-by-side
- **Sentiment word clouds** — Bing lexicon positive/negative word frequencies

---

## Artists & albums currently analyzed

| Artist | Albums |
|--------|--------|
| J. Cole | 2014 Forest Hills Drive, 4 Your Eyez Only, KOD |
| Kanye West | The College Dropout, Late Registration, Graduation |

> More artists coming — Drake, Kendrick Lamar, Tyler the Creator, SZA, and more.

---

## Tech stack

**NLP / Data Analysis (R)**
- `VADER` — compound sentiment scoring per song
- `tidytext` + `tidyverse` — tokenization, cleaning, TF-IDF
- `topicmodels` — LDA topic modeling (5 topics, 92 songs)
- `igraph` — bigram network graphs
- `wordcloud` + `ggplot2` — visualization

**Frontend**
- React 18
- Recharts — all charts and visualizations
- Lucide React — icons

---

## Adding a new artist

Open `src/data/artists.js` and add a new object to the `artists` array:

```js
{
  id: "drake",
  name: "Drake",
  color: "#a855f7",
  initials: "DR",
  albums: [
    {
      title: "Take Care",
      year: 2011,
      compound: 0.12,       // from VADER analysis
      neg: 0.09,
      neu: 0.78,
      pos: 0.13,
      songs: 20,
      topWords: ["love", "night", "feel", ...],
      peakChartPosition: 1,
    },
  ],
}
```

The app picks it up automatically in every tab — no other changes needed.

---

## Run locally

```bash
git clone https://github.com/deodunsa/lyric-analytics.git
cd lyric-analytics
npm install
npm start
```

---

## Project structure

```
src/
├── data/
│   └── artists.js        ← all artist/album data lives here
├── components/
│   ├── Header.jsx
│   ├── Overview.jsx
│   ├── SentimentTimeline.jsx
│   ├── WordExplorer.jsx
│   ├── TopicClusters.jsx
│   └── HeadToHead.jsx
└── App.js
```

---

## Roadmap

- [ ] Billboard Hot 100 API integration — correlate sentiment with chart performance
- [ ] Spotify API layer — cross-reference audio features (valence, energy) with lyric sentiment
- [ ] Add Drake, Kendrick Lamar, Tyler the Creator, SZA
- [ ] Song-level drill-down view
- [ ] Bigram network graph visualization (interactive)
- [ ] Deploy to Vercel

---

Built by [@deodunsa](https://github.com/deodunsa)
