import { motion } from "framer-motion";
import { FileText, GraduationCap } from "lucide-react";
import { profile, qualifications } from "../data/profile";
import { useAssetExists } from "../hooks/useAssetExists";
import SectionHeading from "./SectionHeading";

function QualificationRow({
  label,
  value,
  document,
  index,
}: {
  label: string;
  value: string;
  document: "tefl" | "degree" | null;
  index: number;
}) {
  const url = document ? profile.documents[document] : "";
  const exists = useAssetExists(url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-6 first:pt-0 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-navy/50" strokeWidth={1.5} />
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest2 text-stone">
            {label}
          </p>
          <p className="mt-1 font-display text-lg text-ink">{value}</p>
        </div>
      </div>

      {document && exists && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[12.5px] font-medium text-ink transition-colors hover:border-ink"
        >
          <FileText className="h-3.5 w-3.5" />
          View document
        </a>
      )}
    </motion.div>
  );
}

export default function Qualifications() {
  return (
    <section id="qualifications" className="py-24 sm:py-20">
      <div className="container-editorial">
        <SectionHeading
          index="05"
          label="Qualifications"
          headline="Qualified to teach. Prepared to grow."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {qualifications.map((q, i) => (
            <QualificationRow key={q.label} index={i} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
}
