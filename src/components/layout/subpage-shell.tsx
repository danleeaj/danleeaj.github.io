import type { PropsWithChildren, ReactNode } from "react";

import { TransitionAnchor } from "@/components/layout/transition-anchor";

type SubpageShellProps = PropsWithChildren<{
  breadcrumb: string;
  cover: string;
  description: ReactNode;
  title: string;
}>;

export function SubpageShell({ breadcrumb, children, cover, description, title }: SubpageShellProps) {
  return (
    <>
      <nav className="topbar">
        <div className="topbar-inner">
          <TransitionAnchor to="/" direction="back" className="breadcrumb-link">
            anjie
          </TransitionAnchor>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{breadcrumb}</span>
        </div>
      </nav>

      <TransitionAnchor to="/" direction="back" className="back-arrow" aria-label="Back to home">
        <span className="back-arrow-symbol" aria-hidden="true">
          ‹
        </span>
      </TransitionAnchor>

      <div className="page">
        <span className="subpage-cover">{cover}</span>
        <h1 className="subpage-title">{title}</h1>
        <div className="subpage-desc">{description}</div>
        {children}
      </div>
    </>
  );
}
