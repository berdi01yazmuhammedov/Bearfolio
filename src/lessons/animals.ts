import { lessons } from "../data/lessons";
import type { LessonContent } from "./types";
export const animalsLesson: LessonContent = {
  lesson: lessons[0],
  accent: "coral",
  description:
    "A visual, confidence-building introduction to animal words and simple descriptions.",
  objectives: [
    "Recognize and name common animals",
    "Use “It’s a …” and “I have a …”",
    "Understand simple descriptions",
    "Join a short guessing activity",
  ],
  stages: ["Warm-up", "Presentation", "Practice", "Speaking", "Check"],
  teacherNote:
    "A visual warm-up activates existing language. The sequence moves from recognition and accurate sentence models to scaffolded speaking and contextual guessing.",
  plan: [
    {
      stage: "Warm-up",
      time: "5 min",
      interaction: "T–S",
      purpose: "Activate prior knowledge",
    },
    {
      stage: "Presentation",
      time: "8 min",
      interaction: "T–S",
      purpose: "Introduce vocabulary",
    },
    {
      stage: "Controlled practice",
      time: "10 min",
      interaction: "Individual",
      purpose: "Build accuracy",
    },
    {
      stage: "Guided speaking",
      time: "10 min",
      interaction: "Pair work",
      purpose: "Scaffold production",
    },
    {
      stage: "Communicative game",
      time: "10 min",
      interaction: "Pair / group",
      purpose: "Use words in context",
    },
    {
      stage: "Assessment",
      time: "2 min",
      interaction: "Individual",
      purpose: "Check learning",
    },
  ],
  questions: [
    {
      prompt: "What animal is this? 🦁",
      choices: [
        { label: "Lion", correct: true },
        { label: "Tiger", correct: false },
        { label: "Elephant", correct: false },
      ],
    },
    {
      prompt: "Choose the correct sentence for a dog.",
      choices: [
        { label: "It’s a dog.", correct: true },
        { label: "It’s a lion.", correct: false },
        { label: "It are a dog.", correct: false },
      ],
    },
  ],
};
export const animalWords = [
  { icon: "🐘", word: "elephant", sentence: "It’s an elephant." },
  { icon: "🦁", word: "lion", sentence: "It’s a lion." },
  { icon: "🐒", word: "monkey", sentence: "It’s a monkey." },
  { icon: "🐰", word: "rabbit", sentence: "It’s a rabbit." },
  { icon: "🐯", word: "tiger", sentence: "It’s a tiger." },
  { icon: "🐦", word: "bird", sentence: "It’s a bird." },
];
