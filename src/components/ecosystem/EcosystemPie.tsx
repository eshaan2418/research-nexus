import { useMemo } from "react";
import { RESEARCH_AREAS, SITE_CONFIG, type AreaId } from "@/data/faculty";

interface EcosystemPieProps {
  selected: AreaId | null;
  onSelect: (id: AreaId) => void;
  onReset: () => void;
}

// SVG geometry — matches reference: cream pie inside a thick red ring,
// black 1-2px dividers, black hub with white acronym.
const SIZE = 600;
const CENTER = SIZE / 2;
const RING_OUTER = 290; // outer red ring
const RING_INNER = 250; // inner edge of red ring = pie outer
const HUB_RADIUS = 78;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(startAngle: number, endAngle: number, radius: number) {
  const start = polar(CENTER, CENTER, radius, endAngle);
  const end = polar(CENTER, CENTER, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function EcosystemPie({ selected, onSelect, onReset }: EcosystemPieProps) {
  // Slice angles laid out clockwise starting at top:
  // ra1 = top-right (0–90), ra2 = bottom-right (90–180),
  // ra3 = bottom-left (180–270), ra4 = top-left (270–360, decorative)
  const slices = useMemo(
    () =>
      RESEARCH_AREAS.map((area, i) => {
        const startAngle = i * 90;
        const endAngle = startAngle + 90;
        const midAngle = startAngle + 45;
        // Place label roughly midway between hub and pie edge
        const labelRadius = (HUB_RADIUS + RING_INNER) / 2 + 5;
        const labelPos = polar(CENTER, CENTER, labelRadius, midAngle);
        return {
          area,
          midAngle,
          labelPos,
          path: arcPath(startAngle, endAngle, RING_INNER),
        };
      }),
    [],
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full overflow-visible"
        role="group"
        aria-label="Research areas — click a slice to filter faculty"
      >
        {/* Red outer ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_OUTER}
          fill="var(--ecosystem-ring)"
        />
        {/* Cream pie disc with black border */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_INNER}
          fill="var(--ecosystem-slice)"
          stroke="var(--ecosystem-ink)"
          strokeWidth={2}
        />

        {/* Slices (over the cream disc, with black dividers) */}
        {slices.map(({ area, path, labelPos }) => {
          const isSelected = selected === area.id;
          const isDecorative = !!area.decorative;
          const isInteractive = !isDecorative;
          const dimmed = selected !== null && !isSelected && !isDecorative;

          return (
            <g key={area.id}>
              <path
                d={path}
                fill="var(--ecosystem-slice)"
                stroke="var(--ecosystem-ink)"
                strokeWidth={1.5}
                className={`transition-opacity duration-300 ${
                  isInteractive ? "cursor-pointer" : "cursor-default"
                }`}
                style={{ opacity: dimmed ? 0.55 : 1 }}
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
                aria-label={isInteractive ? `Filter by ${area.label.join(" ")}` : undefined}
                aria-pressed={isInteractive ? isSelected : undefined}
              />
              {/* Selected outline accent */}
              {isSelected && (
                <path
                  d={path}
                  fill="none"
                  stroke="var(--ecosystem-ring)"
                  strokeWidth={3}
                  pointerEvents="none"
                />
              )}
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
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {area.label.map((line, i) => (
                  <tspan
                    key={i}
                    x={labelPos.x}
                    dy={i === 0 ? `-${(area.label.length - 1) * 0.6}em` : "1.2em"}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Black center hub with white acronym — clickable to reset */}
        <g
          className="origin-center cursor-pointer transition-transform duration-200 hover:scale-105"
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
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            {SITE_CONFIG.acronym}
          </text>
        </g>
      </svg>
    </div>
  );
}
