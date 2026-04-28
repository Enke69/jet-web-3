"use client";

import { useReveal } from "@/lib/useReveal";

export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  const [ref, revealed] = useReveal();
  const composed = `${className} reveal ${revealed ? "revealed" : ""}`.trim();
  return (
    <Tag ref={ref} className={composed} {...rest}>
      {children}
    </Tag>
  );
}
