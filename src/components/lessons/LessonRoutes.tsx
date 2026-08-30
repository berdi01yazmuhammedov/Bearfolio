import { AnimalsVocabularyPage } from '../../pages/lessons/AnimalsVocabularyPage';
import { DailyRoutinesPage } from '../../pages/lessons/DailyRoutinesPage';
import { ExpressingOpinionsPage } from '../../pages/lessons/ExpressingOpinionsPage';

/**
 * Lightweight route matcher for projects that do not use react-router-dom.
 * Return null for the normal one-page portfolio and a page component for a lesson URL.
 */
export function LessonRoutes() {
  switch (window.location.pathname) {
    case '/lessons/animals-vocabulary':
      return <AnimalsVocabularyPage />;
    case '/lessons/daily-routines':
      return <DailyRoutinesPage />;
    case '/lessons/expressing-opinions':
      return <ExpressingOpinionsPage />;
    default:
      return null;
  }
}
