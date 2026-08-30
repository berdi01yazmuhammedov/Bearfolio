import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PlayCircle, User } from "lucide-react";
import { profile } from "../data/profile";
import DownloadCvButton from "./DownloadCvButton";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [imageOk, setImageOk] = useState(true);

  const rise = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-24 lg:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(38,52,74,0.06),_transparent_65%)]" />

      <div className="container-editorial grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left column */}
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={rise}
            className="eyebrow mb-6"
          >
            {profile.eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={rise}
            className="font-display text-[2.5rem] leading-[1.08] tracking-tight text-ink sm:text-[3.1rem] lg:text-[3.4rem]"
          >
            {profile.headline}
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink/65"
          >
            {profile.subhead}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#introduction"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:border-ink"
            >
              <PlayCircle className="h-4 w-4" />
              Watch Introduction
            </a>
            <DownloadCvButton variant="primary" />
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-10 flex items-center gap-2.5 text-[13px] text-ink/60"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-[#4B6B4E]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4B6B4E]" />
            </span>
            {profile.availability}
          </motion.div>
        </div>

        {/* Right column — portrait */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative">
            <div className="absolute -inset-3 -z-10 border border-navy/25 sm:-inset-4" />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy/5">
              {imageOk ? (
                <img
                  src={profile.images.profile}
                  alt={`${profile.name}, ${profile.role}`}
                  className="h-full w-full object-cover grayscale-[8%]"
                  onError={() => setImageOk(false)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy/10 via-navy/5 to-transparent text-navy/50">
                  <User className="h-14 w-14" strokeWidth={1} />
                  <span className="px-8 text-center text-xs uppercase tracking-widest2 text-navy/40">
                    Portrait pending — add /images/profile.jpg
                  </span>
                </div>
              )}
            </div>

            <div className="absolute -bottom-5 left-5 max-w-[15rem] border border-line bg-paper px-4 py-3 shadow-[0_18px_40px_-24px_rgba(24,25,20,0.35)] sm:-bottom-6 sm:left-6">
              <p className="font-display text-[15px] leading-tight text-ink">{profile.name}</p>
              <p className="mt-0.5 text-[12px] text-stone">{profile.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
