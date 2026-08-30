import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import type { LessonContent } from "../../lessons/types";
type Props = {
  content: LessonContent;
  activity?: (next: () => void) => React.ReactNode;
};
type Theme = "animals" | "routines" | "opinions";
const animals: [string, string][] = [
  ["🐘", "elephant"],
  ["🦁", "lion"],
  ["🐰", "rabbit"],
  ["🐯", "tiger"],
];
const day: [string, string, string][] = [
  ["☀️", "wake up", "07:00"],
  ["🥣", "have breakfast", "07:30"],
  ["🎒", "go to school", "08:00"],
  ["✏️", "do homework", "16:00"],
  ["🌙", "go to bed", "22:30"],
];
const speak = (text: string) => {
  if ("speechSynthesis" in window)
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
};
const Next = ({
  ok,
  next,
  text = "Continue",
}: {
  ok: boolean;
  next: () => void;
  text?: string;
}) => (
  <button className="continue" disabled={!ok} onClick={next}>
    {text}
    <ArrowRight size={19} />
  </button>
);
const Feedback = ({
  ok,
  children,
}: {
  ok: boolean;
  children: React.ReactNode;
}) => (
  <motion.p
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className={"answer-feedback " + (ok ? "good" : "bad")}
  >
    {ok ? <Check size={18} /> : "↗"}
    {children}
  </motion.p>
);
export function LessonPage({ content }: Props) {
  const theme: Theme =
    content.accent === "coral"
      ? "animals"
      : content.accent === "blue"
        ? "routines"
        : "opinions";
  const labels =
    theme === "animals"
      ? [
          "Meet the wild words",
          "Tap the right animal",
          "Match the word",
          "Say it beautifully",
        ]
      : theme === "routines"
        ? ["Read the day", "Put the day in order", "Make it Present Simple"]
        : ["Take a position", "Build your point", "Mini debate"];
  const [step, setStep] = useState(0),
    [score, setScore] = useState(0),
    [done, setDone] = useState(false);
  const next = () =>
    step === labels.length - 1 ? setDone(true) : setStep(step + 1);
  const reset = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };
  return (
    <main className={"learn " + theme}>
      <div className="learn-orb orb-one" />
      <div className="learn-orb orb-two" />
      <header className="learn-top">
        <a href="/" className="back-link">
          <ArrowLeft size={18} />
          Portfolio
        </a>
        <span className="lesson-pill">
          {content.lesson.level} · {content.lesson.duration}
        </span>
      </header>
      <section className="learn-shell">
        {!done && (
          <>
            <div className="progress-row">
              <div>
                <span>
                  LESSON {step + 1} OF {labels.length}
                </span>
                <strong>{labels[step]}</strong>
              </div>
              <b>{Math.round(((step + 1) / labels.length) * 100)}%</b>
            </div>
            <div className="progress-track">
              <motion.i
                animate={{
                  width: `${Math.round(((step + 1) / labels.length) * 100)}%`,
                }}
              />
            </div>
          </>
        )}
        <AnimatePresence mode="wait">
          {done ? (
            <Complete
              key="done"
              theme={theme}
              score={score}
              content={content}
              retry={reset}
            />
          ) : (
            <motion.section
              key={step}
              className="lesson-stage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <Scenario
                theme={theme}
                step={step}
                next={next}
                point={() => setScore(score + 1)}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
function Scenario(p: {
  theme: Theme;
  step: number;
  next: () => void;
  point: () => void;
}) {
  return p.theme === "animals" ? (
    <Animals {...p} />
  ) : p.theme === "routines" ? (
    <Routines {...p} />
  ) : (
    <Opinions {...p} />
  );
}
function Animals({
  step,
  next,
  point,
}: {
  step: number;
  next: () => void;
  point: () => void;
}) {
  const [s, setS] = useState<string | null>(null);
  const [a, setA] = useState<string | null>(null);
  if (step === 0)
    return (
      <>
        <p className="kicker">
          VOCABULARY SAFARI <Sparkles size={15} />
        </p>
        <h1>
          Meet the animals.
          <br />
          <em>Hear the words.</em>
        </h1>
        <p className="lead">
          Tap a character to reveal its name, then listen and repeat.
        </p>
        <div className="animal-grid">
          {animals.map(([i, w]) => (
            <button
              className={"animal-card " + (s === w ? "active" : "")}
              onClick={() => setS(w)}
              key={w}
            >
              <b>{i}</b>
              <span>{s === w ? w : "tap to reveal"}</span>
              {s === w && (
                <small>
                  / pronunciation /{" "}
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(w);
                    }}
                    aria-label={"Listen to " + w}
                  >
                    <Volume2 size={16} />
                  </i>
                </small>
              )}
            </button>
          ))}
        </div>
        <Next ok={!!s} next={next} text="Ready to play" />
      </>
    );
  if (step === 1)
    return (
      <Choice
        title={
          <>
            Which one is a<br />
            <em>tiger?</em>
          </>
        }
        choices={animals.map(([i, w]) => [`${i} ${w}`, w === "tiger"])}
        state={a}
        set={setA}
        point={point}
        next={next}
      />
    );
  if (step === 2)
    return (
      <Choice
        title={
          <>
            Pair every face
            <br />
            <em>with its word.</em>
          </>
        }
        choices={[
          ["🦁 lion", true],
          ["🐘 elephant", true],
          ["🐰 rabbit", true],
        ]}
        state={a}
        set={setA}
        point={point}
        next={next}
        multiple
      />
    );
  return (
    <Choice
      title={
        <>
          Choose the sentence
          <br />
          <em>that fits.</em>
        </>
      }
      prompt="🐰 A rabbit is small and cute."
      choices={[
        ["It’s a rabbit.", true],
        ["It are a rabbit.", false],
        ["It’s rabbit a.", false],
      ]}
      state={a}
      set={setA}
      point={point}
      next={next}
      text="Finish safari"
    />
  );
}
function Choice({
  title,
  prompt,
  choices,
  state,
  set,
  point,
  next,
  multiple,
  text,
}: {
  title: React.ReactNode;
  prompt?: string;
  choices: [string, boolean][];
  state: string | null;
  set: (x: string) => void;
  point: () => void;
  next: () => void;
  multiple?: boolean;
  text?: string;
}) {
  const good = multiple
    ? !!state
    : choices.find((x) => x[0] === state)?.[1] === true;
  return (
    <>
      <p className="kicker">QUICK CHALLENGE</p>
      <h1>{title}</h1>
      {prompt && (
        <div className="grammar-card">
          <h2>{prompt}</h2>
        </div>
      )}
      <div className="choice-stack">
        {choices.map(([x, yes]) => (
          <button
            key={x}
            onClick={() => {
              set(x);
              if (yes) point();
            }}
            className={state === x ? (yes ? "correct" : "incorrect") : ""}
          >
            {x}
          </button>
        ))}
      </div>
      {state && (
        <Feedback ok={good}>
          {good
            ? "Excellent — you got it!"
            : "Almost. Try the highlighted idea again."}
        </Feedback>
      )}
      <Next ok={good} next={next} text={text} />
    </>
  );
}
function Routines({
  step,
  next,
  point,
}: {
  step: number;
  next: () => void;
  point: () => void;
}) {
  const [view, setView] = useState(0),
    [order, setOrder] = useState<string[]>([]),
    [verb, setVerb] = useState<string | null>(null);
  const correct = order.join("|") === day.map((x) => x[1]).join("|");
  if (step === 0)
    return (
      <>
        <p className="kicker">
          A DAY IN MOTION <Sparkles size={15} />
        </p>
        <h1>
          Follow Mia’s
          <br />
          <em>bright blue day.</em>
        </h1>
        <div className="day-timeline">
          {day.map(([i, x, t], n) => (
            <button
              className={view === n ? "current" : ""}
              onClick={() => setView(n)}
              key={x}
            >
              <i>{i}</i>
              <span>{t}</span>
              <b>{x}</b>
            </button>
          ))}
        </div>
        <div className="time-reveal">
          <span>{day[view][0]}</span>
          <p>
            <b>{day[view][2]}</b> — Mia {day[view][1]}s.
          </p>
        </div>
        <Next ok next={next} text="Order the day" />
      </>
    );
  if (step === 1)
    return (
      <>
        <p className="kicker">CLICK TO ORDER</p>
        <h1>
          What happens
          <br />
          <em>next?</em>
        </h1>
        <div className="order-picks">
          {day.map(([i, x]) => (
            <button
              disabled={order.includes(x)}
              onClick={() => setOrder([...order, x])}
              key={x}
            >
              {i} {x}
            </button>
          ))}
        </div>
        <div className="ordered-list">
          {order.map((x, i) => (
            <span key={x}>
              <b>0{i + 1}</b>
              {x}
            </span>
          ))}
        </div>
        {order.length === 5 && (
          <Feedback ok={correct}>
            {correct
              ? "Perfect rhythm — a full day."
              : "Start with waking up and try again."}
          </Feedback>
        )}
        {!correct && order.length === 5 && (
          <button className="mini-action" onClick={() => setOrder([])}>
            <RotateCcw size={16} />
            Try again
          </button>
        )}
        <Next
          ok={correct}
          next={() => {
            point();
            next();
          }}
        />
      </>
    );
  return (
    <Choice
      title={
        <>
          Make the verb
          <br />
          <em>work harder.</em>
        </>
      }
      prompt="She ___ to school."
      choices={[
        ["go", false],
        ["goes", true],
        ["going", false],
      ]}
      state={verb}
      set={setVerb}
      point={point}
      next={next}
      text="Finish the day"
    />
  );
}
function Opinions({
  step,
  next,
  point,
}: {
  step: number;
  next: () => void;
  point: () => void;
}) {
  const [pos, setPos] = useState<string | null>(null),
    [phrase, setPhrase] = useState<string | null>(null),
    [reason, setReason] = useState<string | null>(null),
    [reply, setReply] = useState<string | null>(null);
  if (step === 0)
    return (
      <>
        <p className="kicker">
          OPINION STUDIO <Sparkles size={15} />
        </p>
        <h1>
          Every good debate
          <br />
          <em>starts with a view.</em>
        </h1>
        <div className="statement-card">
          <span>THE QUESTION</span>
          <h2>Students should not have homework at weekends.</h2>
          <div className="stance-row">
            {["Agree", "It depends", "Disagree"].map((x) => (
              <button
                className={pos === x ? "selected" : ""}
                onClick={() => setPos(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        {pos && <Feedback ok>Your position is clear: “{pos}”.</Feedback>}
        <Next
          ok={!!pos}
          next={() => {
            point();
            next();
          }}
          text="Build my argument"
        />
      </>
    );
  if (step === 1)
    return (
      <>
        <p className="kicker">ARGUMENT BUILDER</p>
        <h1>
          Give your view
          <br />
          <em>a backbone.</em>
        </h1>
        <div className="builder">
          <div>
            <label>1 — Opinion phrase</label>
            {["In my view,", "I believe", "I think"].map((x) => (
              <button
                onClick={() => setPhrase(x)}
                className={phrase === x ? "selected" : ""}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div>
            <label>2 — Reason</label>
            {[
              "weekends are for rest",
              "students need family time",
              "free time helps creativity",
            ].map((x) => (
              <button
                onClick={() => setReason(x)}
                className={reason === x ? "selected" : ""}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="opinion-preview">
          <span>MY POINT OF VIEW</span>
          <p>
            {phrase || "Choose a phrase"} {reason || "then add a reason"}.
          </p>
          <small>
            For example, a rested student can focus better on Monday.
          </small>
        </div>
        <Next
          ok={!!phrase && !!reason}
          next={() => {
            point();
            next();
          }}
          text="Enter the debate"
        />
      </>
    );
  return (
    <Choice
      title={
        <>
          Respond with
          <br />
          <em>respect.</em>
        </>
      }
      prompt="“Homework helps us remember what we learn.”"
      choices={[
        ["I see your point, but students also need time to rest.", true],
        ["No, that is wrong.", false],
        ["Homework weekend.", false],
      ]}
      state={reply}
      set={setReply}
      point={point}
      next={next}
      text="Reveal my result"
    />
  );
}
function Complete({
  theme,
  score,
  content,
  retry,
}: {
  theme: Theme;
  score: number;
  content: LessonContent;
  retry: () => void;
}) {
  return (
    <motion.section
      className="completion"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="completion-check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Check size={42} />
      </motion.div>
      <p className="kicker">LESSON COMPLETE</p>
      <h1>
        You made it
        <br />
        <em>feel easy.</em>
      </h1>
      <p className="lead">
        {score} learning moments collected in {content.lesson.title}.
      </p>
      {theme === "opinions" && (
        <div className="opinion-preview final">
          <span>MY POINT OF VIEW</span>
          <p>In my view, weekends are for rest.</p>
          <small>
            For example, a rested student can focus better on Monday.
          </small>
        </div>
      )}
      <div className="completion-actions">
        <button className="continue" onClick={retry}>
          <RotateCcw size={18} />
          Retry lesson
        </button>
        <a href="/" className="back-link">
          Back to portfolio <ArrowRight size={18} />
        </a>
      </div>
    </motion.section>
  );
}
