import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EcosystemPie } from "@/components/ecosystem/EcosystemPie";
import { FacultyGrid } from "@/components/ecosystem/FacultyGrid";
import { FacultyDialog } from "@/components/ecosystem/FacultyDialog";
import { SITE_CONFIG, type AreaId, type Faculty } from "@/data/faculty";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_CONFIG.acronym} — Research Ecosystem` },
      {
        name: "description",
        content: `Explore the ${SITE_CONFIG.programName} research ecosystem. Discover faculty across advanced materials, smart manufacturing, sustainable energy and entrepreneurship.`,
      },
      { property: "og:title", content: `${SITE_CONFIG.acronym} — Research Ecosystem` },
      {
        property: "og:description",
        content: `An interactive map of the ${SITE_CONFIG.programName} faculty and research areas.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_CONFIG.acronym} — Research Ecosystem` },
      {
        name: "twitter:description",
        content: `Interactive faculty map across four research areas.`,
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [selected, setSelected] = useState<AreaId | null>(null);
  const [openFaculty, setOpenFaculty] = useState<Faculty | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">
        {SITE_CONFIG.acronym} Research Ecosystem — {SITE_CONFIG.programName}
      </h1>

      <section className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-stretch gap-12 px-6 py-12 md:flex-row md:items-center md:gap-10 md:py-16 lg:px-12">
        {/* Left: tagline + pie */}
        <div className="flex w-full flex-col items-center md:w-1/2">
          <p
            className="mb-6 text-center text-xs font-light uppercase tracking-[0.35em] text-[color:var(--ecosystem-ink)] md:text-sm"
            aria-label="Program tagline"
          >
            {SITE_CONFIG.tagline}
          </p>
          <EcosystemPie
            selected={selected}
            onSelect={(id) => setSelected((cur) => (cur === id ? null : id))}
            onReset={() => setSelected(null)}
          />
        </div>

        {/* Right: faculty grid */}
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div className="w-full max-w-[520px]">
            <FacultyGrid selected={selected} onOpen={setOpenFaculty} />
          </div>
        </div>
      </section>

      <FacultyDialog
        faculty={openFaculty}
        onOpenChange={(open) => !open && setOpenFaculty(null)}
      />
    </main>
  );
}
