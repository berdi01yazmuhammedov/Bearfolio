import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { profile } from "../data/profile";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-20">
      <div className="container-editorial">
        <SectionHeading index="01" label="About" headline={profile.aboutHeadline} />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {profile.aboutParagraphs.map((p, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-ink/70">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative border-l-2 border-navy/30 py-2 pl-7"
          >
            <Quote className="h-6 w-6 text-navy/40" strokeWidth={1.5} />
            <p className="mt-4 font-display text-xl italic leading-snug text-ink">
              “{profile.philosophy}”
            </p>
            <p className="mt-4 text-[12px] uppercase tracking-widest2 text-stone">
              Teaching philosophy
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
