import { lessons } from "../data/lessons";
import type { LessonContent } from "./types";
export const routinesLesson: LessonContent = {
  lesson: lessons[1],
  accent: "blue",
  description:
    "A structured route from noticing verb patterns to talking about everyday routines.",
  objectives: [
    "Talk about daily routines",
    "Use the present simple accurately",
    "Use common time expressions",
    "Form third-person singular verbs",
    "Ask and answer routine questions",
  ],
  stages: ["Warm-up", "Notice", "Accuracy", "Order", "Compare", "Speak"],
  teacherNote:
    "The timeline offers familiar context before learners notice a grammatical pattern. A controlled check follows, then ordering and comparison create meaningful preparation for personal production.",
  plan: [
    {
      stage: "Warm-up",
      time: "5 min",
      interaction: "T–S",
      purpose: "Connect to familiar routines",
    },
    {
      stage: "Language discovery",
      time: "8 min",
      interaction: "T–S",
      purpose: "Notice the -s pattern",
    },
    {
      stage: "Controlled practice",
      time: "8 min",
      interaction: "Individual",
      purpose: "Build form accuracy",
    },
    {
      stage: "Build the routine",
      time: "8 min",
      interaction: "Pairs",
      purpose: "Sequence routines",
    },
    {
      stage: "Information gap",
      time: "8 min",
      interaction: "Pairs",
      purpose: "Ask for information",
    },
    {
      stage: "Communicative task",
      time: "8 min",
      interaction: "Pairs",
      purpose: "Freer production",
    },
  ],
  questions: [
    {
      prompt: "She ___ to school at 8.",
      choices: [
        { label: "go", correct: false },
        {
          label: "goes",
          correct: true,
          feedback: "Correct. “She goes” uses the third-person singular form.",
        },
        { label: "going", correct: false },
      ],
    },
    {
      prompt: "Choose the most natural routine sentence.",
      choices: [
        { label: "I have breakfast at 7:30.", correct: true },
        { label: "I has breakfast at 7:30.", correct: false },
        { label: "I breakfast at have 7:30.", correct: false },
      ],
    },
  ],
};
export const routineOrder = [
  "wake up",
  "have breakfast",
  "go to school",
  "do homework",
  "go to bed",
];
