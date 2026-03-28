import { TabGroup, SingleTab } from "./types";

// Flip this to true to see mock data instead of hitting the API
export const USE_MOCK_DATA = false;

export const MOCK_GROUPS: TabGroup[] = [
  {
    id: "g1",
    name: "CS 101",
    color: "blue",
    tabs: [
      { id: "t1", name: "Syllabus", url: "https://example.com/syllabus" },
      { id: "t2", name: "Piazza", url: "https://piazza.com" },
      { id: "t3", name: "Gradescope", url: "https://gradescope.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g2",
    name: "Work",
    color: "green",
    tabs: [
      { id: "t4", name: "Slack", url: "https://slack.com" },
      { id: "t5", name: "Jira", url: "https://jira.atlassian.com" },
      { id: "t6", name: "GitHub", url: "https://github.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g3",
    name: "Research",
    color: "purple",
    tabs: [
      { id: "t7", name: "Scholar", url: "https://scholar.google.com" },
      { id: "t8", name: "arXiv", url: "https://arxiv.org" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g4",
    name: "Social",
    color: "pink",
    tabs: [
      { id: "t9", name: "Twitter", url: "https://twitter.com" },
      { id: "t10", name: "Reddit", url: "https://reddit.com" },
      { id: "t11", name: "Instagram", url: "https://instagram.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g5",
    name: "Finance",
    color: "teal",
    tabs: [
      { id: "t12", name: "Bank", url: "https://chase.com" },
      { id: "t13", name: "Mint", url: "https://mint.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g6",
    name: "News",
    color: "orange",
    tabs: [
      { id: "t14", name: "NYT", url: "https://nytimes.com" },
      { id: "t15", name: "BBC", url: "https://bbc.com" },
      { id: "t16", name: "HN", url: "https://news.ycombinator.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g7",
    name: "Design",
    color: "indigo",
    tabs: [
      { id: "t17", name: "Figma", url: "https://figma.com" },
      { id: "t18", name: "Dribbble", url: "https://dribbble.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g8",
    name: "Music",
    color: "red",
    tabs: [
      { id: "t19", name: "Spotify", url: "https://spotify.com" },
      { id: "t20", name: "SoundCloud", url: "https://soundcloud.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g9",
    name: "Shopping",
    color: "yellow",
    tabs: [
      { id: "t21", name: "Amazon", url: "https://amazon.com" },
      { id: "t22", name: "eBay", url: "https://ebay.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g10",
    name: "Cooking",
    color: "cyan",
    tabs: [
      { id: "t23", name: "AllRecipes", url: "https://allrecipes.com" },
      { id: "t24", name: "Bon Appetit", url: "https://bonappetit.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g11",
    name: "Fitness",
    color: "green",
    tabs: [
      { id: "t25", name: "Strava", url: "https://strava.com" },
      { id: "t26", name: "MyFitnessPal", url: "https://myfitnesspal.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g12",
    name: "Travel",
    color: "blue",
    tabs: [
      { id: "t27", name: "Google Flights", url: "https://flights.google.com" },
      { id: "t28", name: "Airbnb", url: "https://airbnb.com" },
    ],
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_TABS: SingleTab[] = [
  { id: "s1", name: "Gmail", url: "https://mail.google.com", color: "red", createdAt: new Date().toISOString() },
  { id: "s2", name: "Calendar", url: "https://calendar.google.com", color: "blue", createdAt: new Date().toISOString() },
  { id: "s3", name: "Drive", url: "https://drive.google.com", color: "yellow", createdAt: new Date().toISOString() },
  { id: "s4", name: "Canvas", url: "https://canvas.instructure.com", color: "orange", createdAt: new Date().toISOString() },
  { id: "s5", name: "ChatGPT", url: "https://chat.openai.com", color: "green", createdAt: new Date().toISOString() },
  { id: "s6", name: "Claude", url: "https://claude.ai", color: "purple", createdAt: new Date().toISOString() },
  { id: "s7", name: "YouTube", url: "https://youtube.com", color: "red", createdAt: new Date().toISOString() },
  { id: "s8", name: "Notion", url: "https://notion.so", color: "teal", createdAt: new Date().toISOString() },
  { id: "s9", name: "LinkedIn", url: "https://linkedin.com", color: "blue", createdAt: new Date().toISOString() },
  { id: "s10", name: "Vercel", url: "https://vercel.com", color: "indigo", createdAt: new Date().toISOString() },
  { id: "s11", name: "Docs", url: "https://docs.google.com", color: "cyan", createdAt: new Date().toISOString() },
  { id: "s12", name: "Wikipedia", url: "https://wikipedia.org", color: "pink", createdAt: new Date().toISOString() },
];
