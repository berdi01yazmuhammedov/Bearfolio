import { LessonPage } from "./LessonPage";
import { RoutinesActivity } from "../../components/lessons/RoutinesActivity";
import { routinesLesson } from "../../lessons/routines";
export function DailyRoutinesPage() {
  return (
    <LessonPage
      content={routinesLesson}
      activity={(onContinue) => <RoutinesActivity onContinue={onContinue} />}
    />
  );
}
