// Edit this file to update the sample lesson / teaching portfolio cards.
export type Lesson = {
  slug: string;
  audience: string;
  title: string;
  level: string;
  age: string;
  duration: string;
  objective: string;
  activityType: string;
  languageFocus: string;
  sampleActivity: string;
};
export const lessons: Lesson[] = [
  {
    slug: "animals-vocabulary",
    audience: "Young Learners",
    title: "Animals & Vocabulary",
    level: "A1",
    age: "8–10",
    duration: "45 min",
    objective:
      "Recognize, say and use core animal vocabulary in short sentences.",
    activityType: "Flashcards, TPR, pair matching game",
    languageFocus: "“It’s a ___” / “I have a ___”",
    sampleActivity:
      "Students mime an animal while classmates guess it in English.",
  },
  {
    slug: "daily-routines",
    audience: "Teenagers",
    title: "Daily Routines & Present Simple",
    level: "A1–A2",
    age: "13–15",
    duration: "45 min",
    objective: "Describe daily routines accurately using the present simple.",
    activityType: "Timeline drawing, information-gap pair work",
    languageFocus: "Present simple, time expressions, third-person -s",
    sampleActivity:
      "Students interview a partner about their routine and report back to the class.",
  },
  {
    slug: "expressing-opinions",
    audience: "Speaking",
    title: "Expressing Opinions",
    level: "B1–B2",
    age: "Teenagers / Adults",
    duration: "45–60 min",
    objective: "Give and justify an opinion, and respond to a differing view.",
    activityType: "Discussion circles, structured debate",
    languageFocus: "Opinion phrases, agreeing / disagreeing, linking words",
    sampleActivity:
      "Students take opposing positions on a topic and build a short case for each side.",
  },
];
