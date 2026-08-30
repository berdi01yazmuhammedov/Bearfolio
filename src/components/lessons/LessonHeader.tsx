import type { LessonContent } from "../../lessons/types";
export function LessonHeader({
  content,
  onStart,
}: {
  content: LessonContent;
  onStart: () => void;
}) {
  const { lesson } = content;
  return (
    <>
      <a className="back" href="/">
        ← Back to Teaching Portfolio
      </a>
      <div className="crumb">
        Teaching Portfolio <span>/</span> Lessons <span>/</span> {lesson.title}
      </div>
      <section className="lesson-head">
        <div>
          <p className="eyebrow">Interactive sample lesson</p>
          <h1>{lesson.title}</h1>
          <p className="meta">
            {lesson.audience} <i /> {lesson.level} <i /> Ages {lesson.age} <i />{" "}
            {lesson.duration}
          </p>
          <p className="intro">{content.description}</p>
          <button className="primary" onClick={onStart}>
            Start Interactive Lesson <b>→</b>
          </button>
        </div>
        <aside className="info-card">
          <div>
            <small>Level</small>
            <strong>{lesson.level}</strong>
          </div>
          <div>
            <small>Age</small>
            <strong>{lesson.age}</strong>
          </div>
          <div>
            <small>Duration</small>
            <strong>{lesson.duration}</strong>
          </div>
          <div>
            <small>Focus</small>
            <strong>{lesson.languageFocus}</strong>
          </div>
        </aside>
      </section>
    </>
  );
}
