import { ReactNode } from "react";
import cn from "classnames";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("card card-hover", className)}>{children}</div>;
}
