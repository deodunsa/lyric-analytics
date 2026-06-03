// ─────────────────────────────────────────────────────────────────
// ARTIST DATA
// To add a new artist: copy one of the objects below and fill it in.
// The app will automatically pick it up everywhere.
// ─────────────────────────────────────────────────────────────────

export const artists = [
  {
    id: "jcole",
    name: "J. Cole",
    color: "#378ADD",
    initials: "JC",
    albums: [
      {
        title: "2014 Forest Hills Drive",
        year: 2014,
        compound: -0.202,
        neg: 0.136,
        neu: 0.719,
        pos: 0.144,
        songs: 13,
        topWords: ["love", "time", "life", "save", "cure", "hands", "home", "free", "mind", "god"],
        peakChartPosition: 1,
      },
      {
        title: "4 Your Eyez Only",
        year: 2016,
        compound: -0.395,
        neg: 0.152,
        neu: 0.721,
        pos: 0.127,
        songs: 10,
        topWords: ["eyes", "real", "dope", "sellin", "feel", "die", "time", "understand", "god", "sky"],
        peakChartPosition: 1,
      },
      {
        title: "KOD",
        year: 2018,
        compound: -0.056,
        neg: 0.134,
        neu: 0.722,
        pos: 0.144,
        songs: 12,
        topWords: ["count", "motivate", "money", "smoke", "gimme", "love", "alive", "brick", "pain", "heart"],
        peakChartPosition: 1,
      },
    ],
  },
  {
    id: "kanye",
    name: "Kanye West",
    color: "#EF9F27",
    initials: "KW",
    albums: [
      {
        title: "The College Dropout",
        year: 2004,
        compound: 0.354,
        neg: 0.081,
        neu: 0.809,
        pos: 0.109,
        songs: 21,
        topWords: ["kanye", "hands", "people", "time", "step", "walk", "breath", "school", "music", "beat"],
        peakChartPosition: 2,
      },
      {
        title: "Late Registration",
        year: 2005,
        compound: 0.239,
        neg: 0.100,
        neu: 0.801,
        pos: 0.099,
        songs: 21,
        topWords: ["broke", "forever", "late", "homie", "girl", "day", "feel", "music", "baby", "diamonds"],
        peakChartPosition: 1,
      },
      {
        title: "Graduation",
        year: 2007,
        compound: 0.459,
        neg: 0.107,
        neu: 0.760,
        pos: 0.133,
        songs: 15,
        topWords: ["life", "told", "brother", "study", "hot", "drunk", "girls", "stronger", "lights", "home"],
        peakChartPosition: 1,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC MODEL DATA (LDA — 5 topics from R analysis)
// ─────────────────────────────────────────────────────────────────
export const topics = [
  { id: 1, label: "Love & Identity", words: ["love", "eyes", "life", "feel", "real", "told", "time", "understand", "stronger", "smoke"] },
  { id: 2, label: "Struggle & Streets", words: ["broke", "forever", "sky", "homie", "baby", "dope", "life", "girl", "money", "sellin"] },
  { id: 3, label: "Hustle & Chicago", words: ["count", "time", "pull", "music", "late", "chi", "girl", "wait", "breathe", "workout"] },
  { id: 4, label: "Faith & Motivation", words: ["motivate", "home", "alive", "brother", "god", "hot", "drunk", "love", "time", "money"] },
  { id: 5, label: "Craft & Legacy", words: ["time", "call", "bout", "song", "study", "love", "bad", "falls", "hands", "step"] },
];

// ─────────────────────────────────────────────────────────────────
// SENTIMENT WORD DATA
// ─────────────────────────────────────────────────────────────────
export const sentimentWords = {
  positive: [
    { word: "love", freq: 180 }, { word: "stronger", freq: 95 }, { word: "free", freq: 82 },
    { word: "shine", freq: 74 }, { word: "gold", freq: 68 }, { word: "smile", freq: 61 },
    { word: "top", freq: 57 }, { word: "cure", freq: 53 }, { word: "alive", freq: 49 },
    { word: "champion", freq: 44 }, { word: "glory", freq: 38 }, { word: "fast", freq: 35 },
  ],
  negative: [
    { word: "hard", freq: 160 }, { word: "pain", freq: 140 }, { word: "wrong", freq: 118 },
    { word: "dope", freq: 109 }, { word: "broke", freq: 95 }, { word: "kill", freq: 88 },
    { word: "fall", freq: 76 }, { word: "smoke", freq: 71 }, { word: "shame", freq: 62 },
    { word: "fear", freq: 55 }, { word: "die", freq: 48 }, { word: "bad", freq: 43 },
  ],
};

// ─────────────────────────────────────────────────────────────────
// ARTIST-LEVEL TOPIC WEIGHTS (gamma from LDA)
// ─────────────────────────────────────────────────────────────────
export const artistTopicWeights = [
  { artist: "J. Cole",    topic1: 0.320, topic2: 0.107, topic3: 0.057, topic4: 0.241, topic5: 0.275 },
  { artist: "Kanye West", topic1: 0.089, topic2: 0.288, topic3: 0.258, topic4: 0.171, topic5: 0.193 },
];
