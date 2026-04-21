// ============================================================
// Easy customization: edit values below to update site content.
// ============================================================

export const SITE_CONFIG = {
  // 4 short words separated by ·
  tagline: "DISCOVER · CREATE · SUSTAIN · LEAD",
  // Acronym shown in the red center hub
  acronym: "MTEC",
  // Full program name (used for SEO)
  programName: "Manufacturing & Technology Ecosystem Collaborative",
};

export type AreaId = "ra1" | "ra2" | "ra3" | "ra4";

export interface ResearchArea {
  id: AreaId;
  label: string;
  // Tailwind class referencing the design token color (var(--area-N))
  colorVar: string;
  // True if this slice is decorative (non-clickable)
  decorative?: boolean;
}

export const RESEARCH_AREAS: ResearchArea[] = [
  { id: "ra1", label: "Advanced Materials", colorVar: "var(--area-1)" },
  { id: "ra2", label: "Smart Manufacturing", colorVar: "var(--area-2)" },
  { id: "ra3", label: "Sustainable Energy", colorVar: "var(--area-3)" },
  { id: "ra4", label: "Entrepreneurship", colorVar: "var(--area-4)", decorative: true },
];

export interface Faculty {
  id: string;
  name: string; // "First Last"
  // Weight per area (presence indicates membership). Decorative ra4 still allowed.
  areas: Partial<Record<AreaId, number>>;
  // URL or imported asset path for the all-in-one profile image shown in the popup.
  profileImage: string;
}

// Demo faculty — replace with real entries.
// Profile images use a clean placeholder service so the popup looks reasonable
// out of the box. Swap profileImage for an uploaded image URL when available.
const ph = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=D6CFCA&fontFamily=IBM%20Plex%20Sans`;

export const FACULTY: Faculty[] = [
  {
    id: "1",
    name: "Amelia Chen",
    areas: { ra1: 1, ra2: 1 },
    profileImage: ph("Amelia Chen"),
  },
  {
    id: "2",
    name: "Marcus Okafor",
    areas: { ra2: 1, ra3: 1 },
    profileImage: ph("Marcus Okafor"),
  },
  {
    id: "3",
    name: "Priya Raman",
    areas: { ra1: 1, ra3: 1 },
    profileImage: ph("Priya Raman"),
  },
  {
    id: "4",
    name: "Henrik Larsen",
    areas: { ra3: 1, ra4: 1 },
    profileImage: ph("Henrik Larsen"),
  },
  {
    id: "5",
    name: "Sofia Marquez",
    areas: { ra2: 1, ra4: 1 },
    profileImage: ph("Sofia Marquez"),
  },
  {
    id: "6",
    name: "David Park",
    areas: { ra1: 1 },
    profileImage: ph("David Park"),
  },
  {
    id: "7",
    name: "Yuki Tanaka",
    areas: { ra2: 1, ra3: 1, ra4: 1 },
    profileImage: ph("Yuki Tanaka"),
  },
  {
    id: "8",
    name: "Olivia Brooks",
    areas: { ra1: 1, ra4: 1 },
    profileImage: ph("Olivia Brooks"),
  },
];
