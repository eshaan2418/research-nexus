// ============================================================
// Easy customization: edit values below to update site content.
// ============================================================

export const SITE_CONFIG = {
  // Tagline shown above the diagram (uppercase, wide tracking)
  tagline: "MANUFACTURING · TECHNOLOGY · ENTREPRENEURSHIP · INDUSTRY PARTNERSHIP",
  // Acronym shown in the black center hub
  acronym: "MTEC",
  // Full program name (used for SEO)
  programName: "Manufacturing, Technology & Entrepreneurship Collaborative",
};

export type AreaId = "ra1" | "ra2" | "ra3" | "ra4";

export interface ResearchArea {
  id: AreaId;
  // Multi-line label (each string is its own line in the slice)
  label: string[];
  // True if this slice is decorative (non-clickable)
  decorative?: boolean;
}

// Order matches the reference image, starting top-right and going clockwise:
// top-right: Additive Manufacturing... | bottom-right: Advanced Materials...
// bottom-left: Sustainable Energy...   | top-left: Entrepreneurship (decorative)
export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "ra1",
    label: ["Additive", "Manufacturing,", "Mechatronics,", "Aerospace &", "Machine Learning"],
  },
  {
    id: "ra2",
    label: [
      "Advanced",
      "Materials,",
      "Biomaterials,",
      "Development,",
      "Modelling &",
      "Characterisation",
    ],
  },
  {
    id: "ra3",
    label: ["Sustainable Energy", "& Environmental", "Technologies"],
  },
  {
    id: "ra4",
    label: ["Entrepreneurship"],
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

// Demo faculty — replace with real entries.
const ph = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=D6CFCA&fontFamily=IBM%20Plex%20Sans`;

export const FACULTY: Faculty[] = [
  { id: "1", name: "Andrew Maxwell", areas: { ra4: 1 }, profileImage: ph("Andrew Maxwell") },
  { id: "2", name: "Alex Czekanski", areas: { ra1: 1 }, profileImage: ph("Alex Czekanski") },
  { id: "3", name: "George Zhu", areas: { ra1: 1 }, profileImage: ph("George Zhu") },
  {
    id: "4",
    name: "Solomon Boakye-Yiadom",
    areas: { ra2: 1 },
    profileImage: ph("Solomon Boakye-Yiadom"),
  },
  { id: "5", name: "Ronald Hanson", areas: { ra1: 1 }, profileImage: ph("Ronald Hanson") },
  { id: "6", name: "Garrett Melenka", areas: { ra2: 1 }, profileImage: ph("Garrett Melenka") },
  {
    id: "7",
    name: "Marina Freire-Gormaly",
    areas: { ra3: 1 },
    profileImage: ph("Marina Freire-Gormaly"),
  },
  { id: "8", name: "Cuiying Jian", areas: { ra2: 1 }, profileImage: ph("Cuiying Jian") },
  { id: "9", name: "Pouya Rezai", areas: { ra2: 1 }, profileImage: ph("Pouya Rezai") },
  { id: "10", name: "Reza Rizvi", areas: { ra2: 1 }, profileImage: ph("Reza Rizvi") },
  { id: "11", name: "Nima Tabatabaei", areas: { ra2: 1 }, profileImage: ph("Nima Tabatabaei") },
  { id: "12", name: "Satinder K. Brar", areas: { ra3: 1 }, profileImage: ph("Satinder K. Brar") },
  { id: "13", name: "Simone Pisana", areas: { ra2: 1 }, profileImage: ph("Simone Pisana") },
  { id: "14", name: "Ryan Orszulik", areas: { ra1: 1 }, profileImage: ph("Ryan Orszulik") },
  { id: "15", name: "Stephanie Gora", areas: { ra3: 1 }, profileImage: ph("Stephanie Gora") },
  {
    id: "16",
    name: "Christopher Caputo",
    areas: { ra2: 1 },
    profileImage: ph("Christopher Caputo"),
  },
  { id: "17", name: "Paul O'Brien", areas: { ra1: 1 }, profileImage: ph("Paul O'Brien") },
  { id: "18", name: "Terry Sachlos", areas: { ra2: 1 }, profileImage: ph("Terry Sachlos") },
];
