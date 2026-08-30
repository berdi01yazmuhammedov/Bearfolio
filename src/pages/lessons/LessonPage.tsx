import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  RotateCcw,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";
import type { LessonContent } from "../../lessons/types";

type Theme = "animals" | "routines" | "opinions";

type Stage = {
  title: string;
  time: number;
  goal: string;
};

const stages: Stage[] = [
  {
    title: "Welcome & goals",
    time: 3,
    goal: "See the route and set a clear learning intention.",
  },
  {
    title: "Warm-up",
    time: 4,
    goal: "Activate what you already know.",
  },
  {
    title: "In context",
    time: 6,
    goal: "Meet useful language in a meaningful situation.",
  },
  {
    title: "Notice language",
    time: 6,
    goal: "Spot words and patterns.",
  },
  {
    title: "Discover the rule",
    time: 5,
    goal: "Make a rule from examples.",
  },
  {
    title: "Controlled practice",
    time: 6,
    goal: "Use the new language accurately.",
  },
  {
    title: "Skills task",
    time: 7,
    goal: "Read, listen and respond for meaning.",
  },
  {
    title: "Make it yours",
    time: 5,
    goal: "Create a personal message.",
  },
  {
    title: "Reflection",
    time: 2,
    goal: "Notice your progress.",
  },
  {
    title: "Final check",
    time: 1,
    goal: "Show what you can do.",
  },
];

const animals = [
  ["🐘", "elephant", "/ˈel.ɪ.fənt/"],
  ["🦁", "lion", "/ˈlaɪ.ən/"],
  ["🐰", "rabbit", "/ˈræb.ɪt/"],
  ["🐮", "cow", "/kaʊ/"],
] as const;

const routines = [
  "wake up",
  "have breakfast",
  "go to school",
  "do homework",
  "go to bed",
] as const;

const routineTimes = ["07:00", "07:30", "08:00", "16:00", "22:00"];

const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.92;

    window.speechSynthesis.speak(utterance);
  }
};

type LessonProps = {
  content: LessonContent;
  activity?: (next: () => void) => React.ReactNode;
};

const themeData = {
  animals: {
    label: "Vocabulary adventure",
    icon: "🐾",
    eyebrow: "YOUNG LEARNERS · VOCABULARY",
    accent: "from-orange-400 via-rose-500 to-emerald-500",
    accentSolid: "bg-orange-500",
    accentText: "text-orange-600",
    accentSoft: "bg-orange-50",
    page:
      "bg-[radial-gradient(circle_at_10%_10%,rgba(251,146,60,.30),transparent_26%),radial-gradient(circle_at_90%_85%,rgba(34,197,94,.20),transparent_27%),linear-gradient(145deg,#fff7ed_0%,#fffbeb_45%,#ecfdf5_100%)]",
    shell:
      "border-orange-100/80 bg-white/70 shadow-[0_35px_100px_rgba(120,53,15,.12)]",
    darkText: "text-slate-950",
    muted: "text-slate-600",
    subtle: "bg-orange-50/80",
    ring: "focus-visible:ring-orange-400",
  },
  routines: {
    label: "Present Simple journey",
    icon: "☀️",
    eyebrow: "EVERYDAY ENGLISH · GRAMMAR",
    accent: "from-cyan-400 via-blue-500 to-indigo-500",
    accentSolid: "bg-blue-600",
    accentText: "text-blue-600",
    accentSoft: "bg-blue-50",
    page:
      "bg-[radial-gradient(circle_at_90%_10%,rgba(56,189,248,.28),transparent_27%),radial-gradient(circle_at_0%_90%,rgba(99,102,241,.22),transparent_30%),linear-gradient(145deg,#eff6ff_0%,#f0f9ff_42%,#eef2ff_100%)]",
    shell:
      "border-blue-100/80 bg-white/70 shadow-[0_35px_100px_rgba(30,64,175,.13)]",
    darkText: "text-slate-950",
    muted: "text-slate-600",
    subtle: "bg-blue-50/80",
    ring: "focus-visible:ring-blue-400",
  },
  opinions: {
    label: "Speaking & opinions studio",
    icon: "✦",
    eyebrow: "B1–B2 · SPEAKING & IELTS",
    accent: "from-violet-400 via-fuchsia-500 to-indigo-500",
    accentSolid: "bg-violet-500",
    accentText: "text-violet-300",
    accentSoft: "bg-violet-500/10",
    page:
      "bg-[radial-gradient(circle_at_12%_10%,rgba(139,92,246,.28),transparent_27%),radial-gradient(circle_at_88%_88%,rgba(56,189,248,.16),transparent_25%),linear-gradient(145deg,#020617_0%,#0f172a_44%,#1e1b4b_100%)]",
    shell:
      "border-white/10 bg-white/[0.055] shadow-[0_35px_120px_rgba(2,6,23,.55)]",
    darkText: "text-white",
    muted: "text-slate-300",
    subtle: "bg-violet-400/10",
    ring: "focus-visible:ring-violet-400",
  },
} as const;

export function LessonPage({ content }: LessonProps) {
  const theme: Theme =
    content.accent === "coral"
      ? "animals"
      : content.accent === "blue"
        ? "routines"
        : "opinions";

  const styles = themeData[theme];

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [card, setCard] = useState({
    name: "",
    detail: "",
    sentence: "",
    counterargument: "",
  });

  const elapsed = stages
    .slice(0, step)
    .reduce((total, stage) => total + stage.time, 0);

  const next = (point = false) => {
    if (point) {
      setScore((value) => value + 1);
    }

    if (step === stages.length - 1) {
      setDone(true);
      return;
    }

    setStep((value) => value + 1);
    setFeedback("");
  };

  const reset = () => {
    window.speechSynthesis?.cancel();
    setStarted(false);
    setStep(0);
    setScore(0);
    setDone(false);
    setFeedback("");

    setCard({
      name: "",
      detail: "",
      sentence: "",
      counterargument: "",
    });
  };

  if (done) {
    return (
      <Completion
        theme={theme}
        content={content}
        score={score}
        card={card}
        retry={reset}
      />
    );
  }

  if (!started) {
    return (
      <Intro
        theme={theme}
        content={content}
        start={() => setStarted(true)}
      />
    );
  }

  return (
    <main
      className={[
        "relative min-h-screen overflow-x-hidden px-3 py-3 sm:px-5 sm:py-5 lg:px-8",
        styles.page,
        theme === "opinions" ? "text-white" : "text-slate-900",
      ].join(" ")}
    >
      <AmbientScene theme={theme} />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between gap-3">
          <a
            href="#/"
            className={[
              "group inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold backdrop-blur-xl transition-all duration-300",
              "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              theme === "opinions"
                ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 focus-visible:ring-violet-400"
                : "border-white/80 bg-white/70 text-slate-700 hover:bg-white focus-visible:ring-blue-400",
            ].join(" ")}
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Portfolio
          </a>

          <div className="flex items-center gap-2">
            <span
              className={[
                "hidden rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] sm:block",
                theme === "opinions"
                  ? "bg-white/5 text-violet-300"
                  : "bg-white/65 text-slate-500",
              ].join(" ")}
            >
              {themeData[theme].label}
            </span>

            <span
              className={[
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black backdrop-blur-xl",
                theme === "opinions"
                  ? "border-white/10 bg-white/5 text-white"
                  : "border-white/80 bg-white/70 text-slate-700",
              ].join(" ")}
            >
              <Clock3 size={15} />
              {content.lesson.level} · 45 min
            </span>
          </div>
        </header>

        <section
          className={[
            "mt-3 overflow-hidden rounded-[2rem] border backdrop-blur-2xl sm:mt-5 sm:rounded-[2.5rem]",
            styles.shell,
          ].join(" ")}
        >
          <div className="px-4 pb-7 pt-5 sm:px-7 sm:pb-9 sm:pt-7 lg:px-10 lg:pb-10">
            <LessonProgress
              theme={theme}
              step={step}
              elapsed={elapsed}
            />

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.section
                  key={step}
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.28 }}
                >
                  <Screen
                    theme={theme}
                    step={step}
                    next={next}
                    feedback={feedback}
                    setFeedback={setFeedback}
                    card={card}
                    setCard={setCard}
                  />
                </motion.section>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AmbientScene({ theme }: { theme: Theme }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {theme === "animals" && (
        <>
          <motion.div
            className="absolute -left-20 top-12 text-[8rem] opacity-[0.08] grayscale"
            animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            🐘
          </motion.div>

          <motion.div
            className="absolute right-5 top-24 text-[5rem] opacity-[0.10]"
            animate={{ y: [0, 12, 0], rotate: [4, -4, 4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            🦁
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 text-[4rem] opacity-[0.08]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🐰
          </motion.div>
        </>
      )}

      {theme === "routines" && (
        <>
          <motion.div
            className="absolute right-[-3rem] top-[-2rem] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.div
            className="absolute bottom-[-4rem] left-[-4rem] h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="absolute right-10 top-20 text-7xl opacity-[0.12]">
            ☀️
          </div>

          <div className="absolute bottom-24 left-8 text-6xl opacity-[0.08]">
            🌙
          </div>
        </>
      )}

      {theme === "opinions" && (
        <>
          <motion.div
            className="absolute -left-24 top-[-6rem] h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 9, repeat: Infinity }}
          />

          <motion.div
            className="absolute bottom-[-9rem] right-[-5rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/10 blur-3xl"
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 11, repeat: Infinity }}
          />

          <div className="absolute right-12 top-28 text-5xl text-violet-300/10">
            ✦
          </div>

          <div className="absolute bottom-28 left-10 text-6xl text-fuchsia-300/10">
            “
          </div>
        </>
      )}
    </div>
  );
}

function LessonProgress({
  theme,
  step,
  elapsed,
}: {
  theme: Theme;
  step: number;
  elapsed: number;
}) {
  const styles = themeData[theme];
  const progress = ((step + 1) / stages.length) * 100;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em]",
                theme === "opinions"
                  ? "bg-violet-500/15 text-violet-300"
                  : `${styles.accentSoft} ${styles.accentText}`,
              ].join(" ")}
            >
              Step {String(step + 1).padStart(2, "0")} / 10
            </span>

            <span
              className={[
                "text-[10px] font-black uppercase tracking-[0.16em]",
                theme === "opinions" ? "text-slate-500" : "text-slate-400",
              ].join(" ")}
            >
              {stages[step].time} min
            </span>
          </div>

          <h2
            className={[
              "mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl",
              theme === "opinions"
                ? "text-white"
                : "text-slate-950",
            ].join(" ")}
          >
            {stages[step].title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={[
              "text-xs font-semibold",
              theme === "opinions" ? "text-slate-400" : "text-slate-500",
            ].join(" ")}
          >
            {elapsed} of 45 min
          </span>

          <div
            className={[
              "h-9 min-w-[3.2rem] rounded-full px-3 text-center text-xs font-black leading-9",
              theme === "opinions"
                ? "bg-white/5 text-white"
                : "bg-white/80 text-slate-700",
            ].join(" ")}
          >
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      <div
        className={[
          "mt-5 h-2 overflow-hidden rounded-full",
          theme === "opinions" ? "bg-white/10" : "bg-slate-200/80",
        ].join(" ")}
        aria-label={`${Math.round(progress)}% complete`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${styles.accent}`}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>

      <div className="mt-3 hidden grid-cols-10 gap-1 sm:grid">
        {stages.map((stage, index) => (
          <div
            key={stage.title}
            className={[
              "h-1.5 rounded-full transition-all",
              index <= step
                ? `bg-gradient-to-r ${styles.accent}`
                : theme === "opinions"
                  ? "bg-white/10"
                  : "bg-slate-200",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            theme === "opinions"
              ? "bg-white/5 text-violet-300"
              : `${styles.accentSoft} ${styles.accentText}`,
          ].join(" ")}
        >
          <Sparkles size={15} />
        </div>

        <p
          className={[
            "pt-1 text-sm leading-6",
            theme === "opinions" ? "text-slate-300" : "text-slate-500",
          ].join(" ")}
        >
          {stages[step].goal}
        </p>
      </div>
    </div>
  );
}

function Intro({
  theme,
  content,
  start,
}: {
  theme: Theme;
  content: LessonContent;
  start: () => void;
}) {
  const styles = themeData[theme];

  const heroAccent =
    theme === "animals"
      ? "from-orange-500 via-rose-500 to-emerald-600"
      : theme === "routines"
        ? "from-sky-500 via-blue-600 to-indigo-600"
        : "from-violet-400 via-fuchsia-500 to-indigo-500";

  return (
    <main
      className={[
        "relative min-h-screen overflow-hidden px-3 py-3 sm:px-5 sm:py-5 lg:px-8",
        styles.page,
        theme === "opinions" ? "text-white" : "text-slate-900",
      ].join(" ")}
    >
      <AmbientScene theme={theme} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-3">
          <a
            href="#/"
            className={[
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold backdrop-blur-xl transition-all",
              theme === "opinions"
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-white/80 bg-white/70 text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            <ArrowLeft size={17} />
            Portfolio
          </a>

          <span
            className={[
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black backdrop-blur-xl",
              theme === "opinions"
                ? "border-white/10 bg-white/5 text-white"
                : "border-white/80 bg-white/70 text-slate-700",
            ].join(" ")}
          >
            {content.lesson.level} · 45 min
          </span>
        </header>

        <section
          className={[
            "mt-3 overflow-hidden rounded-[2rem] border backdrop-blur-2xl sm:mt-5 sm:rounded-[2.5rem]",
            styles.shell,
          ].join(" ")}
        >
          <div className="relative p-5 sm:p-8 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
              <div>
                <div
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]",
                    theme === "opinions"
                      ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
                      : `${styles.accentSoft} ${styles.accentText} border-transparent`,
                  ].join(" ")}
                >
                  <Sparkles size={13} />
                  {themeData[theme].eyebrow}
                </div>

                <div className="mt-6 flex items-end gap-4">
                  <div className="text-6xl leading-none sm:text-7xl">
                    {themeData[theme].icon}
                  </div>

                  <div
                    className={[
                      "h-16 w-1 rounded-full bg-gradient-to-b sm:h-20",
                      heroAccent,
                    ].join(" ")}
                  />
                </div>

                <h1
                  className={[
                    "mt-7 text-4xl font-black leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl",
                    theme === "opinions"
                      ? "text-white"
                      : "text-slate-950",
                  ].join(" ")}
                >
                  {content.lesson.title}
                </h1>

                <p
                  className={[
                    "mt-6 max-w-2xl text-base leading-7 sm:text-lg",
                    theme === "opinions"
                      ? "text-slate-300"
                      : "text-slate-600",
                  ].join(" ")}
                >
                  {content.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {content.objectives.slice(0, 4).map((goal, index) => (
                    <motion.span
                      key={goal}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold",
                        theme === "opinions"
                          ? "border-white/10 bg-white/[0.05] text-slate-200"
                          : "border-white/80 bg-white/75 text-slate-700",
                      ].join(" ")}
                    >
                      <Check
                        size={14}
                        className={
                          theme === "opinions"
                            ? "text-violet-300"
                            : styles.accentText
                        }
                      />
                      {goal}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Continue
                    ready
                    onClick={start}
                    text="Start the experience"
                    theme={theme}
                    large
                  />

                  <div
                    className={[
                      "text-xs font-bold",
                      theme === "opinions"
                        ? "text-slate-500"
                        : "text-slate-400",
                    ].join(" ")}
                  >
                    10 stages · guided practice · portfolio-ready
                  </div>
                </div>
              </div>

              <HeroPreview theme={theme} />
            </div>
          </div>

          <div
            className={[
              "border-t px-5 py-5 sm:px-8 lg:px-12",
              theme === "opinions"
                ? "border-white/10 bg-white/[0.025]"
                : "border-slate-200/80 bg-white/35",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div
                  className={[
                    "text-[10px] font-black uppercase tracking-[0.2em]",
                    theme === "opinions"
                      ? "text-violet-300"
                      : styles.accentText,
                  ].join(" ")}
                >
                  Lesson route
                </div>

                <div
                  className={[
                    "mt-1 text-sm font-bold",
                    theme === "opinions"
                      ? "text-slate-300"
                      : "text-slate-600",
                  ].join(" ")}
                >
                  45 minutes from activation to independent use.
                </div>
              </div>

              <ChevronRight
                size={18}
                className={
                  theme === "opinions"
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              />
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
              {stages.map((stage, index) => (
                <div
                  key={stage.title}
                  className={[
                    "rounded-2xl border p-3.5 transition-all duration-200 hover:-translate-y-0.5",
                    theme === "opinions"
                      ? "border-white/10 bg-white/[0.035] hover:bg-white/[0.06]"
                      : "border-white/75 bg-white/60 hover:bg-white/85",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={[
                        "flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-black",
                        theme === "opinions"
                          ? "bg-violet-500/15 text-violet-300"
                          : `${styles.accentSoft} ${styles.accentText}`,
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={[
                        "text-[10px] font-bold",
                        theme === "opinions"
                          ? "text-slate-500"
                          : "text-slate-400",
                      ].join(" ")}
                    >
                      {stage.time} min
                    </span>
                  </div>

                  <p className="mt-3 text-xs font-extrabold leading-5">
                    {stage.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HeroPreview({ theme }: { theme: Theme }) {
  if (theme === "animals") {
    return (
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-orange-300/20 via-rose-300/20 to-emerald-300/20 blur-2xl" />

        <motion.div
          className="relative rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-2xl backdrop-blur-xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
              Animal explorer
            </span>

            <span className="text-xs font-bold text-slate-400">
              04 words
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {animals.slice(0, 4).map(([emoji, word]) => (
              <motion.div
                key={word}
                whileHover={{ y: -4, rotate: -1 }}
                className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-emerald-50 p-4"
              >
                <div className="text-4xl">{emoji}</div>
                <div className="mt-4 text-sm font-black capitalize text-slate-900">
                  {word}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  learn · listen · use
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                🔊
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-orange-300">
                  Listening
                </div>
                <div className="mt-1 text-sm font-bold">
                  Hear it. Tap it. Remember it.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (theme === "routines") {
    return (
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-sky-300/25 via-blue-300/15 to-indigo-400/20 blur-2xl" />

        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-2xl backdrop-blur-xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 p-6">
            <div className="absolute right-4 top-3 text-5xl opacity-70">☀️</div>

            <div className="relative">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                Mia's weekday
              </div>

              <div className="mt-7 text-6xl font-black tracking-[-0.05em] text-blue-950">
                07:00
              </div>

              <div className="mt-2 text-sm font-bold text-blue-800">
                wake up
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {routines.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3"
              >
                <span className="w-12 text-xs font-black text-blue-600">
                  {routineTimes[index]}
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-violet-600/25 via-fuchsia-500/15 to-cyan-500/10 blur-2xl" />

      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b18]/90 p-5 shadow-2xl backdrop-blur-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
              Speaking lab
            </span>
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-300">
              B1–B2
            </span>
          </div>

          <div className="mt-9 text-5xl font-black tracking-[-0.04em] text-white">
            00:47
          </div>

          <div className="mt-5 h-2 rounded-full bg-white/10">
            <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2">
            {["Position", "Reason", "Example", "Counterargument"].map(
              (item, index) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.045] p-3"
                >
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                    0{index + 1}
                  </span>

                  <p className="mt-2 text-xs font-bold text-slate-200">
                    {item}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Screen({
  theme,
  step,
  next,
  feedback,
  setFeedback,
  card,
  setCard,
}: {
  theme: Theme;
  step: number;
  next: (point?: boolean) => void;
  feedback: string;
  setFeedback: (text: string) => void;
  card: {
    name: string;
    detail: string;
    sentence: string;
    counterargument: string;
  };
  setCard: React.Dispatch<
    React.SetStateAction<{
      name: string;
      detail: string;
      sentence: string;
      counterargument: string;
    }>
  >;
}) {
  if (step === 0) {
    return <Welcome theme={theme} next={next} />;
  }

  if (step === 1) {
    return <Warmup theme={theme} next={next} />;
  }

  if (step === 2) {
    return <Context theme={theme} next={next} />;
  }

  if (step === 3) {
    return <Noticing theme={theme} next={next} />;
  }

  if (step === 4) {
    return (
      <Discovery
        theme={theme}
        next={next}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    );
  }

  if (step === 5) {
    return (
      <ControlledPractice
        theme={theme}
        next={next}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    );
  }

  if (step === 6) {
    return (
      <SkillsTask
        theme={theme}
        next={next}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    );
  }

  if (step === 7) {
    return (
      <Production
        theme={theme}
        next={next}
        card={card}
        setCard={setCard}
      />
    );
  }

  if (step === 8) {
    return <Reflection theme={theme} next={next} />;
  }

  return (
    <FinalAssessment
      theme={theme}
      next={next}
      feedback={feedback}
      setFeedback={setFeedback}
    />
  );
}

function Title({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  const accent =
    theme === "animals"
      ? "from-orange-500 via-rose-500 to-emerald-600"
      : theme === "routines"
        ? "from-sky-500 via-blue-600 to-indigo-600"
        : "from-violet-300 via-fuchsia-400 to-cyan-300";

  return (
    <div>
      <h1
        className={[
          "max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.05em] sm:text-5xl lg:text-6xl",
          theme === "opinions" ? "text-white" : "text-slate-950",
        ].join(" ")}
      >
        {children}
      </h1>

      <div
        className={`mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r ${accent}`}
      />
    </div>
  );
}

function Continue({
  ready,
  onClick,
  text = "Continue",
  theme = "routines",
  large = false,
}: {
  ready: boolean;
  onClick: () => void;
  text?: string;
  theme?: Theme;
  large?: boolean;
}) {
  const styles = themeData[theme];

  return (
    <motion.button
      whileHover={ready ? { y: -2, scale: 1.01 } : undefined}
      whileTap={ready ? { scale: 0.98 } : undefined}
      className={[
        "mt-6 inline-flex items-center justify-center gap-3 rounded-2xl text-white shadow-[0_14px_30px_rgba(15,23,42,.16)] transition-all duration-200",
        "bg-gradient-to-r",
        styles.accent,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        styles.ring,
        large ? "min-h-14 px-6 text-sm sm:px-7" : "min-h-12 px-5 text-sm",
        "font-black",
        "disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none",
      ].join(" ")}
      disabled={!ready}
      onClick={onClick}
      aria-disabled={!ready}
    >
      {text}
      <ArrowRight size={18} />
    </motion.button>
  );
}

function Feedback({
  text,
  good = true,
  theme,
}: {
  text: string;
  good?: boolean;
  theme: Theme;
}) {
  if (!text) {
    return <div className="min-h-14" aria-live="polite" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={[
        "mt-5 flex min-h-12 items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold leading-6",
        good
          ? theme === "opinions"
            ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-200"
            : "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-700",
      ].join(" ")}
      aria-live="polite"
    >
      {good ? <Check size={18} /> : <Zap size={17} />}
      {text}
    </motion.div>
  );
}

function Welcome({
  theme,
  next,
}: {
  theme: Theme;
  next: () => void;
}) {
  return (
    <>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div>
          <Title theme={theme}>
            Welcome to your
            <br />
            <em>45-minute focus.</em>
          </Title>

          <p
            className={[
              "mt-5 max-w-2xl text-base leading-7 sm:text-lg",
              theme === "opinions"
                ? "text-slate-300"
                : "text-slate-600",
            ].join(" ")}
          >
            This lesson is a guided journey: activate ideas, notice patterns,
            practise, create and finish with a real-world task.
          </p>

          <Continue
            ready
            onClick={next}
            text="I'm ready"
            theme={theme}
          />
        </div>

        <div
          className={[
            "relative overflow-hidden rounded-[2rem] border p-6",
            theme === "opinions"
              ? "border-white/10 bg-gradient-to-br from-violet-500/15 to-indigo-500/5"
              : theme === "animals"
                ? "border-orange-100 bg-gradient-to-br from-orange-50 to-emerald-50"
                : "border-blue-100 bg-gradient-to-br from-sky-50 to-indigo-50",
          ].join(" ")}
        >
          <div className="absolute -right-10 -top-10 text-8xl opacity-10">
            {themeData[theme].icon}
          </div>

          <span
            className={[
              "text-[10px] font-black uppercase tracking-[0.2em]",
              theme === "opinions"
                ? "text-violet-300"
                : themeData[theme].accentText,
            ].join(" ")}
          >
            Your mission
          </span>

          <div className="mt-8">
            <div
              className={[
                "text-5xl font-black tracking-[-0.05em]",
                theme === "opinions"
                  ? "text-white"
                  : "text-slate-950",
              ].join(" ")}
            >
              10
            </div>

            <div
              className={[
                "mt-1 text-sm font-bold",
                theme === "opinions"
                  ? "text-slate-300"
                  : "text-slate-500",
              ].join(" ")}
            >
              focused stages
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2">
            {[
              ["Input", "learn"],
              ["Practice", "use"],
              ["Production", "create"],
              ["Reflection", "notice"],
            ].map(([label, value]) => (
              <div
                key={label}
                className={[
                  "rounded-2xl border p-3.5",
                  theme === "opinions"
                    ? "border-white/10 bg-white/[0.045]"
                    : "border-white/80 bg-white/70",
                ].join(" ")}
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {label}
                </div>
                <div
                  className={[
                    "mt-1 text-sm font-black",
                    theme === "opinions"
                      ? "text-white"
                      : "text-slate-800",
                  ].join(" ")}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Warmup({ theme, next }: { theme: Theme; next: () => void }) {
  if (theme === "routines") {
    return <RoutineWarmup next={next} />;
  }

  if (theme === "opinions") {
    return <OpinionWarmup next={next} />;
  }

  const [choices, setChoices] = useState<string[]>([]);

  return (
    <>
      <Title theme={theme}>
        Which animals
        <br />
        <em>do you know?</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Tap the animals you already know. Watch your collection grow.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {animals.map(([emoji, name]) => {
          const selected = choices.includes(name);

          return (
            <motion.button
              key={name}
              whileHover={{ y: -6, rotate: selected ? 0 : -1 }}
              whileTap={{ scale: 0.98 }}
              className={[
                "group relative overflow-hidden rounded-[2rem] border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
                selected
                  ? "border-orange-300 bg-gradient-to-br from-orange-50 via-white to-emerald-50 shadow-[0_18px_40px_rgba(249,115,22,.14)]"
                  : "border-white/80 bg-white/75 hover:border-orange-200 hover:bg-white hover:shadow-xl",
              ].join(" ")}
              onClick={() =>
                setChoices((current) =>
                  selected
                    ? current.filter((item) => item !== name)
                    : [...current, name],
                )
              }
              aria-pressed={selected}
            >
              <div className="absolute right-[-1.5rem] top-[-1.5rem] h-20 w-20 rounded-full bg-orange-100/50 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <motion.span
                  className="text-5xl"
                  animate={selected ? { scale: 1.08, rotate: [0, -4, 4, 0] } : {}}
                >
                  {emoji}
                </motion.span>

                <span
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full border transition-all",
                    selected
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-slate-200 bg-white text-transparent",
                  ].join(" ")}
                >
                  <Check size={15} />
                </span>
              </div>

              <div className="relative mt-7 text-lg font-black capitalize text-slate-900">
                {name}
              </div>

              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                {selected ? "collected" : "tap to collect"}
              </div>
            </motion.button>
          );
        })}
      </div>

      <Feedback
        theme={theme}
        text={
          choices.length
            ? `${choices.length} animal${
                choices.length > 1 ? "s" : ""
              } in your collection.`
            : ""
        }
      />

      <Continue
        ready={choices.length > 0}
        onClick={next}
        text="Start exploring"
        theme={theme}
      />
    </>
  );
}

function RoutineWarmup({ next }: { next: () => void }) {
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);

  const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0",
  )}`;

  return (
    <>
      <Title theme="routines">
        What time do you
        <br />
        <em>start your day?</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Build your first moment of the day with the interactive clock.
      </p>

      <div className="mt-7 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 shadow-xl"
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute right-5 top-5 text-4xl">☀️</div>
          <div className="absolute bottom-5 left-5 text-3xl opacity-60">
            ☁️
          </div>

          <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-white/75 shadow-[inset_0_0_0_14px_rgba(255,255,255,.7),0_25px_60px_rgba(59,130,246,.18)]">
            {[12, 3, 6, 9].map((item) => (
              <span
                key={item}
                className="absolute text-xs font-black text-blue-800"
                style={{
                  top:
                    item === 12
                      ? "10px"
                      : item === 6
                        ? "calc(100% - 28px)"
                        : "50%",
                  left:
                    item === 3
                      ? "calc(100% - 27px)"
                      : item === 9
                        ? "10px"
                        : "50%",
                  transform:
                    item === 12 || item === 6
                      ? "translateX(-50%)"
                      : "translateY(-50%)",
                }}
              >
                {item}
              </span>
            ))}

            <div className="text-center">
              <div className="text-4xl font-black tracking-[-0.05em] text-blue-950">
                {formatted}
              </div>

              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-500">
                start here
              </div>
            </div>

            <div className="absolute bottom-1/2 left-1/2 h-16 w-1 origin-bottom -translate-x-1/2 rounded-full bg-blue-600" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700" />
          </div>
        </motion.div>

        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            Tune the time
          </div>

          <div className="mt-6 grid gap-6">
            <label>
              <span className="mb-3 block text-sm font-black text-slate-800">
                Hour
              </span>

              <input
                type="range"
                min="5"
                max="11"
                value={hour}
                onChange={(event) => setHour(Number(event.target.value))}
                aria-label="Choose hour"
                className="w-full accent-blue-600"
              />

              <div className="mt-2 flex justify-between text-[10px] font-black text-slate-400">
                <span>05</span>
                <span>08</span>
                <span>11</span>
              </div>
            </label>

            <label>
              <span className="mb-3 block text-sm font-black text-slate-800">
                Minutes
              </span>

              <input
                type="range"
                min="0"
                max="45"
                step="15"
                value={minute}
                onChange={(event) => setMinute(Number(event.target.value))}
                aria-label="Choose minutes"
                className="w-full accent-indigo-600"
              />

              <div className="mt-2 flex justify-between text-[10px] font-black text-slate-400">
                <span>00</span>
                <span>30</span>
                <span>45</span>
              </div>
            </label>
          </div>

          <div className="mt-7 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
              Your first sentence
            </span>

            <p className="mt-2 text-base font-black text-blue-950">
              I wake up at {formatted}.
            </p>
          </div>
        </div>
      </div>

      <Feedback
        theme="routines"
        text={`Nice. Your day starts at ${formatted}.`}
      />

      <Continue
        ready
        onClick={next}
        text="Explore Mia's day"
        theme="routines"
      />
    </>
  );
}

function OpinionWarmup({ next }: { next: () => void }) {
  const [choice, setChoice] = useState("");
  const [statement, setStatement] = useState(
    "Homework should be shorter.",
  );

  const statements = [
    "Homework should be shorter.",
    "Online learning is better than classroom learning.",
    "School uniforms are useful.",
    "Social media does more good than harm.",
  ];

  return (
    <>
      <Title theme="opinions">
        Take a position.
        <br />
        <em>Make it yours.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
        Pick a statement, listen to it and decide where you stand.
      </p>

      <div className="mt-7 rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/15 via-white/[0.035] to-cyan-500/5 p-6 shadow-2xl sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
              Your statement
            </span>

            <motion.h2
              key={statement}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 max-w-3xl text-2xl font-black leading-tight text-white sm:text-4xl"
            >
              {statement}
            </motion.h2>
          </div>

          <button
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            onClick={() => speak(statement)}
            aria-label="Listen to statement"
          >
            <Volume2 size={18} />
            Listen
          </button>
        </div>

        <div className="mt-7 flex gap-3 overflow-x-auto pb-1">
          {statements.map((item) => (
            <button
              key={item}
              className={[
                "min-w-[245px] rounded-2xl border px-4 py-4 text-left text-xs font-bold transition-all",
                statement === item
                  ? "border-violet-400/50 bg-violet-500/15 text-white"
                  : "border-white/10 bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-slate-200",
              ].join(" ")}
              onClick={() => {
                setStatement(item);
                setChoice("");
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["Agree", "It depends", "Disagree"].map((item) => (
          <motion.button
            key={item}
            whileHover={{ y: -3 }}
            className={[
              "min-h-20 rounded-3xl border text-base font-black transition-all",
              choice === item
                ? "border-violet-300 bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-xl shadow-violet-950/20"
                : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]",
            ].join(" ")}
            onClick={() => setChoice(item)}
            aria-pressed={choice === item}
          >
            {item}
          </motion.button>
        ))}
      </div>

      <Feedback
        theme="opinions"
        text={
          choice
            ? `Position chosen: ${choice}. Let's build the argument.`
            : ""
        }
      />

      <Continue
        ready={!!choice}
        onClick={next}
        theme="opinions"
      />
    </>
  );
}

function Context({ theme, next }: { theme: Theme; next: () => void }) {
  if (theme === "routines") {
    return <RoutineContext next={next} />;
  }

  if (theme === "opinions") {
    return <OpinionContext next={next} />;
  }

  const [seen, setSeen] = useState<number[]>([]);

  const data = [
    {
      emoji: "🐘",
      sentence: "An elephant has big ears.",
    },
    {
      emoji: "🦁",
      sentence: "A lion can roar.",
    },
    {
      emoji: "🐮",
      sentence: "A cow lives on a farm.",
    },
  ];

  return (
    <>
      <Title theme={theme}>
        Explore the
        <br />
        <em>animal clues.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Open each card, listen to the sentence and notice the language in
        context.
      </p>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {data.map((item, index) => {
          const active = seen.includes(index);

          return (
            <motion.button
              key={item.sentence}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.985 }}
              className={[
                "relative min-h-60 overflow-hidden rounded-[2rem] border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
                active
                  ? "border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-orange-50 shadow-xl shadow-emerald-100/40"
                  : "border-white/80 bg-white/75 hover:shadow-xl",
              ].join(" ")}
              onClick={() => {
                setSeen((current) =>
                  current.includes(index)
                    ? current
                    : [...current, index],
                );
                speak(item.sentence);
              }}
            >
              <div className="absolute right-[-1rem] top-[-1rem] h-24 w-24 rounded-full bg-orange-200/30 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <span className="text-5xl">{item.emoji}</span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
                  <Volume2 size={18} />
                </span>
              </div>

              <div className="relative mt-9">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                  Card 0{index + 1}
                </div>

                <p className="mt-3 text-lg font-black leading-7 text-slate-800">
                  {item.sentence}
                </p>
              </div>

              {active && (
                <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check size={16} />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/80 px-5 py-4 text-sm font-semibold leading-6 text-orange-950">
        Language is easier to remember when you meet it inside a meaningful
        situation.
      </div>

      <Continue
        ready={seen.length === data.length}
        onClick={next}
        text="I've explored it"
        theme={theme}
      />
    </>
  );
}

function RoutineContext({ next }: { next: () => void }) {
  const [seen, setSeen] = useState<string[]>([]);

  return (
    <>
      <Title theme="routines">
        Meet Mia's
        <br />
        <em>weekday.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Follow one ordinary day from sunrise to bedtime.
      </p>

      <div className="mt-7 rounded-[2rem] border border-white/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 shadow-xl sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
              Mia's weekday
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-500">
              Morning → afternoon → evening
            </div>
          </div>

          <div className="text-3xl">☀️</div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-5">
          {routines.map((activity, index) => {
            const active = seen.includes(activity);

            return (
              <motion.button
                key={activity}
                whileHover={{ y: -4 }}
                className={[
                  "relative rounded-3xl border p-5 text-left transition-all",
                  active
                    ? "border-blue-300 bg-white shadow-lg"
                    : "border-blue-100 bg-white/60 hover:bg-white",
                ].join(" ")}
                onClick={() =>
                  setSeen((current) =>
                    current.includes(activity)
                      ? current
                      : [...current, activity],
                  )
                }
              >
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-500">
                  {routineTimes[index]}
                </span>

                <div className="mt-5 text-2xl">
                  {index === 0
                    ? "🌅"
                    : index === 1
                      ? "🥣"
                      : index === 2
                        ? "🎒"
                        : index === 3
                          ? "✏️"
                          : "🌙"}
                </div>

                <div className="mt-4 text-sm font-black text-slate-800">
                  {activity}
                </div>

                {active && (
                  <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check size={14} />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/80 px-5 py-4 text-sm font-semibold leading-6 text-blue-950">
        Mia wakes up at 7:00, has breakfast at 7:30 and goes to school at
        8:00.
      </div>

      <Continue
        ready={seen.length === routines.length}
        onClick={next}
        text="Continue"
        theme="routines"
      />
    </>
  );
}

function OpinionContext({ next }: { next: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);

  const model = [
    {
      label: "POSITION",
      color: "from-violet-500/20 to-fuchsia-500/5",
      text: "In my view, homework should be shorter.",
    },
    {
      label: "REASON",
      color: "from-blue-500/20 to-cyan-500/5",
      text: "Students need more time to rest.",
    },
    {
      label: "EXAMPLE",
      color: "from-fuchsia-500/20 to-violet-500/5",
      text: "For example, they can spend time with their families.",
    },
  ];

  return (
    <>
      <Title theme="opinions">
        See how a strong
        <br />
        <em>answer is built.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
        Open the pieces of the response and discover why each one matters.
      </p>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {model.map((item, index) => {
          const active = opened.includes(item.label);

          return (
            <motion.button
              key={item.label}
              whileHover={{ y: -6 }}
              className={[
                "min-h-56 rounded-[2rem] border bg-gradient-to-br p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                item.color,
                active
                  ? "border-white/20 shadow-2xl"
                  : "border-white/10 hover:border-white/20",
              ].join(" ")}
              onClick={() =>
                setOpened((current) =>
                  current.includes(item.label)
                    ? current
                    : [...current, item.label],
                )
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.2em] text-violet-300">
                  0{index + 1}
                </span>

                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
              </div>

              <motion.div
                key={active ? "open" : "closed"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10"
              >
                <div className="text-lg font-black leading-7 text-white">
                  {active ? item.text : "Tap to reveal"}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <Continue
        ready={opened.length === model.length}
        onClick={next}
        text="I can see the structure"
        theme="opinions"
      />
    </>
  );
}

function Noticing({ theme, next }: { theme: Theme; next: () => void }) {
  if (theme === "routines") {
    return <RoutineNoticing next={next} />;
  }

  if (theme === "opinions") {
    return <OpinionNoticing next={next} />;
  }

  const [shown, setShown] = useState<string[]>([]);

  return (
    <>
      <Title theme="animals">
        Notice the
        <br />
        <em>language toolkit.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Reveal each word, see its pronunciation and hear it out loud.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {animals.map(([emoji, word, pronunciation], index) => {
          const active = shown.includes(word);

          return (
            <motion.button
              key={word}
              whileHover={{ y: -5 }}
              className={[
                "group rounded-[2rem] border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
                active
                  ? "border-orange-300 bg-gradient-to-br from-orange-50 to-emerald-50 shadow-lg"
                  : "border-white/80 bg-white/75 hover:bg-white hover:shadow-xl",
              ].join(" ")}
              onClick={() =>
                setShown((current) =>
                  current.includes(word)
                    ? current
                    : [...current, word],
                )
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-5xl">{emoji}</span>

                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full transition",
                    active
                      ? "bg-white text-orange-500 shadow-sm"
                      : "bg-orange-50 text-orange-400",
                  ].join(" ")}
                >
                  <Volume2 size={16} />
                </span>
              </div>

              <div className="mt-7">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                  0{index + 1}
                </div>

                <b className="mt-2 block text-lg font-black text-slate-900">
                  {active ? word : "Tap to reveal"}
                </b>

                {active && (
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <small className="text-sm font-semibold text-slate-500">
                      {pronunciation}
                    </small>

                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Listen to ${word}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition hover:bg-orange-200"
                      onClick={(event) => {
                        event.stopPropagation();
                        speak(word);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          speak(word);
                        }
                      }}
                    >
                      <Volume2 size={15} />
                    </span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/80 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
          <Volume2 size={16} />
        </div>

        <p className="text-sm font-semibold leading-6 text-orange-950">
          Listen, repeat and connect the sound to the word.
        </p>
      </div>

      <Continue
        ready={shown.length === animals.length}
        onClick={next}
        text="I know the vocabulary"
        theme="animals"
      />
    </>
  );
}

function RoutineNoticing({ next }: { next: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);

  const items = [
    ["I", "go", "I go to school."],
    ["She", "goes", "She goes to school."],
    ["I", "have", "I have breakfast."],
    ["She", "has", "She has breakfast."],
  ];

  return (
    <>
      <Title theme="routines">
        Notice the
        <br />
        <em>tiny change.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Compare I and she. Something small changes the verb.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {items.map(([subject, verb, sentence]) => {
          const active = opened.includes(sentence);

          return (
            <button
              key={sentence}
              className={[
                "rounded-[2rem] border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                active
                  ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                  : "border-white/80 bg-white/75 hover:-translate-y-1 hover:shadow-lg",
              ].join(" ")}
              onClick={() =>
                setOpened((current) =>
                  current.includes(sentence)
                    ? current
                    : [...current, sentence],
                )
              }
            >
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-600">
                  {subject}
                </span>

                <span
                  className={[
                    "text-3xl font-black",
                    subject === "She"
                      ? "text-blue-600"
                      : "text-slate-800",
                  ].join(" ")}
                >
                  {verb}
                </span>

                {subject === "She" && (
                  <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-[10px] font-black text-blue-600">
                    3RD PERSON
                  </span>
                )}
              </div>

              <p className="mt-6 text-sm font-semibold leading-7 text-slate-600">
                {active ? sentence : "Tap to reveal the full sentence"}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              I
            </span>
            <p className="mt-2 text-2xl font-black text-slate-900">
              go · have
            </p>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
              she
            </span>
            <p className="mt-2 text-2xl font-black text-blue-700">
              goes · has
            </p>
          </div>
        </div>
      </div>

      <Continue
        ready={opened.length === items.length}
        onClick={next}
        text="I see the pattern"
        theme="routines"
      />
    </>
  );
}

function OpinionNoticing({ next }: { next: () => void }) {
  const [opened, setOpened] = useState<string[]>([]);

  const phrases = [
    "In my view...",
    "One reason is...",
    "For example...",
    "I see your point, but...",
  ];

  return (
    <>
      <Title theme="opinions">
        Build your
        <br />
        <em>language toolkit.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
        These phrases help you sound clear, structured and respectful.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {phrases.map((phrase, index) => {
          const active = opened.includes(phrase);

          return (
            <motion.button
              key={phrase}
              whileHover={{ y: -5 }}
              className={[
                "group rounded-[2rem] border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                active
                  ? "border-violet-400/30 bg-gradient-to-br from-violet-500/15 to-indigo-500/5"
                  : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]",
              ].join(" ")}
              onClick={() => {
                setOpened((current) =>
                  current.includes(phrase)
                    ? current
                    : [...current, phrase],
                );
                speak(phrase);
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    0{index + 1}
                  </span>

                  <b className="mt-4 block text-xl font-black text-white">
                    {phrase}
                  </b>
                </div>

                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                    active
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-violet-300",
                  ].join(" ")}
                >
                  <Volume2 size={18} />
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <Continue
        ready={opened.length === phrases.length}
        onClick={next}
        text="Collect the toolkit"
        theme="opinions"
      />
    </>
  );
}

function Discovery({
  theme,
  next,
  feedback,
  setFeedback,
}: {
  theme: Theme;
  next: () => void;
  feedback: string;
  setFeedback: (text: string) => void;
}) {
  const [answer, setAnswer] = useState("");

  const data =
    theme === "animals"
      ? {
          prompt: "It's a lion. It has a mane. It can roar.",
          options: [
            "It's a... / It has... / It can...",
            "It are... / It do... / It have...",
          ],
          correct: "It's a... / It has... / It can...",
          helper: "Name · appearance · ability",
        }
      : theme === "routines"
        ? {
            prompt: "I go to school. → She goes to school.",
            options: [
              "Add -s or -es to the verb.",
              "Always use the base verb.",
            ],
            correct: "Add -s or -es to the verb.",
            helper: "Notice the subject and the verb together.",
          }
        : {
            prompt:
              "In my view, uniforms are useful because they save time. For example, mornings feel easier.",
            options: [
              "Position + reason + example",
              "A position without support",
            ],
            correct: "Position + reason + example",
            helper: "Strong answers make the thinking visible.",
          };

  const correct = answer === data.correct;

  const choose = (value: string) => {
    setAnswer(value);

    setFeedback(
      value === data.correct
        ? "Excellent. You discovered the useful pattern."
        : "Not quite. Look at the example again.",
    );
  };

  return (
    <>
      <Title theme={theme}>
        Discover the
        <br />
        <em>rule yourself.</em>
      </Title>

      <div
        className={[
          "mt-7 overflow-hidden rounded-[2rem] border p-6 sm:p-8",
          theme === "opinions"
            ? "border-white/10 bg-gradient-to-br from-violet-500/10 to-indigo-500/5"
            : theme === "animals"
              ? "border-orange-100 bg-gradient-to-br from-orange-50 to-emerald-50"
              : "border-blue-100 bg-gradient-to-br from-sky-50 to-indigo-50",
        ].join(" ")}
      >
        <span
          className={[
            "text-[10px] font-black uppercase tracking-[0.2em]",
            theme === "opinions"
              ? "text-violet-300"
              : themeData[theme].accentText,
          ].join(" ")}
        >
          Look closely
        </span>

        <h2
          className={[
            "mt-5 max-w-4xl text-xl font-black leading-8 sm:text-3xl",
            theme === "opinions" ? "text-white" : "text-slate-900",
          ].join(" ")}
        >
          {data.prompt}
        </h2>

        <div
          className={[
            "mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold",
            theme === "opinions"
              ? "bg-white/5 text-slate-300"
              : "bg-white/70 text-slate-500",
          ].join(" ")}
        >
          {data.helper}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {data.options.map((option) => {
          const selected = answer === option;
          const isCorrect = selected && correct;

          return (
            <motion.button
              key={option}
              whileHover={{ x: 3 }}
              className={[
                "min-h-16 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2",
                theme === "opinions"
                  ? "focus-visible:ring-violet-400"
                  : themeData[theme].ring,
                isCorrect
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : selected
                    ? "border-rose-300 bg-rose-50 text-rose-700"
                    : theme === "opinions"
                      ? "border-white/10 bg-white/[0.035] text-slate-200 hover:bg-white/[0.065]"
                      : "border-slate-200 bg-white/75 text-slate-700 hover:border-slate-300 hover:bg-white",
              ].join(" ")}
              onClick={() => choose(option)}
            >
              <div className="flex items-center justify-between gap-4">
                <span>{option}</span>

                {isCorrect && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check size={14} />
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <Feedback
        theme={theme}
        text={feedback}
        good={correct}
      />

      <Continue
        ready={correct}
        onClick={() => next()}
        theme={theme}
      />
    </>
  );
}

function ControlledPractice({
  theme,
  next,
  feedback,
  setFeedback,
}: {
  theme: Theme;
  next: (point?: boolean) => void;
  feedback: string;
  setFeedback: (text: string) => void;
}) {
  if (theme === "animals") {
    return (
      <SentenceBuilder
        theme={theme}
        next={next}
        feedback={feedback}
        setFeedback={setFeedback}
        target={["It", "can", "jump"]}
        distractors={["has", "a", "lion"]}
      />
    );
  }

  if (theme === "opinions") {
    return (
      <SentenceBuilder
        theme={theme}
        next={next}
        feedback={feedback}
        setFeedback={setFeedback}
        target={["In my view", "online learning", "can be flexible"]}
        distractors={["because", "but", "yesterday"]}
      />
    );
  }

  return (
    <GapFill
      next={next}
      feedback={feedback}
      setFeedback={setFeedback}
    />
  );
}

function SentenceBuilder({
  theme,
  next,
  feedback,
  setFeedback,
  target,
  distractors,
}: {
  theme: Theme;
  next: (point?: boolean) => void;
  feedback: string;
  setFeedback: (text: string) => void;
  target: string[];
  distractors: string[];
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const allWords = [...target, ...distractors];

  const correct =
    selected.length === target.length &&
    target.every((word, index) => selected[index] === word);

  const choose = (word: string) => {
    if (selected.includes(word)) return;

    const nextSelection = [...selected, word];
    setSelected(nextSelection);

    if (nextSelection.length === target.length) {
      const isCorrect = target.every(
        (item, index) => nextSelection[index] === item,
      );

      setFeedback(
        isCorrect
          ? "Perfect. Your sentence is in the correct order."
          : "Almost. Try again and think about the structure.",
      );
    }
  };

  const reset = () => {
    setSelected([]);
    setFeedback("");
  };

  return (
    <>
      <Title theme={theme}>
        Build the sentence
        <br />
        <em>step by step.</em>
      </Title>

      <p
        className={[
          "mt-4 max-w-2xl text-base leading-7",
          theme === "opinions" ? "text-slate-300" : "text-slate-600",
        ].join(" ")}
      >
        Tap the blocks in the order that creates a natural sentence.
      </p>

      <div
        className={[
          "mt-7 rounded-[2rem] border p-5 sm:p-7",
          theme === "opinions"
            ? "border-white/10 bg-white/[0.035]"
            : "border-slate-200 bg-white/70",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-4">
          <span
            className={[
              "text-[10px] font-black uppercase tracking-[0.2em]",
              theme === "opinions"
                ? "text-violet-300"
                : themeData[theme].accentText,
            ].join(" ")}
          >
            Your sentence
          </span>

          <span
            className={[
              "rounded-full px-2.5 py-1 text-[10px] font-black",
              theme === "opinions"
                ? "bg-white/5 text-slate-500"
                : "bg-slate-100 text-slate-400",
            ].join(" ")}
          >
            {selected.length}/{target.length}
          </span>
        </div>

        <div className="mt-5 flex min-h-20 flex-wrap items-center gap-2 rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/70 p-4">
          {selected.length ? (
            selected.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={[
                  "rounded-xl px-3.5 py-2.5 text-sm font-black shadow-sm",
                  theme === "opinions"
                    ? "border border-violet-400/20 bg-violet-500/15 text-violet-200"
                    : "border border-blue-100 bg-white text-slate-800",
                ].join(" ")}
              >
                {word}
              </motion.span>
            ))
          ) : (
            <span className="text-sm font-semibold text-slate-400">
              Tap words below...
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {allWords.map((word) => {
          const disabled = selected.includes(word);

          return (
            <motion.button
              key={word}
              whileHover={!disabled ? { y: -3, rotate: -1 } : undefined}
              whileTap={!disabled ? { scale: 0.97 } : undefined}
              disabled={disabled}
              onClick={() => choose(word)}
              className={[
                "min-h-12 rounded-2xl border px-4 py-3 text-sm font-black shadow-sm transition-all",
                theme === "opinions"
                  ? "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.10] focus-visible:ring-violet-400"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:shadow-md focus-visible:ring-blue-400",
                "focus-visible:outline-none focus-visible:ring-2",
                disabled ? "cursor-default opacity-25" : "",
              ].join(" ")}
            >
              {word}
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={reset}
        className={[
          "mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2",
          theme === "opinions"
            ? "text-slate-400 hover:bg-white/5 focus-visible:ring-violet-400"
            : "text-slate-500 hover:bg-slate-100 focus-visible:ring-blue-400",
        ].join(" ")}
      >
        <RotateCcw size={15} />
        Reset
      </button>

      <Feedback
        theme={theme}
        text={feedback}
        good={correct}
      />

      <Continue
        ready={correct}
        onClick={() => next(true)}
        theme={theme}
      />
    </>
  );
}

function GapFill({
  next,
  feedback,
  setFeedback,
}: {
  next: (point?: boolean) => void;
  feedback: string;
  setFeedback: (text: string) => void;
}) {
  const [answer, setAnswer] = useState("");

  const options = ["goes", "go", "going"];
  const correct = answer === "goes";

  const choose = (value: string) => {
    setAnswer(value);

    setFeedback(
      value === "goes"
        ? "Correct. Mia is third person singular, so we use goes."
        : "Try again. Look at the subject: Mia = she.",
    );
  };

  return (
    <>
      <Title theme="routines">
        Make it
        <br />
        <em>accurate.</em>
      </Title>

      <div className="mt-7 overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 shadow-xl">
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-4 text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Controlled practice
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            Complete the sentence
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl">
            Mia <strong className="text-blue-600">___</strong> to school at
            eight.
          </h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ y: -3 }}
            className={[
              "min-h-16 rounded-2xl border text-base font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              answer === option
                ? correct
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-lg"
                  : "border-rose-300 bg-rose-50 text-rose-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:shadow-lg",
            ].join(" ")}
            onClick={() => choose(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <Feedback
        theme="routines"
        text={feedback}
        good={correct}
      />

      <Continue
        ready={correct}
        onClick={() => next(true)}
        theme="routines"
      />
    </>
  );
}

function SkillsTask({
  theme,
  next,
  feedback,
  setFeedback,
}: {
  theme: Theme;
  next: (point?: boolean) => void;
  feedback: string;
  setFeedback: (text: string) => void;
}) {
  const [answer, setAnswer] = useState("");

  const data =
    theme === "animals"
      ? {
          prompt:
            "Luna is a rabbit. She has long ears and can jump. Where is Luna most likely a pet?",
          options: ["At home", "In the ocean", "On a school bus"],
          correct: "At home",
        }
      : theme === "routines"
        ? {
            prompt:
              "Mia has breakfast at 7:30 and goes to school at 8:00. What does she do first?",
            options: [
              "She has breakfast.",
              "She goes to school.",
              "She does homework.",
            ],
            correct: "She has breakfast.",
          }
        : {
            prompt:
              'A classmate says: "Uniforms are boring." Choose a respectful response.',
            options: [
              "I see your point, but uniforms can make mornings easier.",
              "That is a stupid idea.",
              "Uniforms boring.",
            ],
            correct:
              "I see your point, but uniforms can make mornings easier.",
          };

  const correct = answer === data.correct;

  const choose = (value: string) => {
    setAnswer(value);

    setFeedback(
      value === data.correct
        ? "Excellent. You understood the meaning and chose the best response."
        : "Not quite. Read the prompt again and look for the strongest clue.",
    );
  };

  return (
    <>
      <Title theme={theme}>
        Read for
        <br />
        <em>real meaning.</em>
      </Title>

      <div
        className={[
          "mt-7 overflow-hidden rounded-[2rem] border",
          theme === "opinions"
            ? "border-white/10 bg-[#080b18]"
            : theme === "animals"
              ? "border-orange-100 bg-white/80"
              : "border-blue-100 bg-white/80",
        ].join(" ")}
      >
        <div
          className={[
            "px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]",
            theme === "opinions"
              ? "bg-violet-500/10 text-violet-300"
              : theme === "animals"
                ? "bg-orange-50 text-orange-600"
                : "bg-blue-50 text-blue-600",
          ].join(" ")}
        >
          Mini skills task · 7 min
        </div>

        <div className="p-6 sm:p-8">
          <h2
            className={[
              "max-w-4xl text-xl font-black leading-8 sm:text-3xl",
              theme === "opinions" ? "text-white" : "text-slate-900",
            ].join(" ")}
          >
            {data.prompt}
          </h2>

          <button
            className={[
              "mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2",
              theme === "opinions"
                ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 focus-visible:ring-violet-400"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-blue-400",
            ].join(" ")}
            onClick={() => speak(data.prompt)}
          >
            <Volume2 size={17} />
            Listen
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {data.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ x: 3 }}
            className={[
              "min-h-16 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2",
              theme === "opinions"
                ? "focus-visible:ring-violet-400"
                : themeData[theme].ring,
              answer === option
                ? correct
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : "border-rose-300 bg-rose-50 text-rose-700"
                : theme === "opinions"
                  ? "border-white/10 bg-white/[0.035] text-slate-200 hover:bg-white/[0.065]"
                  : "border-slate-200 bg-white text-slate-700 hover:shadow-md",
            ].join(" ")}
            onClick={() => choose(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <Feedback theme={theme} text={feedback} good={correct} />

      <Continue
        ready={correct}
        onClick={() => next(true)}
        theme={theme}
      />
    </>
  );
}

function Production({
  theme,
  next,
  card,
  setCard,
}: {
  theme: Theme;
  next: (point?: boolean) => void;
  card: {
    name: string;
    detail: string;
    sentence: string;
    counterargument: string;
  };
  setCard: React.Dispatch<
    React.SetStateAction<{
      name: string;
      detail: string;
      sentence: string;
      counterargument: string;
    }>
  >;
}) {
  if (theme === "routines") {
    return <RoutineProduction next={next} card={card} setCard={setCard} />;
  }

  if (theme === "opinions") {
    return <OpinionProduction next={next} card={card} setCard={setCard} />;
  }

  const ready =
    card.name.trim().length > 2 &&
    card.detail.trim().length > 2 &&
    card.sentence.trim().length > 2;

  return (
    <>
      <Title theme="animals">
        Make it
        <br />
        <em>your own.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Create a tiny animal profile using the language you just learned.
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl">
          <ProductionField
            label="My amazing animal"
            value={card.name}
            placeholder="e.g. Elephant"
            onChange={(value) =>
              setCard((current) => ({ ...current, name: value }))
            }
          />

          <ProductionField
            label="Two details"
            value={card.detail}
            placeholder="e.g. big ears and a long trunk"
            onChange={(value) =>
              setCard((current) => ({ ...current, detail: value }))
            }
          />

          <ProductionField
            label="One full sentence"
            value={card.sentence}
            placeholder="e.g. It can spray water."
            onChange={(value) =>
              setCard((current) => ({ ...current, sentence: value }))
            }
          />
        </div>

        <AnimalPreview card={card} />
      </div>

      <Continue
        ready={ready}
        onClick={() => next(true)}
        text="Save my card"
        theme="animals"
      />
    </>
  );
}

function ProductionField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mb-5 block last:mb-0">
      <span className="mb-2 block text-sm font-black text-slate-800">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
      />
    </label>
  );
}

function AnimalPreview({
  card,
}: {
  card: {
    name: string;
    detail: string;
    sentence: string;
  };
}) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-rose-500 to-emerald-600 p-[1px] shadow-2xl"
    >
      <div className="h-full rounded-[1.95rem] bg-white p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
            My learning card
          </span>

          <span className="text-2xl">🐾</span>
        </div>

        <motion.div
          key={card.name || "empty"}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="mt-10"
        >
          <div className="text-3xl font-black tracking-tight text-slate-900">
            {card.name || "Your animal"}
          </div>

          <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
            {card.detail || "Two useful details will appear here."}
          </p>

          <div className="my-6 h-px bg-slate-100" />

          <p className="text-base font-black leading-7 text-emerald-700">
            {card.sentence ||
              "Your complete animal sentence will appear here."}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function RoutineProduction({
  next,
  card,
  setCard,
}: {
  next: (point?: boolean) => void;
  card: {
    name: string;
    detail: string;
    sentence: string;
    counterargument: string;
  };
  setCard: React.Dispatch<
    React.SetStateAction<{
      name: string;
      detail: string;
      sentence: string;
      counterargument: string;
    }>
  >;
}) {
  const [activity, setActivity] = useState("wake up");
  const [time, setTime] = useState("07:00");

  const ready =
    activity.trim().length > 2 &&
    time.trim().length > 0 &&
    card.sentence.trim().length > 5;

  return (
    <>
      <Title theme="routines">
        Build your
        <br />
        <em>daily routine.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Choose a moment, set its time and turn it into a complete sentence.
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl">
          <div className="grid gap-5">
            <label>
              <span className="mb-2 block text-sm font-black text-slate-800">
                Activity
              </span>

              <select
                value={activity}
                onChange={(event) => setActivity(event.target.value)}
                className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              >
                {routines.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-black text-slate-800">
                Time
              </span>

              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              >
                {routineTimes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-black text-slate-800">
                Complete sentence
              </span>

              <input
                value={card.sentence}
                onChange={(event) =>
                  setCard((current) => ({
                    ...current,
                    sentence: event.target.value,
                  }))
                }
                placeholder={`e.g. I ${activity} at ${time}.`}
                className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>
        </div>

        <motion.div
          layout
          className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-xl"
        >
          <div className="absolute right-[-1.5rem] top-[-1.5rem] text-7xl opacity-25">
            ☀️
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            My daily routine
          </span>

          <div className="relative mt-10">
            <div className="text-6xl font-black tracking-[-0.05em] text-blue-950">
              {time}
            </div>

            <div className="mt-3 text-xl font-black text-slate-800">
              {activity}
            </div>

            <div className="mt-7 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm font-semibold leading-6 text-slate-700">
              {card.sentence ||
                `Your sentence about ${activity} will appear here.`}
            </div>
          </div>
        </motion.div>
      </div>

      <Continue
        ready={ready}
        onClick={() => next(true)}
        text="Save my routine"
        theme="routines"
      />
    </>
  );
}

function OpinionProduction({
  next,
  card,
  setCard,
}: {
  next: (point?: boolean) => void;
  card: {
    name: string;
    detail: string;
    sentence: string;
    counterargument: string;
  };
  setCard: React.Dispatch<
    React.SetStateAction<{
      name: string;
      detail: string;
      sentence: string;
      counterargument: string;
    }>
  >;
}) {
  const ready =
    card.name.trim().length > 2 &&
    card.detail.trim().length > 2 &&
    card.sentence.trim().length > 2 &&
    card.counterargument.trim().length > 2;

  return (
    <>
      <Title theme="opinions">
        Create your
        <br />
        <em>debate card.</em>
      </Title>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
        Prepare a concise speaking response with a position, reason, example
        and counterargument.
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <OpinionField
            label="Position"
            value={card.name}
            placeholder="Homework should be shorter."
            onChange={(value) =>
              setCard((current) => ({ ...current, name: value }))
            }
          />

          <OpinionField
            label="Reason"
            value={card.detail}
            placeholder="Students need more time to rest."
            onChange={(value) =>
              setCard((current) => ({ ...current, detail: value }))
            }
          />

          <OpinionField
            label="Example"
            value={card.sentence}
            placeholder="They can spend time with family."
            onChange={(value) =>
              setCard((current) => ({ ...current, sentence: value }))
            }
          />

          <OpinionField
            label="Counterargument"
            value={card.counterargument}
            placeholder="I see the point, but balance is important."
            onChange={(value) =>
              setCard((current) => ({
                ...current,
                counterargument: value,
              }))
            }
          />
        </div>

        <motion.div
          layout
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b18] shadow-2xl"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-600 px-6 py-5">
            <div className="absolute right-5 top-2 text-6xl opacity-20">
              ✦
            </div>

            <span className="relative text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
              My debate card
            </span>

            <h3 className="relative mt-4 max-w-xl text-2xl font-black text-white sm:text-3xl">
              {card.name || "My position"}
            </h3>
          </div>

          <div className="space-y-5 p-6">
            {[
              ["REASON", card.detail, "Your reason will appear here."],
              ["EXAMPLE", card.sentence, "Your example will appear here."],
              [
                "COUNTERARGUMENT",
                card.counterargument,
                "Your respectful counterargument will appear here.",
              ],
            ].map(([label, value, fallback]) => (
              <div key={label}>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {label}
                </span>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                  {value || fallback}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Continue
        ready={ready}
        onClick={() => next(true)}
        text="Save debate card"
        theme="opinions"
      />
    </>
  );
}

function OpinionField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mb-5 block last:mb-0">
      <span className="mb-2 block text-sm font-black text-white">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/10"
      />
    </label>
  );
}

function Reflection({
  theme,
  next,
}: {
  theme: Theme;
  next: () => void;
}) {
  const [level, setLevel] = useState(0);

  const list =
    theme === "animals"
      ? [
          "I can name animals.",
          "I can use It's a...",
          "I can use It has...",
          "I can use It can...",
        ]
      : theme === "routines"
        ? [
            "I can use Present Simple.",
            "I can use she goes.",
            "I can describe a daily routine.",
          ]
        : [
            "I can state my position.",
            "I can give a reason.",
            "I can give an example.",
            "I can respond respectfully.",
          ];

  return (
    <>
      <Title theme={theme}>
        Pause and
        <br />
        <em>notice progress.</em>
      </Title>

      <p
        className={[
          "mt-4 max-w-2xl text-base leading-7",
          theme === "opinions" ? "text-slate-300" : "text-slate-600",
        ].join(" ")}
      >
        How ready do you feel to use this language without help?
      </p>

      <div className="mt-8">
        <div
          className={[
            "rounded-[2rem] border p-6 sm:p-7",
            theme === "opinions"
              ? "border-white/10 bg-white/[0.035]"
              : "border-white/80 bg-white/75 shadow-lg",
          ].join(" ")}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div
                className={[
                  "text-[10px] font-black uppercase tracking-[0.2em]",
                  theme === "opinions"
                    ? "text-violet-300"
                    : themeData[theme].accentText,
                ].join(" ")}
              >
                Confidence
              </div>

              <div
                className={[
                  "mt-2 text-lg font-black",
                  theme === "opinions"
                    ? "text-white"
                    : "text-slate-900",
                ].join(" ")}
              >
                Choose the number that feels honest.
              </div>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((number) => (
                <motion.button
                  key={number}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`${number} out of 5 confidence`}
                  aria-pressed={level === number}
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2",
                    theme === "opinions"
                      ? "focus-visible:ring-violet-400"
                      : themeData[theme].ring,
                    level === number
                      ? theme === "opinions"
                        ? "border-violet-400 bg-violet-500 text-white shadow-lg"
                        : "border-blue-500 bg-blue-600 text-white shadow-lg"
                      : theme === "opinions"
                        ? "border-white/10 bg-white/[0.035] text-slate-400 hover:bg-white/[0.07]"
                        : "border-slate-200 bg-white text-slate-600 hover:shadow-md",
                  ].join(" ")}
                  onClick={() => setLevel(number)}
                >
                  {number}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((item) => (
          <div
            key={item}
            className={[
              "flex items-center gap-3 rounded-2xl border px-4 py-4",
              theme === "opinions"
                ? "border-white/10 bg-white/[0.035] text-slate-200"
                : "border-slate-200 bg-white/75 text-slate-700",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                theme === "opinions"
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-emerald-50 text-emerald-600",
              ].join(" ")}
            >
              <Check size={16} />
            </span>

            <span className="text-sm font-semibold">{item}</span>
          </div>
        ))}
      </div>

      <Continue
        ready={level > 0}
        onClick={next}
        text="Finish with a check"
        theme={theme}
      />
    </>
  );
}

function FinalAssessment({
  theme,
  next,
  feedback,
  setFeedback,
}: {
  theme: Theme;
  next: (point?: boolean) => void;
  feedback: string;
  setFeedback: (text: string) => void;
}) {
  const [answer, setAnswer] = useState("");

  const data =
    theme === "animals"
      ? {
          title: ["One final", "confident choice."],
          prompt: "Choose a complete animal sentence.",
          options: [
            "It has a long tail.",
            "It have long tail.",
          ],
          correct: "It has a long tail.",
        }
      : theme === "routines"
        ? {
            title: ["One final", "confident choice."],
            prompt: "Choose the accurate sentence.",
            options: [
              "She goes to bed at ten.",
              "She go to bed at ten.",
            ],
            correct: "She goes to bed at ten.",
          }
        : {
            title: ["One final", "confident choice."],
            prompt: "Choose the complete opinion.",
            options: [
              "In my view, homework should be shorter because students need rest.",
              "Homework short.",
            ],
            correct:
              "In my view, homework should be shorter because students need rest.",
          };

  const correct = answer === data.correct;

  const choose = (value: string) => {
    setAnswer(value);

    setFeedback(
      value === data.correct
        ? "Excellent. You are ready to complete the lesson."
        : "Not quite. Read the sentence carefully.",
    );
  };

  return (
    <>
      <Title theme={theme}>
        {data.title[0]}
        <br />
        <em>{data.title[1]}</em>
      </Title>

      <div
        className={[
          "mt-7 overflow-hidden rounded-[2rem] border",
          theme === "opinions"
            ? "border-white/10 bg-white/[0.035]"
            : "border-white/80 bg-white/75 shadow-xl",
        ].join(" ")}
      >
        <div
          className={[
            "px-6 py-4",
            theme === "opinions"
              ? "bg-gradient-to-r from-violet-500/10 to-indigo-500/5"
              : theme === "animals"
                ? "bg-gradient-to-r from-orange-50 to-emerald-50"
                : "bg-gradient-to-r from-sky-50 to-indigo-50",
          ].join(" ")}
        >
          <span
            className={[
              "text-[10px] font-black uppercase tracking-[0.2em]",
              theme === "opinions"
                ? "text-violet-300"
                : themeData[theme].accentText,
            ].join(" ")}
          >
            Final check · 1 min
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h2
            className={[
              "text-xl font-black leading-8 sm:text-3xl",
              theme === "opinions" ? "text-white" : "text-slate-900",
            ].join(" ")}
          >
            {data.prompt}
          </h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {data.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ x: 3 }}
            className={[
              "min-h-16 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2",
              theme === "opinions"
                ? "focus-visible:ring-violet-400"
                : themeData[theme].ring,
              answer === option
                ? correct
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : "border-rose-300 bg-rose-50 text-rose-700"
                : theme === "opinions"
                  ? "border-white/10 bg-white/[0.035] text-slate-200 hover:bg-white/[0.065]"
                  : "border-slate-200 bg-white text-slate-700 hover:shadow-md",
            ].join(" ")}
            onClick={() => choose(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <Feedback theme={theme} text={feedback} good={correct} />

      <Continue
        ready={correct}
        onClick={() => next(true)}
        text="Complete lesson"
        theme={theme}
      />
    </>
  );
}

function Completion({
  theme,
  content,
  score,
  card,
  retry,
}: {
  theme: Theme;
  content: LessonContent;
  score: number;
  card: {
    name: string;
    detail: string;
    sentence: string;
    counterargument: string;
  };
  retry: () => void;
}) {
  const styles = themeData[theme];

  const percentage = Math.min(
    100,
    Math.round((score / 5) * 100),
  );

  return (
    <main
      className={[
        "relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8",
        styles.page,
        theme === "opinions" ? "text-white" : "text-slate-900",
      ].join(" ")}
    >
      <AmbientScene theme={theme} />

      <section
        className={[
          "relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-[2.5rem] border backdrop-blur-2xl",
          styles.shell,
        ].join(" ")}
      >
        <div className="relative px-5 py-10 text-center sm:px-10 sm:py-14 lg:px-16">
          <div className="absolute left-1/2 top-[-5rem] h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

          <motion.div
            className={[
              "relative mx-auto flex h-28 w-28 items-center justify-center rounded-full text-white shadow-2xl",
              `bg-gradient-to-br ${styles.accent}`,
            ].join(" ")}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
            }}
          >
            <motion.div
              className="absolute inset-[-10px] rounded-full border border-white/20"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.05, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            <Check size={48} strokeWidth={3} />
          </motion.div>

          <div className="relative mt-7">
            <span
              className={[
                "text-[10px] font-black uppercase tracking-[0.22em]",
                theme === "opinions"
                  ? "text-violet-300"
                  : styles.accentText,
              ].join(" ")}
            >
              Lesson complete
            </span>

            <h1
              className={[
                "mt-4 text-4xl font-black leading-[0.96] tracking-[-0.05em] sm:text-6xl",
                theme === "opinions"
                  ? "text-white"
                  : "text-slate-950",
              ].join(" ")}
            >
              45-minute lesson
              <br />
              <em
                className={
                  theme === "animals"
                    ? "text-emerald-600"
                    : theme === "routines"
                      ? "text-blue-600"
                      : "text-violet-300"
                }
              >
                complete.
              </em>
            </h1>

            <p
              className={[
                "mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg",
                theme === "opinions"
                  ? "text-slate-300"
                  : "text-slate-600",
              ].join(" ")}
            >
              You completed all 10 stages of{" "}
              <strong>{content.lesson.title}</strong>.
            </p>
          </div>

          <div className="relative mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              ["Score", `${percentage}%`],
              ["Activities", "10 / 10"],
              ["Learning moments", String(score)],
            ].map(([label, value]) => (
              <motion.div
                key={label}
                whileHover={{ y: -3 }}
                className={[
                  "rounded-3xl border p-5 text-left",
                  theme === "opinions"
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-white/80 bg-white/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[10px] font-black uppercase tracking-[0.18em]",
                    theme === "opinions"
                      ? "text-slate-500"
                      : "text-slate-400",
                  ].join(" ")}
                >
                  {label}
                </span>

                <div
                  className={[
                    "mt-3 text-3xl font-black tracking-tight",
                    theme === "opinions"
                      ? "text-white"
                      : "text-slate-900",
                  ].join(" ")}
                >
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={[
              "relative mx-auto mt-5 max-w-3xl rounded-3xl border p-5 text-left",
              theme === "opinions"
                ? "border-emerald-400/15 bg-emerald-400/10"
                : "border-emerald-100 bg-emerald-50/80",
            ].join(" ")}
          >
            <span
              className={[
                "text-[10px] font-black uppercase tracking-[0.2em]",
                theme === "opinions"
                  ? "text-emerald-300"
                  : "text-emerald-600",
              ].join(" ")}
            >
              Self-assessment
            </span>

            <p
              className={[
                "mt-2 text-sm font-bold leading-6",
                theme === "opinions"
                  ? "text-emerald-100"
                  : "text-emerald-950",
              ].join(" ")}
            >
              I can use today&apos;s language with growing confidence.
            </p>
          </div>

          {theme === "animals" && (
            <div className="relative mx-auto mt-5 max-w-3xl rounded-[2rem] bg-gradient-to-br from-orange-500 via-rose-500 to-emerald-600 p-[1px] text-left shadow-2xl">
              <div className="rounded-[1.95rem] bg-white p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                  My animal card
                </span>

                <div className="mt-5 text-2xl font-black text-slate-900">
                  {card.name}
                </div>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {card.detail}
                </p>

                <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-black leading-6 text-emerald-800">
                  {card.sentence}
                </div>
              </div>
            </div>
          )}

          {theme === "routines" && (
            <div className="relative mx-auto mt-5 max-w-3xl overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 text-left">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                    My daily routine
                  </span>

                  <p className="mt-4 text-xl font-black leading-8 text-slate-900">
                    {card.sentence}
                  </p>
                </div>

                <span className="text-5xl opacity-50">🌤️</span>
              </div>
            </div>
          )}

          {theme === "opinions" && (
            <div className="relative mx-auto mt-5 max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 p-[1px] text-left shadow-2xl">
              <div className="rounded-[1.95rem] bg-[#080b18] p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
                  My shareable debate card
                </span>

                <h3 className="mt-5 text-2xl font-black text-white">
                  {card.name}
                </h3>

                <div className="mt-6 grid gap-5 sm:grid-cols-3">
                  {[
                    ["Reason", card.detail],
                    ["Example", card.sentence],
                    ["Counterargument", card.counterargument],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <small className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                        {label}
                      </small>

                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-6 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.accent}`}
              onClick={retry}
            >
              <RotateCcw size={18} />
              Retry lesson
            </button>

            <a
              href="#/"
              className={[
                "inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black transition",
                theme === "opinions"
                  ? "text-slate-300 hover:bg-white/5"
                  : "text-slate-600 hover:bg-white/70",
              ].join(" ")}
            >
              Back to portfolio
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}