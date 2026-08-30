export function LessonCompletion({ objectives }: { objectives: string[] }) {
  return (
    <div className="completion">
      <p className="big-check">✓</p>
      <h3>Lesson complete</h3>
      <p>
        You have worked through the key activities and a formative knowledge
        check.
      </p>
      <div className="checklist">
        {objectives.map((objective) => (
          <div key={objective}>☐ {objective}</div>
        ))}
      </div>
      <p className="pedagogy">
        Teacher assessment: use this checklist to notice confidence, accuracy,
        and willingness to communicate before planning the next lesson.
      </p>
    </div>
  );
}
