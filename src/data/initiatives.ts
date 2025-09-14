export type Initiative = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  tags: string[];
};

export const initiatives: Initiative[] = [
  {
    id: "i-1",
    title: "Marketing Codes of Practice",
    slug: "marketing-codes",
    summary:
      "Strengthening responsible marketing standards and enforcement across regions.",
    image: "/placeholder.jpg",
    tags: ["Policy", "Standards"],
  },
  {
    id: "i-2",
    title: "Combatting Harmful Drinking",
    slug: "harmful-drinking",
    summary:
      "Programs that reduce harmful drinking through community partnerships and education.",
    image: "/placeholder.jpg",
    tags: ["Health", "Community"],
  },
  {
    id: "i-3",
    title: "Underage Drinking Prevention",
    slug: "underage-prevention",
    summary:
      "Evidence-based materials empowering parents and educators to prevent underage drinking.",
    image: "/placeholder.jpg",
    tags: ["Youth", "Education"],
  },
  {
    id: "i-4",
    title: "Drink Driving Reduction",
    slug: "drink-driving",
    summary:
      "Solutions and campaigns that reduce drink driving through tech, policy, and enforcement.",
    image: "/placeholder.jpg",
    tags: ["Safety", "Policy"],
  },
];
