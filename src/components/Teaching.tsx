import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FileText } from "lucide-react";
import { lessons, type Lesson } from "../data/lessons";
import SectionHeading from "./SectionHeading";
import { cn } from "../lib/utils";

function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group border border-line bg-paper transition-colors duration-300 hover:border-navy/30"
    >
      <div className="p-7">
        <p className="text-[10.5px] font-semibold uppercase tracking-widest2 text-navy">
          {lesson.audience}
        </p>
        <h3 className="mt-2.5 font-display text-[1.4rem] leading-snug text-ink">{lesson.title}</h3>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5 text-[13px]">
          <div>
            <dt className="text-stone">Level</dt>
            <dd className="mt-0.5 font-medium text-ink">{lesson.level}</dd>
          </div>
          <div>
            <dt className="text-stone">Age</dt>
            <dd className="mt-0.5 font-medium text-ink">{lesson.age}</dd>
          </div>
          <div>
            <dt className="text-stone">Duration</dt>
            <dd className="mt-0.5 font-medium text-ink">{lesson.duration}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 flex w-full items-center justify-between border-t border-line pt-5 text-left text-[13px] font-medium text-ink"
        >
          Lesson details
          <ChevronDown
            className={cn("h-4 w-4 text-stone transition-transform duration-300", open && "rotate-180")}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-4 text-[14px] leading-relaxed text-ink/65">
                <p>
                  <span className="font-medium text-ink">Objective — </span>
                  {lesson.objective}
                </p>
                <p>
                  <span className="font-medium text-ink">Activity type — </span>
                  {lesson.activityType}
                </p>
                <p>
                  <span className="font-medium text-ink">Language focus — </span>
                  {lesson.languageFocus}
                </p>
                <p>
                  <span className="font-medium text-ink">Sample activity — </span>
                  {lesson.sampleActivity}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <a
        href={`/lessons/${lesson.slug}`}
        className="flex items-center justify-between border-t border-line px-7 py-4 text-[13px] font-medium text-ink transition-colors hover:bg-navy/5"
      >
        <span className="inline-flex items-center gap-2">
          <FileText className="h-4 w-4 text-stone" />
          Open interactive lesson
        </span>
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </motion.article>
  );
}

export default function Teaching() {
  return (
    <section id="teaching" className="py-24 sm:py-20">
      <div className="container-editorial">
        <SectionHeading index="03" label="Teaching" headline="What my lessons look like." />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {lessons.map((lesson, i) => (
            <LessonCard key={lesson.title} lesson={lesson} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
