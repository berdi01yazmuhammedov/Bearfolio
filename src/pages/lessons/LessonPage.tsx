import { useState, type ReactNode } from "react";
import type { LessonContent } from "../../lessons/types";
import { LessonHeader } from "../../components/lessons/LessonHeader";
import { ProgressIndicator } from "../../components/lessons/ProgressIndicator";
import { Quiz } from "../../components/lessons/Quiz";
import { LessonPlan } from "../../components/lessons/LessonPlan";
import { TeacherNotes } from "../../components/lessons/TeacherNotes";
import { LessonNavigation } from "../../components/lessons/LessonNavigation";
import { LessonCompletion } from "../../components/lessons/LessonCompletion";

type Props = {
  content: LessonContent;
  activity: (onContinue: () => void) => ReactNode;
};
export function LessonPage({ content, activity }: Props) {
  const [started, setStarted] = useState(false),
    [stage, setStage] = useState(0),
    [complete, setComplete] = useState(false);
  const continueLesson = () =>
    setStage((value) => Math.min(value + 1, content.stages.length - 1));
  return (
    <main className={`lesson-page ${content.accent}`}>
      <LessonHeader
        content={content}
        onStart={() => {
          setStarted(true);
          setStage(0);
          document
            .getElementById("lesson")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <section className="overview">
        <div>
          <p className="eyebrow">Learning objectives</p>
          <ul>
            {content.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Lesson sequence</p>
          <p>
            Engage → Teach → Controlled practice → Guided practice →
            Communicative production → Assess
          </p>
        </div>
      </section>
      {started && (
        <section id="lesson" className="interactive">
          <ProgressIndicator stages={content.stages} current={stage} />
          {stage === 0 ? (
            activity(continueLesson)
          ) : (
            <>
              <p className="section-num">0{stage + 1} / PRACTICE</p>
              <h2>
                {stage === content.stages.length - 1
                  ? "Lesson complete"
                  : "Check your understanding"}
              </h2>
              {stage === content.stages.length - 1 && complete ? (
                <LessonCompletion objectives={content.objectives} />
              ) : (
                <Quiz
                  questions={content.questions}
                  onComplete={() => {
                    setComplete(true);
                    setStage(content.stages.length - 1);
                  }}
                />
              )}
            </>
          )}
        </section>
      )}
      <LessonPlan plan={content.plan} />
      <TeacherNotes>{content.teacherNote}</TeacherNotes>
      <LessonNavigation lesson={content.lesson} />
    </main>
  );
}
