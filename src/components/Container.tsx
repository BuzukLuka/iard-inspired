// src/components/Container.tsx
"use client";
import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function Container({ children, className = "" }: Props) {
  return <div className={`site-container w-full ${className}`}>{children}</div>;
}
