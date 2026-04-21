import { useMemo } from "react";
import { RESEARCH_AREAS, SITE_CONFIG, type AreaId } from "@/data/faculty";

interface EcosystemPieProps {
  selected: AreaId | null;
  onSelect: (id: AreaId) => void;
  onReset: () => void;
}

// SVG geometry constants
const SIZE = 520;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 220;
const HUB_RADIUS = 70;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(startAngle: number, endAngle: number) {
  const start = polar(CENTER, CENTER, OUTER_RADIUS, endAngle);
  const end = polar(CENTER, CENTER, OUTER_RADIUS, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function EcosystemPie({ selected, onSelect, onReset }: EcosystemPieProps) {
  // 4 equal slices starting at top (angle 0 = 12 o'clock)
  const slices = useMemo(
    () =>
      RESEARCH_AREAS.map((area, i) => {
        const startAngle = i * 90;
        const endAngle = startAngle + 90;
        const midAngle = startAngle + 45;
        // Label radius — between hub and outer edge
        const labelPos = polar(CENTER, CENTER, (HUB_RADIUS + OUTER_RADIUS) / 2 + 10, midAngle);
        return { area, startAngle, endAngle, midAngle, labelPos, path: arcPath(startAngle, endAngle) };
      }),
    [],
  );

  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full overflow-visible"
        role="group"
        aria-label="Research areas — click a slice to filter faculty"
      >
        {slices.map(({ area, path, labelPos, midAngle }) => {
          const isSelected = selected === area.id;
          const isDecorative = !!area.decorative;
          const isInteractive = !isDecorative;

          return (
            <g
              key={area.id}
              className={`origin-center transition-transform duration-300 ${
                isSelected ? "scale-[1.03]" : ""
              } ${isInteractive ? "cursor-pointer hover:scale-[1.015]" : "cursor-default"}`}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              onClick={() => isInteractive && onSelect(area.id)}
              onKeyDown={(e) => {
                if (!isInteractive) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(area.id);
                }
              }}
              tabIndex={isInteractive ? 0 : -1}
              role={isInteractive ? "button" : "presentation"}
              aria-label={isInteractive ? `Filter by ${area.label}` : undefined}
              aria-pressed={isInteractive ? isSelected : undefined}
            >
              <path
                d={path}
                fill={area.colorVar}
                stroke="var(--ecosystem-ink)"
                strokeWidth={isSelected ? 3 : 1}
                className="transition-[stroke-width] duration-200 focus:outline-none"
                opacity={isDecorative ? 0.85 : 1}
              />
              {/* Label */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="var(--ecosystem-ink)"
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
                transform={`rotate(${midAngle > 90 && midAngle < 270 ? midAngle - 180 : midAngle}, ${labelPos.x}, ${labelPos.y})`}
              >
                {area.label}
              </text>
            </g>
          );
        })}

        {/* Center hub — red, clickable to reset */}
        <g
          className="cursor-pointer origin-center transition-transform duration-200 hover:scale-105"
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          onClick={onReset}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onReset();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Reset filters — ${SITE_CONFIG.acronym} hub`}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={HUB_RADIUS}
            fill="var(--ecosystem-hub)"
            stroke="var(--ecosystem-ink)"
            strokeWidth={1.5}
          />
          <text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--ecosystem-hub-foreground)"
            className="pointer-events-none select-none"
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {SITE_CONFIG.acronym}
          </text>
        </g>
      </svg>
    </div>
  );
}
