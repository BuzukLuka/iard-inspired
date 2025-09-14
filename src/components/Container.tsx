import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="container-px mx-auto max-w-7xl">{children}</div>;
}
