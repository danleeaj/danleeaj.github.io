import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { usePageTransition } from "@/lib/page-transition";

type TransitionAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  direction?: "forward" | "back";
  to: string;
};

export function TransitionAnchor({
  children,
  direction = "forward",
  onClick,
  to,
  ...props
}: TransitionAnchorProps) {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      props.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    navigateWithTransition(to, direction);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
