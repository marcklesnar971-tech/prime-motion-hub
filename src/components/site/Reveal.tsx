import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}

      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Título cinematográfico con reveal por línea. */
export function LineReveal({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          className="block overflow-hidden pb-[0.06em] leading-[1.02]"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            className={cn("block", lineClassName)}
            variants={{ hidden: { y: "108%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }}
            transition={{ duration: 0.9, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}

          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}
