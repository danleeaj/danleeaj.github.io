import type { PropsWithChildren } from "react";

export function SectionHeading({ children }: PropsWithChildren) {
  return <p className="section-heading">{children}</p>;
}
