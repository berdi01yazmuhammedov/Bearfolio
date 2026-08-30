import { lessons } from "../data/lessons";
import type { LessonContent } from "./types";
export const opinionsLesson: LessonContent = {
  lesson: lessons[2],
  accent: "violet",
  description:
    "A discussion-focused lesson for building clear arguments and responding thoughtfully to others.",
  objectives: [
    "Express a clear opinion",
    "Give a reason and example",
    "Agree and disagree appropriately",
    "Use linking expressions",
    "Respond to another viewpoint",
  ],
  stages: ["Warm-up", "Toolkit", "Response", "Argument", "Debate", "Reflect"],
  teacherNote:
    "The opinion spectrum makes space for personal views without judging them. Language is then made visible and rehearsed before a structured argument and freer debate preparation.",
  plan: [
    {
      stage: "Warm-up",
      time: "5 min",
      interaction: "Pairs",
      purpose: "Take a personal position",
    },
    {
      stage: "Language toolkit",
      time: "8 min",
      interaction: "T–S",
      purpose: "Build discourse resources",
    },
    {
      stage: "Controlled response",
      time: "8 min",
      interaction: "Individual",
      purpose: "Select appropriate language",
    },
    {
      stage: "Argument builder",
      time: "10 min",
      interaction: "Pairs",
      purpose: "Structure an argument",
    },
    {
      stage: "Mini debate",
      time: "12 min",
      interaction: "Groups",
      purpose: "Use ideas spontaneously",
    },
    {
      stage: "Reflection",
      time: "5 min",
      interaction: "Individual",
      purpose: "Self-assess pragmatics",
    },
  ],
  questions: [
    {
      prompt: "A: “School should start later.” B:",
      choices: [
        {
          label: "I agree because teenagers need more sleep.",
          correct: true,
          feedback: "Correct. It responds directly and adds a reason.",
        },
        { label: "Banana.", correct: false },
        { label: "I have school.", correct: false },
      ],
    },
    {
      prompt: "Choose a respectful response to disagreement.",
      choices: [
        {
          label: "I see your point, but homework can also cause stress.",
          correct: true,
        },
        { label: "You’re completely stupid.", correct: false },
        { label: "No.", correct: false },
      ],
    },
  ],
};
