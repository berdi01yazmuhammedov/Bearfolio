import { LessonPage } from "./LessonPage";
import { OpinionsActivity } from "../../components/lessons/OpinionsActivity";
import { opinionsLesson } from "../../lessons/opinions";
export function ExpressingOpinionsPage() {
  return (
    <LessonPage
      content={opinionsLesson}
      activity={(onContinue) => <OpinionsActivity onContinue={onContinue} />}
    />
  );
}
