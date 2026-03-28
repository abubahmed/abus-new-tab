import { TabGroup, SingleTab } from "./types";

// Flip this to true to see mock data instead of hitting the API
export const USE_MOCK_DATA = true;

export const MOCK_GROUPS: TabGroup[] = [
  {
    id: "g1",
    name: "CS 101",
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
    tabs: [
      { id: "t4", name: "Slack", url: "https://slack.com" },
      { id: "t5", name: "Jira", url: "https://jira.atlassian.com" },
      { id: "t6", name: "GitHub", url: "https://github.com" },
      { id: "t7", name: "Notion", url: "https://notion.so" },
      { id: "t8", name: "Figma", url: "https://figma.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g3",
    name: "Research",
    tabs: [
      { id: "t9", name: "Scholar", url: "https://scholar.google.com" },
      { id: "t10", name: "arXiv", url: "https://arxiv.org" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g4",
    name: "Social",
    tabs: [
      { id: "t11", name: "Twitter", url: "https://twitter.com" },
      { id: "t12", name: "Reddit", url: "https://reddit.com" },
      { id: "t13", name: "Instagram", url: "https://instagram.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g5",
    name: "Finance",
    tabs: [
      { id: "t14", name: "Bank", url: "https://chase.com" },
      { id: "t15", name: "Mint", url: "https://mint.com" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "g6",
    name: "News",
    tabs: [
      { id: "t16", name: "NYT", url: "https://nytimes.com" },
      { id: "t17", name: "BBC", url: "https://bbc.com" },
      { id: "t18", name: "HN", url: "https://news.ycombinator.com" },
    ],
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_TABS: SingleTab[] = [
  { id: "s1", name: "Gmail", url: "https://mail.google.com", createdAt: new Date().toISOString() },
  { id: "s2", name: "Calendar", url: "https://calendar.google.com", createdAt: new Date().toISOString() },
  { id: "s3", name: "Drive", url: "https://drive.google.com", createdAt: new Date().toISOString() },
  { id: "s4", name: "Canvas", url: "https://canvas.instructure.com", createdAt: new Date().toISOString() },
  { id: "s5", name: "ChatGPT", url: "https://chat.openai.com", createdAt: new Date().toISOString() },
  { id: "s6", name: "Claude", url: "https://claude.ai", createdAt: new Date().toISOString() },
  { id: "s7", name: "YouTube", url: "https://youtube.com", createdAt: new Date().toISOString() },
  { id: "s8", name: "Notion", url: "https://notion.so", createdAt: new Date().toISOString() },
  { id: "s9", name: "LinkedIn", url: "https://linkedin.com", createdAt: new Date().toISOString() },
  { id: "s10", name: "Vercel", url: "https://vercel.com", createdAt: new Date().toISOString() },
  { id: "s11", name: "Docs", url: "https://docs.google.com", createdAt: new Date().toISOString() },
  { id: "s12", name: "Wikipedia", url: "https://wikipedia.org", createdAt: new Date().toISOString() },
];
