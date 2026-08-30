export function TeacherNotes({ children }: { children: string }) {
  return (
    <details className="teacher-notes">
      <summary>
        Teacher’s Notes <span>+</span>
      </summary>
      <div>
        <h3>Methodology</h3>
        <p>{children}</p>
        <p>
          The final checklist provides formative assessment without pretending
          to automatically grade freer speech or writing.
        </p>
      </div>
    </details>
  );
}
