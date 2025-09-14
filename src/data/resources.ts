export type Resource = {
  id: string;
  title: string;
  type: "Report" | "Toolkit" | "Brief" | "Guidelines";
  year: number;
  image: string;
  summary: string;
  downloadUrl?: string;
  slug?: string;
};

export const resources: Resource[] = [
  {
    id: "r-1",
    title: "Global Standards Toolkit",
    type: "Toolkit",
    year: 2025,
    image: "/placeholder.jpg",
    summary:
      "Practical steps to implement responsible marketing and sales standards.",
    downloadUrl: "#",
  },
  {
    id: "r-2",
    title: "Harmful Drinking: Trends & Data 2024",
    type: "Report",
    year: 2024,
    image: "/placeholder.jpg",
    summary:
      "An annual review of evidence around harmful drinking and effective interventions.",
    downloadUrl: "#",
  },
  {
    id: "r-3",
    title: "Youth Education Brief",
    type: "Brief",
    year: 2023,
    image: "/placeholder.jpg",
    summary:
      "Evidence highlights for policymakers designing youth education programs.",
    slug: "youth-education-brief",
  },
];
