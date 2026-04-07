import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-normal whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-[#f1f1ef] text-[#787774]",
        blue: "bg-[rgba(35,131,226,0.1)] text-[#2383e2]",
        green: "bg-[rgba(15,123,108,0.1)] text-[#0f7b6c]",
        orange: "bg-[rgba(217,115,13,0.1)] text-[#d9730d]",
        purple: "bg-[rgba(103,36,222,0.1)] text-[#6724de]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, tone, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
