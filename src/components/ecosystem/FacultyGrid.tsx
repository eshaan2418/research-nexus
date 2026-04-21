import { FACULTY, type AreaId, type Faculty } from "@/data/faculty";

interface FacultyGridProps {
  selected: AreaId | null;
  onOpen: (faculty: Faculty) => void;
}

export function FacultyGrid({ selected, onOpen }: FacultyGridProps) {
  return (
    <ul
      className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 justify-items-center"
      aria-label="Faculty members"
    >
      {FACULTY.map((f) => {
        const matches = selected ? Boolean(f.areas[selected]) : true;
        const [first, ...rest] = f.name.split(" ");
        const last = rest.join(" ");
        return (
          <li key={f.id} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onOpen(f)}
              aria-label={`Open profile for ${f.name}`}
              className="group flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--ecosystem-bubble-border)] bg-[color:var(--ecosystem-bubble)] text-center transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ opacity: matches ? 1 : 0.3 }}
            >
              <span className="px-1 text-[12px] font-bold leading-tight text-[color:var(--ecosystem-ink)]">
                {first}
                <br />
                {last}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
