import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionHeading } from "@/components/layout/section-heading";
import { SubpageShell } from "@/components/layout/subpage-shell";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { workExperiences } from "@/data/site-content";

export function NeurosciencePage() {
  useDocumentTitle("anjie — neuroscience");

  return (
    <SubpageShell
      breadcrumb="neuroscience"
      cover="🧬"
      title="i was a researcher!"
      description={
        <>
          <p>
            I currently hold a <strong>M.S., Biology</strong> and <strong>B.S., Neurobiology</strong>{" "}
            from <b><em>University of California, San Diego</em></b>. During my time at UCSD, I did
            research with Dr. Aksinya Derevyanko under the mentorship of Dr. Nicola Allen at the Salk
            Institute.
          </p>
          <p>
            My thesis will be available{" "}
            <a href="https://www.proquest.com/docview/3226851826">here</a> once the embargo is lifted.
          </p>
          <p>
            During this period, I explored the potential of machine learning and computer vision in
            counting and identifying cells in immunohistochemical images in the context of
            Alzheimer&apos;s disease in mice.
          </p>
        </>
      }
    >
      <SectionHeading>Work Experience</SectionHeading>

      <div className="table-wrap">
        <Table className="db-table">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workExperiences.map((entry) => (
              <TableRow key={`${entry.organization}-${entry.date}`}>
                <TableCell className="whitespace-nowrap">{entry.date}</TableCell>
                <TableCell>
                  <strong>{entry.organization}</strong>
                  <br />
                  <Badge tone={entry.tag.tone}>{entry.tag.label}</Badge>
                </TableCell>
                <TableCell>
                  <ul className="bullet-list">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SubpageShell>
  );
}
