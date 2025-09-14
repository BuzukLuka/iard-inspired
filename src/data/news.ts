export type News = {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO
  image: string;
  excerpt: string;
  content: string; // markdown-ish/plain
};

export const news: News[] = [
  {
    id: "n-1",
    slug: "alliance-launches-data-portal",
    title: "Alliance launches new Data Portal for Responsible Choices",
    date: "2025-08-21",
    image: "/placeholder.jpg",
    excerpt:
      "A centralized, up-to-date hub for research, program outcomes, and country profiles.",
    content: `\n**Why it matters** — Evidence accessibility accelerates policy and program design.\n\nThe portal offers country-level indicators, case studies, and downloadable datasets to help practitioners design interventions.\n`,
  },
  {
    id: "n-2",
    slug: "regional-summit-2025",
    title: "Regional Summit 2025: Commitments to reduce drink driving",
    date: "2025-06-10",
    image: "/placeholder.jpg",
    excerpt:
      "Ministers, NGOs, and industry adopted a joint framework to tackle drink driving across borders.",
    content: `\n**Key outcomes** — Cross-border enforcement, roadside testing, and public awareness campaigns were prioritized.\n`,
  },
];
