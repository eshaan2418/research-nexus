// ============================================================
// Easy customization: edit values below to update site content.
// ============================================================

export const SITE_CONFIG = {
  // Tagline shown above the diagram (uppercase, wide tracking)
  tagline: "INTELLIGENT · COMPUTING · APPLIED · LEARNING",
  // Acronym shown in the black center hub
  acronym: "IC@L",
  // Full program name (used for SEO)
  programName: "IC@L — Intelligent Computing & Applied Learning",
};

export type AreaId = "ra1" | "ra2" | "ra3" | "ra4";

export interface ResearchArea {
  id: AreaId;
  // Multi-line label (each string is its own line in the slice)
  label: string[];
  // True if this slice is decorative (non-clickable)
  decorative?: boolean;
}

// Slice order, clockwise from top-right:
// ra1 top-right, ra2 bottom-right, ra3 bottom-left, ra4 top-left (decorative)
export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "ra1",
    label: ["AI, Machine Learning", "& Computer Vision"],
  },
  {
    id: "ra2",
    label: ["Software Engineering", "& Generative AI"],
  },
  {
    id: "ra3",
    label: ["Cloud, Systems", "& Distributed Computing"],
  },
  {
    id: "ra4",
    label: ["Health, Robotics", "& Applied AI"],
    decorative: true,
  },
];

export interface Faculty {
  id: string;
  name: string; // "First Last"
  // Weight per area (presence indicates membership). Decorative ra4 still allowed.
  areas: Partial<Record<AreaId, number>>;
  // URL or imported asset path for the all-in-one profile image shown in the popup.
  profileImage: string;
}

const ph = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=D6CFCA&fontFamily=IBM%20Plex%20Sans`;

// IC@L members from the member slides deck.
export const FACULTY: Faculty[] = [
  { id: "1", name: "Marcus Brubaker", areas: { ra1: 1 }, profileImage: ph("Marcus Brubaker") },
  { id: "2", name: "Alvine B. Belle", areas: { ra2: 1 }, profileImage: ph("Alvine Belle") },
  { id: "3", name: "Ruth Urner", areas: { ra1: 1 }, profileImage: ph("Ruth Urner") },
  { id: "4", name: "Andrew Eckford", areas: { ra3: 1 }, profileImage: ph("Andrew Eckford") },
  { id: "5", name: "Song Wang", areas: { ra2: 1 }, profileImage: ph("Song Wang") },
  { id: "6", name: "Peter Lian", areas: { ra3: 1 }, profileImage: ph("Peter Lian") },
  { id: "7", name: "Maleknaz Nayebi", areas: { ra2: 1 }, profileImage: ph("Maleknaz Nayebi") },
  { id: "8", name: "Ali Sadeghi-Naini", areas: { ra4: 1 }, profileImage: ph("Ali Sadeghi-Naini") },
  { id: "9", name: "Eric Ruppert", areas: { ra3: 1 }, profileImage: ph("Eric Ruppert") },
  { id: "10", name: "Hadi Hemmati", areas: { ra2: 1 }, profileImage: ph("Hadi Hemmati") },
  { id: "11", name: "Hamzeh Khazaei", areas: { ra3: 1 }, profileImage: ph("Hamzeh Khazaei") },
  { id: "12", name: "Jarek Szlichta", areas: { ra1: 1 }, profileImage: ph("Jarek Szlichta") },
  { id: "13", name: "Jeff Edmonds", areas: { ra1: 1 }, profileImage: ph("Jeff Edmonds") },
  { id: "14", name: "John K. Tsotsos", areas: { ra4: 1 }, profileImage: ph("John Tsotsos") },
  {
    id: "15",
    name: "Laleh Seyyed-Kalantari",
    areas: { ra1: 1 },
    profileImage: ph("Laleh Seyyed-Kalantari"),
  },
  { id: "16", name: "Marin Litoiu", areas: { ra2: 1 }, profileImage: ph("Marin Litoiu") },
  { id: "17", name: "Marios Fokaefs", areas: { ra2: 1 }, profileImage: ph("Marios Fokaefs") },
  { id: "18", name: "Michael Jenkin", areas: { ra4: 1 }, profileImage: ph("Michael Jenkin") },
  { id: "19", name: "Neda Salahandish", areas: { ra4: 1 }, profileImage: ph("Neda Salahandish") },
];
