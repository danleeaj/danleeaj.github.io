import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";
import { SubpageShell } from "@/components/layout/subpage-shell";
import { musicReleases } from "@/data/site-content";
import { useDocumentTitle } from "@/hooks/use-document-title";

export function MusicPage() {
  useDocumentTitle("anjie — music");

  return (
    <SubpageShell
      breadcrumb="music"
      cover="🎵"
      title="singer-songwriter & producer"
      description={
        <p>
          based in suzhou / singapore / san diego — i&apos;ve been making music for the past 8 years.
          when i started college during the pandemic i thought, let&apos;s actually produce these songs
          and release them. so that&apos;s what i did. curated songs on{" "}
          <a href="https://open.spotify.com/artist/0f6uqts7zv87P3xQbF2HMu">spotify</a>, full collection
          on <a href="https://anjie.bandcamp.com/">bandcamp</a>.
        </p>
      }
    >
      <SectionHeading>Discography</SectionHeading>

      <Accordion type="multiple" className="toggle-list">
        {musicReleases.map((release) => (
          <AccordionItem key={release.id} value={release.id}>
            <AccordionTrigger>
              <strong>{release.title}</strong> <Badge>{release.tag}</Badge>
              <br />
              <span className="toggle-title-sub">{release.subtitle}</span>
            </AccordionTrigger>
            <AccordionContent>
              <iframe
                title={release.embedTitle}
                src={release.embedUrl}
                width="100%"
                height={release.embedHeight}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                frameBorder={0}
                loading="lazy"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SubpageShell>
  );
}
