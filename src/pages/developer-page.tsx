import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionHeading } from "@/components/layout/section-heading";
import { SubpageShell } from "@/components/layout/subpage-shell";
import { developerProjects } from "@/data/site-content";
import { useDocumentTitle } from "@/hooks/use-document-title";

export function DeveloperPage() {
  useDocumentTitle("anjie — developer");

  return (
    <SubpageShell
      breadcrumb="developer"
      cover="💻"
      title="i'm a developer!"
      description={
        <p>
          I&apos;m currently pursuing a master&apos;s program at the University of Pennsylvania (MCIT). My
          journey started building little side projects as an undergrad and now I hope it becomes a
          full-time, rest-of-my-life, put-a-ring-on-it kind of thing.
        </p>
      }
    >
      <SectionHeading>Projects</SectionHeading>

      <div className="table-wrap">
        <Table className="db-table">
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Stack</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developerProjects.map((project) => (
              <TableRow key={project.name}>
                <TableCell>
                  <strong>{project.name}</strong>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <Badge key={`${project.name}-${item.label}`} tone={item.tone}>
                        {item.label}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{project.description}</div>
                  {project.bullets ? (
                    <ul className="bullet-list with-spacing">
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </TableCell>
                <TableCell>
                  <a href={project.linkHref}>{project.linkLabel}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SubpageShell>
  );
}
