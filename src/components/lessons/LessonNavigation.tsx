import { lessons } from "../../data/lessons";
import type { Lesson } from "../../data/lessons";
export function LessonNavigation({ lesson }: { lesson: Lesson }) {
  const index = lessons.indexOf(lesson);
  const previous = lessons[index - 1],
    next = lessons[index + 1];
  return (
    <nav className="lesson-nav">
      <p>Explore another lesson</p>
      <div>
        {previous ? (
          <a href={`/lessons/${previous.slug}`}>← {previous.title}</a>
        ) : (
          <a href="/">← Teaching Portfolio</a>
        )}
        <a href="/">Teaching Portfolio</a>
        {next ? (
          <a href={`/lessons/${next.slug}`}>{next.title} →</a>
        ) : (
          <a href={`/lessons/${lessons[0].slug}`}>First lesson →</a>
        )}
      </div>
    </nav>
  );
}
