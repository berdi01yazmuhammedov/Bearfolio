import type { Lesson } from "../data/lessons";
export type Choice = { label: string; correct: boolean; feedback?: string };
export type Question = { prompt: string; choices: Choice[] };
export type PlanRow = {
  stage: string;
  time: string;
  interaction: string;
  purpose: string;
};
export type LessonContent = {
  lesson: Lesson;
  accent: "coral" | "blue" | "violet";
  description: string;
  objectives: string[];
  stages: string[];
  plan: PlanRow[];
  teacherNote: string;
  questions: Question[];
};
