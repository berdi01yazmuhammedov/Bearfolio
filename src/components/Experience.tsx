import { motion } from "framer-motion";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import SectionHeading from "./SectionHeading";
import { cn } from "../lib/utils";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-20">
      <div className="container-editorial">
        <SectionHeading
          index="02"
          label="Experience"
          headline="Teaching experience built around people."
        />

        <div className="mt-16 max-w-3xl">
          {experience.map((item, i) => (
            <motion.div
              key={`${item.role}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-l border-line pb-14 pl-9 last:pb-0"
            >
              <span
                className={cn(
                  "absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-ivory",
                  item.current ? "bg-navy" : "bg-stone-light"
                )}
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl text-ink">{item.role}</h3>
                <span className="text-[13px] font-medium text-stone">{item.date}</span>
              </div>

              <p className="mt-1 text-[15px] text-ink/70">
                <span className="font-medium text-ink/85">{item.organization}</span>
                {" · "}
                {item.location}
              </p>

              {item.current && (
                <span className="mt-2 inline-block rounded-full bg-navy/8 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest2 text-navy">
                  Current
                </span>
              )}

              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-2 max-w-3xl text-[13px] text-stone">
          Dates and institution names marked as placeholders will be updated as documentation is
          confirmed. Full details available on request or in the{" "}
          <a href={profile.documents.cv} className="underline underline-offset-2 hover:text-ink">
            CV
          </a>
          .
        </p>
      </div>
    </section>
  );
}
