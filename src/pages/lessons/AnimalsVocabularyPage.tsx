import { LessonPage } from "./LessonPage";
import { AnimalsActivity } from "../../components/lessons/AnimalsActivity";
import { animalsLesson } from "../../lessons/animals";
export function AnimalsVocabularyPage() {
  return (
    <LessonPage
      content={animalsLesson}
      activity={(onContinue) => <AnimalsActivity onContinue={onContinue} />}
    />
  );
}
