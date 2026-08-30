import { motion } from "framer-motion";
import { cn } from "../lib/utils";

type Props = {
  index: string;
  label: string;
  headline: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  index,
  label,
  headline,
  align = "left",
  tone = "light",
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest2",
          align === "center" && "justify-center",
          tone === "dark" ? "text-ivory/45" : "text-stone"
        )}
      >
        <span>{index}</span>
        <span className={cn("h-px w-8", tone === "dark" ? "bg-ivory/25" : "bg-line")} />
        <span>{label}</span>
      </div>
      <h2
        className={cn(
          "font-display text-[2rem] leading-[1.15] tracking-tight sm:text-[2.35rem]",
          tone === "dark" ? "text-ivory" : "text-ink"
        )}
      >
        {headline}
      </h2>
    </motion.div>
  );
}
